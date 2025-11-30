package cmd

import (
	"context"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/clock"
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
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	queries, sqlDB, err := db.InitDB(cfg.DBConnectionStr)
	if err != nil {
		return fmt.Errorf("failed to initialize database: %w", err)
	}
	defer func() {
		_ = sqlDB.Close()
	}()

	// 依存関係を注入
	videoService := service.NewVideoService(queries, cfg, clock.RealClock{})
	statisticsService := service.NewStatisticsService(queries)
	h := handler.NewHandler(videoService, statisticsService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// OpenAPIバリデーションミドルウェアを追加
	validateMiddleware, err := handler.MakeValidateMiddleware()
	if err != nil {
		return fmt.Errorf("failed to create validate middleware: %w", err)
	}
	r.Use(validateMiddleware)

	strictHandler := oapi.NewStrictHandler(h, nil)
	oapi.RegisterHandlers(r, strictHandler)

	return r.Run(cfg.Address)
}
