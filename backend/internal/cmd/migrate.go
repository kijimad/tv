package cmd

import (
	"context"
	"fmt"

	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/urfave/cli/v3"
)

// CmdMigrate is the migrate subcommand
var CmdMigrate = &cli.Command{
	Name:  "migrate",
	Usage: "Run database migrations",
	Action: func(_ context.Context, _ *cli.Command) error {
		return runMigrate()
	},
}

func runMigrate() error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	_, sqlDB, err := db.InitDB(cfg.DBConnectionStr)
	if err != nil {
		return fmt.Errorf("failed to run migrations: %w", err)
	}
	defer func() {
		_ = sqlDB.Close()
	}()

	return nil
}
