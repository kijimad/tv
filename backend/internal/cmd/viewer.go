package cmd

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/handler"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/urfave/cli/v3"
)

// CmdViewer is the viewer subcommand
var CmdViewer = &cli.Command{
	Name:  "viewer",
	Usage: "Start the video viewer backend server",
	Action: func(_ context.Context, _ *cli.Command) error {
		return runViewer()
	},
}

func runViewer() error {
	queries, sqlDB, err := db.InitDB(config.Config.DBConnectionStr)
	if err != nil {
		return fmt.Errorf("failed to initialize database: %w", err)
	}
	defer func() {
		_ = sqlDB.Close()
	}()

	// 依存関係を注入
	videoService := service.NewVideoService(queries)
	sessionService := service.NewSessionService(queries)
	videoHandler := handler.NewVideoHandler(videoService, sessionService)

	r := gin.Default()

	// OpenAPIバリデーションミドルウェアを追加
	validateMiddleware, err := handler.MakeValidateMiddleware()
	if err != nil {
		return fmt.Errorf("failed to create validate middleware: %w", err)
	}
	r.Use(validateMiddleware)

	oapi.RegisterHandlers(r, videoHandler)

	return r.Run(config.Config.Address)
}
