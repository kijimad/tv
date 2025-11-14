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
	Action: func(ctx context.Context, cmd *cli.Command) error {
		return runMigrate()
	},
}

func runMigrate() error {
	_, sqlDB, err := db.InitDB(config.Config.DBConnectionStr)
	if err != nil {
		return fmt.Errorf("failed to run migrations: %w", err)
	}
	defer sqlDB.Close()

	return nil
}
