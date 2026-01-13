package cmd

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
	_ "github.com/lib/pq" // PostgreSQLドライバを登録する
	"github.com/urfave/cli/v3"
)

// CmdCleaner は古い動画ファイルを削除するコマンド
var CmdCleaner = &cli.Command{
	Name:        "cleaner",
	Usage:       "Delete old video files",
	Description: "Delete video files older than specified days (レコードは残す)",
	Flags: []cli.Flag{
		&cli.IntFlag{
			Name:  "days",
			Usage: "Delete files older than this many days",
			Value: 60,
		},
	},
	Action: func(_ context.Context, cmd *cli.Command) error {
		return runCleaner(cmd.Int("days"))
	},
}

func runCleaner(olderThanDays int) error {
	ctx := context.Background()

	// 設定を読み込む
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	// データベース接続を開く
	db, err := sql.Open("postgres", cfg.DBConnectionStr)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}
	defer func() {
		_ = db.Close()
	}()

	// クエリとサービスを作成する
	queries := sqlc.New(db)
	clk := clock.RealClock{}
	svc := service.NewVideoService(queries, cfg, clk)

	// 古い動画ファイルを削除する
	deleted, err := svc.DeleteOldVideoFiles(ctx, olderThanDays)
	if err != nil {
		return fmt.Errorf("failed to delete old video files: %w", err)
	}

	log.Printf("deleted %d video files older than %d days", deleted, olderThanDays)
	return nil
}
