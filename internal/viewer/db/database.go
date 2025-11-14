package db

import (
	"database/sql"
	_ "embed"
	"fmt"

	"github.com/kijimaD/tv/internal/viewer/db/gen"
	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var schemaSQL string

// InitDB initializes the database and returns a Queries instance
func InitDB(dbPath string) (*gen.Queries, *sql.DB, error) {
	sqlDB, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Execute schema
	if _, err := sqlDB.Exec(schemaSQL); err != nil {
		sqlDB.Close()
		return nil, nil, fmt.Errorf("failed to execute schema: %w", err)
	}

	queries := gen.New(sqlDB)
	return queries, sqlDB, nil
}
