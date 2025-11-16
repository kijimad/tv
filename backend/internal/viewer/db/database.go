// Package db はデータベース接続とマイグレーションを管理する
package db

import (
	"database/sql"
	"embed"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
)

// MigrationsFS はマイグレーションSQLファイルを埋め込んだファイルシステム
//
//go:embed migrations/*.sql
var MigrationsFS embed.FS

// InitDB はPostgreSQL接続文字列を受け取る
// 例: "postgres://user:password@host:port/dbname?sslmode=disable"
func InitDB(connStr string) (*sqlc.Queries, *sql.DB, error) {
	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		_ = sqlDB.Close()
		return nil, nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// マイグレーション実行
	if err := RunMigrations(sqlDB); err != nil {
		_ = sqlDB.Close()
		return nil, nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	queries := sqlc.New(sqlDB)
	return queries, sqlDB, nil
}

// RunMigrations はマイグレーションを実行する
func RunMigrations(db *sql.DB) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("failed to create postgres driver: %w", err)
	}

	source, err := iofs.New(MigrationsFS, "migrations")
	if err != nil {
		return fmt.Errorf("failed to create migration source: %w", err)
	}

	m, err := migrate.NewWithInstance("iofs", source, "postgres", driver)
	if err != nil {
		return fmt.Errorf("failed to create migrate instance: %w", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	return nil
}
