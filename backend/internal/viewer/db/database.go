// Package db はデータベース接続とマイグレーションを管理する
package db

import (
	"database/sql"
	"embed"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/kijimaD/tv/internal/viewer/db/gen"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録
)

//go:embed migrations/*.sql
var migrationsFS embed.FS

// InitDB はPostgreSQL接続文字列を受け取る
// 例: "postgres://user:password@host:port/dbname?sslmode=disable"
func InitDB(connStr string) (*gen.Queries, *sql.DB, error) {
	sqlDB, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		_ = sqlDB.Close()
		return nil, nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// マイグレーション実行
	if err := runMigrations(sqlDB); err != nil {
		_ = sqlDB.Close()
		return nil, nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	queries := gen.New(sqlDB)
	return queries, sqlDB, nil
}

func runMigrations(db *sql.DB) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("failed to create postgres driver: %w", err)
	}

	source, err := iofs.New(migrationsFS, "migrations")
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
