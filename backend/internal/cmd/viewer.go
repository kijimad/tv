package cmd

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"log/slog"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/gen"
	"github.com/kijimaD/tv/internal/viewer"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	oapiMiddleware "github.com/oapi-codegen/gin-middleware"
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

	handler := viewer.NewHandler(queries)

	r := gin.Default()

	// OpenAPIバリデーションミドルウェアを追加
	validateMiddleware, err := makeValidateMiddleware()
	if err != nil {
		return fmt.Errorf("failed to create validate middleware: %w", err)
	}
	r.Use(validateMiddleware)

	gen.RegisterHandlers(r, handler)

	return r.Run(config.Config.Address)
}

func makeValidateMiddleware() (gin.HandlerFunc, error) {
	swagger, err := gen.GetSwagger()
	if err != nil {
		return nil, err
	}
	swagger.Servers = nil

	return oapiMiddleware.OapiRequestValidatorWithOptions(swagger, &oapiMiddleware.Options{
		ErrorHandler: func(ctx *gin.Context, message string, statusCode int) {
			if message == "no matching operation was found" {
				ctx.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			} else {
				ctx.JSON(statusCode, gin.H{"message": message})
			}
		},
		Options: openapi3filter.Options{
			MultiError:          true,
			AuthenticationFunc:  openapi3filter.NoopAuthenticationFunc,
			SkipSettingDefaults: true,
		},
		MultiErrorHandler: func(multiErr openapi3.MultiError) error {
			if len(multiErr) == 0 {
				return nil
			}
			// 複数エラーがあったら最初だけ出す
			err := multiErr[0]
			slog.Error(err.Error())

			switch e := err.(type) {
			case *openapi3filter.SecurityRequirementsError:
				return errors.New("security requirements error")
			case *openapi3filter.RequestError:
				switch {
				case errors.Is(e, openapi3filter.ErrInvalidRequired), errors.Is(err, openapi3filter.ErrInvalidEmptyValue):
					return e
				default:
					message := strings.TrimSpace(e.Error())
					return errors.New(message)
				}
			}
			return err
		},
	}), nil
}
