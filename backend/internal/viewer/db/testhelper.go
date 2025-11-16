package db

import (
	"database/sql"
	"fmt"
	"math/rand/v2"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
	"github.com/stretchr/testify/require"
)

var (
	// 管理用DB接続の初期化
	adminOnce sync.Once
	// 管理用DB接続はテスト全体で使い回す
	adminDBConn *sql.DB
	// テンプレートDB初期化（プロセス間で1回だけ）
	templateOnce sync.Once
	// ダンプしたSQL
	schemaDumpSQL string
)

const (
	// テンプレートデータベース名
	templateDB = "test_template"
	// 管理用データベースのDSN
	adminDSN = "postgres://root:root@localhost:5432/postgres?sslmode=disable"
)

// SetupTestDB はpg_dumpでダンプしたスキーマを使って独立したテストDBをセットアップする
// 2つのレイヤーで重複実行を防いでいる:
// - ロックファイル: 全プロセスで1回だけ
// - sync.Once: 1プロセスで1回だけ ... 必要な情報をメモして以降の実行で再利用する
// go test はパッケージごとに別プロセスで実行される。つまり変数が違うのでsync.Onceだけだと複数回実行されてしまう
// TODO: スキーマは再生成されない
func SetupTestDB(t *testing.T) (*sqlc.Queries, func()) {
	t.Helper()

	// 管理用DB接続の初期化（プロセス内で1回だけ）
	adminOnce.Do(func() {
		var err error
		adminDBConn, err = sql.Open("postgres", adminDSN)
		require.NoError(t, err, "管理用DB接続に失敗しました")

		err = adminDBConn.Ping()
		require.NoError(t, err, "管理用DBへのPingに失敗しました")
	})

	// テンプレートDB作成とスキーマダンプ
	templateOnce.Do(func() {
		// ファイルロックを取得してプロセス間で排他制御を行う
		// 複数のテストパッケージが並列実行される場合に備えてファイルロックでプロセス間同期を取る
		lockPath := filepath.Join(os.TempDir(), "tv_test_template.lock")
		lockFile, err := os.OpenFile(lockPath, os.O_CREATE|os.O_RDWR, 0666)
		require.NoError(t, err, "ロックファイルの作成に失敗しました")
		defer func() { _ = lockFile.Close() }()

		// 排他ロックを取得（他のテストプロセスが初期化中の場合は待機）
		err = syscall.Flock(int(lockFile.Fd()), syscall.LOCK_EX)
		require.NoError(t, err, "ロックの取得に失敗しました")
		defer func() { _ = syscall.Flock(int(lockFile.Fd()), syscall.LOCK_UN) }()

		// test_template が既に存在するかチェック
		var exists bool
		err = adminDBConn.QueryRow("SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)", templateDB).Scan(&exists)
		require.NoError(t, err, "テンプレートDB存在チェックに失敗しました")

		if !exists {
			// テンプレートデータベースを作成
			_, err = adminDBConn.Exec("CREATE DATABASE " + templateDB)
			require.NoError(t, err, "テンプレートデータベースの作成に失敗しました")

			// テンプレートデータベースに接続してマイグレーション実行
			templateDSN := fmt.Sprintf("postgres://root:root@localhost:5432/%s?sslmode=disable", templateDB)
			tempConn, err := sql.Open("postgres", templateDSN)
			require.NoError(t, err, "テンプレートDB接続に失敗しました")

			err = RunMigrations(tempConn, "public")
			require.NoError(t, err, "マイグレーションの実行に失敗しました")

			_ = tempConn.Close()
		}

		// pg_dumpでスキーマをダンプ
		schemaDumpSQL, err = dumpSchemaWithPgDump(templateDB)
		require.NoError(t, err, "スキーマダンプに失敗しました")
	})

	// テスト用データベース名を生成
	timestamp := time.Now().UnixNano()
	random := rand.Int64()
	testDBName := fmt.Sprintf("test_%d_%d", timestamp, random)

	// テスト用データベースを作成
	_, err := adminDBConn.Exec("CREATE DATABASE " + testDBName)
	require.NoError(t, err, "テストデータベースの作成に失敗しました")

	// テスト用データベースに接続
	testDSN := fmt.Sprintf("postgres://root:root@localhost:5432/%s?sslmode=disable", testDBName)
	testDB, err := sql.Open("postgres", testDSN)
	require.NoError(t, err, "テスト用DB接続に失敗しました")

	// 接続を確認
	err = testDB.Ping()
	require.NoError(t, err, "テスト用DBへのPingに失敗しました")

	// ダンプしたスキーマを実行（トランザクション内で一括実行）
	tx, err := testDB.Begin()
	require.NoError(t, err, "トランザクション開始に失敗しました")

	_, err = tx.Exec(schemaDumpSQL)
	if err != nil {
		_ = tx.Rollback()
		require.NoError(t, err, "スキーマの作成に失敗しました")
	}
	err = tx.Commit()
	require.NoError(t, err, "トランザクションコミットに失敗しました")

	queries := sqlc.New(testDB)
	cleanup := func() {
		_ = testDB.Close()

		// 別のデータベースから削除する
		_, _ = adminDBConn.Exec("DROP DATABASE IF EXISTS " + testDBName)
	}

	return queries, cleanup
}

// dumpSchemaWithPgDump はDockerコンテナ内のpg_dumpコマンドを使ってスキーマをダンプする
func dumpSchemaWithPgDump(dbName string) (string, error) {
	cmd := exec.Command("docker", "exec", "tv-postgres",
		"pg_dump",
		"-U", "root",
		"-d", dbName,
		"--schema-only",
		"--no-owner",
		"--no-privileges",
		"--no-tablespaces",
		"--no-security-labels",
		"--no-comments",
	)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("pg_dump failed: %w, output: %s", err, string(output))
	}

	// \restrict、\unrestrict、およびsearch_pathを空にする行を削除
	lines := strings.Split(string(output), "\n")
	var filtered []string
	for _, line := range lines {
		if !strings.HasPrefix(line, "\\restrict") &&
			!strings.HasPrefix(line, "\\unrestrict") &&
			!strings.Contains(line, "set_config('search_path', '', false)") {
			filtered = append(filtered, line)
		}
	}

	return strings.Join(filtered, "\n"), nil
}
