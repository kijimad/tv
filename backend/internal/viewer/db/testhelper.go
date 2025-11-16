package db

import (
	"database/sql"
	"fmt"
	"sync"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
	"github.com/stretchr/testify/require"
)

var (
	// テンプレートスキーマの初期化は1回だけ実行する
	templateOnce sync.Once
	// テンプレートDB用の接続はテスト全体で使い回す
	templateDBConn *sql.DB
	// 初期化完了を通知するチャネル
	templateReady = make(chan struct{})
)

const (
	// テンプレートスキーマ名
	templateSchema = "test_template"
	// テスト用データベースのDSN
	testDBDSN = "postgres://root:root@localhost:5432/test?sslmode=disable"
)

// SetupTestDB はテンプレートスキーマをコピーして独立したテストDBをセットアップする
func SetupTestDB(t *testing.T) (*sqlc.Queries, func()) {
	t.Helper()

	// テンプレートスキーマの初期化（1回だけ）
	templateOnce.Do(func() {
		var err error
		templateDBConn, err = sql.Open("postgres", testDBDSN)
		require.NoError(t, err, "テスト用DB接続に失敗しました")

		err = templateDBConn.Ping()
		require.NoError(t, err, "テスト用DBへのPingに失敗しました")

		// test_templateは残す（既存のテストスキーマのみ削除）
		rows, err := templateDBConn.Query(`
			SELECT schema_name
			FROM information_schema.schemata
			WHERE schema_name LIKE 'test_%'
			AND schema_name != 'test_template'
		`)
		if err == nil {
			var schemas []string
			for rows.Next() {
				var schemaName string
				if err := rows.Scan(&schemaName); err == nil {
					schemas = append(schemas, schemaName)
				}
			}
			_ = rows.Close()
			for _, schema := range schemas {
				_, _ = templateDBConn.Exec("DROP SCHEMA IF EXISTS " + schema + " CASCADE")
			}
		}

		// テンプレートスキーマを作成してマイグレーション実行
		_, err = templateDBConn.Exec("CREATE SCHEMA IF NOT EXISTS " + templateSchema)
		require.NoError(t, err)
		err = RunMigrations(templateDBConn, templateSchema)
		require.NoError(t, err, "マイグレーションの実行に失敗しました")

		// 初期化完了を通知
		close(templateReady)
	})

	// 初期化完了を待つ
	<-templateReady

	// テスト用スキーマを作成してテーブルをコピー
	timestamp := time.Now().UnixNano()
	testSchema := fmt.Sprintf("test_%d", timestamp)

	_, err := templateDBConn.Exec("CREATE SCHEMA " + testSchema)
	require.NoError(t, err, "テストスキーマの作成に失敗しました")

	rows, err := templateDBConn.Query(`
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = $1
		AND table_type = 'BASE TABLE'
	`, templateSchema)
	require.NoError(t, err, "テーブル一覧の取得に失敗しました")

	var tables []string
	for rows.Next() {
		var tableName string
		if err := rows.Scan(&tableName); err == nil {
			tables = append(tables, tableName)
		}
	}
	_ = rows.Close()

	for _, table := range tables {
		_, err = templateDBConn.Exec(fmt.Sprintf(`
			CREATE TABLE %s.%s (LIKE %s.%s INCLUDING ALL)
		`, testSchema, table, templateSchema, table))
		require.NoError(t, err, fmt.Sprintf("テーブル %s のコピーに失敗しました", table))
	}

	// 並列テスト用に専用のDB接続を作成する
	testDB, err := sql.Open("postgres", testDBDSN)
	require.NoError(t, err, "テスト用DB接続の作成に失敗しました")

	_, err = testDB.Exec("SET search_path TO " + testSchema)
	require.NoError(t, err, "検索パスの設定に失敗しました")

	queries := sqlc.New(testDB)
	cleanup := func() {
		_ = testDB.Close()
		_, _ = templateDBConn.Exec("DROP SCHEMA IF EXISTS " + testSchema + " CASCADE")
	}

	return queries, cleanup
}
