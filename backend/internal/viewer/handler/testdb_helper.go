package handler

import (
	"database/sql"
	"fmt"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
	"github.com/stretchr/testify/require"
)

// テンプレートスキーマの初期化は1回だけ
var (
	templateOnce sync.Once
	targetDB     *sql.DB
)

const templateSchema = "test_template"

// getTestConnStr はテスト用のPostgreSQL接続文字列を返す
// テスト用のデータベース名 tv_test を使用
func getTestConnStr() string {
	return "postgres://root:root@localhost:5432/tv_test?sslmode=disable"
}

// initTemplateSchema はマイグレーション済みのテンプレートスキーマを作成する
// 全テストで1回だけ実行される
func initTemplateSchema(t *testing.T) {
	templateOnce.Do(func() {
		connStr := getTestConnStr()
		var err error
		targetDB, err = sql.Open("postgres", connStr)
		require.NoError(t, err, "PostgreSQL接続に失敗しました")

		err = targetDB.Ping()
		require.NoError(t, err, "PostgreSQLへのPingに失敗しました")

		// 既存の全てのテストスキーマを削除する
		rows, err := targetDB.Query(`
			SELECT schema_name
			FROM information_schema.schemata
			WHERE schema_name LIKE 'test_%'
		`)
		if err == nil {
			defer rows.Close()
			var schemas []string
			for rows.Next() {
				var schemaName string
				if err := rows.Scan(&schemaName); err == nil {
					schemas = append(schemas, schemaName)
				}
			}
			// 全てのテストスキーマを削除する
			for _, schema := range schemas {
				_, _ = targetDB.Exec("DROP SCHEMA IF EXISTS " + schema + " CASCADE")
			}
			t.Logf("既存のテストスキーマ %d 個を削除しました", len(schemas))
		}

		// テンプレートスキーマを作成する
		_, err = targetDB.Exec("CREATE SCHEMA " + templateSchema)
		require.NoError(t, err)

		// テンプレートスキーマでマイグレーション実行する
		_, err = targetDB.Exec("SET search_path TO " + templateSchema)
		require.NoError(t, err)
		err = db.RunMigrations(targetDB, templateSchema)
		require.NoError(t, err, "マイグレーションの実行に失敗しました")
		t.Logf("テンプレートスキーマ %s を初期化しました", templateSchema)
	})
}

// setupTestDB はテンプレートスキーマをコピーしてテストDBをセットアップする
func setupTestDB(t *testing.T) (*dbgen.Queries, func()) {
	t.Helper()

	// テンプレートスキーマの初期化（1回だけ）
	initTemplateSchema(t)

	require.NotNil(t, targetDB, "PostgreSQL接続が初期化されていません")

	// テスト用の一意なスキーマ名を生成
	// テスト名 + タイムスタンプで衝突を防ぐ
	testName := strings.ReplaceAll(t.Name(), "/", "_")
	timestamp := time.Now().UnixNano()
	testSchema := fmt.Sprintf("test_%s_%d", testName, timestamp)

	_, err := targetDB.Exec("CREATE SCHEMA " + testSchema)
	require.NoError(t, err, "テストスキーマの作成に失敗しました")

	// テーブル構造をコピー（LIKE句を使用）
	_, err = targetDB.Exec(fmt.Sprintf(`
		CREATE TABLE %s.videos (LIKE %s.videos INCLUDING ALL)
	`, testSchema, templateSchema))
	require.NoError(t, err, "テーブル構造のコピーに失敗しました")

	// 並列テスト用に専用のDB接続を作成
	// search_pathを設定するとセッション全体に影響するため、専用接続が必要
	testDB, err := sql.Open("postgres", getTestConnStr())
	require.NoError(t, err, "テスト用DB接続の作成に失敗しました")

	// 検索パスを設定
	_, err = testDB.Exec("SET search_path TO " + testSchema)
	require.NoError(t, err, "検索パスの設定に失敗しました")

	queries := dbgen.New(testDB)

	cleanup := func() {
		// DB接続をクローズ
		_ = testDB.Close()
		// 非同期でスキーマを削除（テスト終了を待たない）
		go func() {
			_, _ = targetDB.Exec("DROP SCHEMA IF EXISTS " + testSchema + " CASCADE")
		}()
	}

	return queries, cleanup
}
