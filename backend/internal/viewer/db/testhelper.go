package db

import (
	"database/sql"
	"fmt"
	"math/rand/v2"
	"os/exec"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
	"github.com/stretchr/testify/require"
)

var (
	// テンプレートDB初期化（プロセス内で1回だけ）
	templateOnce sync.Once
	// 管理用DB接続はテスト全体で使い回す
	adminDBConn *sql.DB
	// プロセスごとにユニークなテンプレートDB名
	templateDBName = fmt.Sprintf("test_template_%d_%d", time.Now().UnixNano(), rand.Int64())
	// ダンプしたSQL
	schemaDumpSQL string
)

const (
	// 管理用データベースのDSN
	adminDSN = "postgres://root:root@localhost:5432/postgres?sslmode=disable"
)

// SetupTestDB はpg_dumpでダンプしたスキーマを使って独立したテストDBをセットアップする
// プロセスごとにユニークなテンプレートDBを作成するため、プロセス間の競合は発生しない
// sync.Onceでプロセス内での重複実行を防いでいる
//
// - test
//   - packageA (test_template_123_456) ^once
//     a                                |
//     b                                v
//   - packageB (test_template_789_012) ^once
//     c                                |
//     d                                v
func SetupTestDB(t *testing.T) (*sqlc.Queries, func()) {
	t.Helper()

	// テンプレートDB作成とスキーマダンプ（プロセス内で1回だけ）
	templateOnce.Do(func() {
		// 管理用DB接続を初期化
		var err error
		adminDBConn, err = sql.Open("postgres", adminDSN)
		require.NoError(t, err, "管理用DB接続に失敗しました")

		err = adminDBConn.Ping()
		require.NoError(t, err, "管理用DBへのPingに失敗しました")

		// プロセスごとにユニークなテンプレートデータベースを作成
		_, err = adminDBConn.Exec("CREATE DATABASE " + templateDBName)
		require.NoError(t, err, "テンプレートデータベースの作成に失敗しました")

		// テンプレートデータベースに接続してマイグレーション実行
		templateDSN := fmt.Sprintf("postgres://root:root@localhost:5432/%s?sslmode=disable", templateDBName)
		tempConn, err := sql.Open("postgres", templateDSN)
		require.NoError(t, err, "テンプレートDB接続に失敗しました")

		err = RunMigrations(tempConn, "public")
		require.NoError(t, err, "マイグレーションの実行に失敗しました")

		_ = tempConn.Close()

		// pg_dumpでスキーマをダンプ
		schemaDumpSQL, err = dumpSchemaWithPgDump(templateDBName)
		require.NoError(t, err, "スキーマダンプに失敗しました")

		// ダンプしたのでテンプレートDBは削除する
		// pg_dumpの接続が残っているのか、先に強制切断しないと削除が失敗する...
		_, _ = adminDBConn.Exec(`
			SELECT pg_terminate_backend(pid)
			FROM pg_stat_activity
			WHERE datname = $1 AND pid <> pg_backend_pid()
		`, templateDBName)
		_, err = adminDBConn.Exec("DROP DATABASE IF EXISTS " + templateDBName)
		require.NoError(t, err)
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

	// ダンプしたスキーマを実行
	_, err = testDB.Exec(schemaDumpSQL)
	require.NoError(t, err, "スキーマの作成に失敗しました")

	queries := sqlc.New(testDB)
	cleanup := func() {
		_ = testDB.Close()

		// 選択中のデータベースは削除できないので、別のデータベースから削除する
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
