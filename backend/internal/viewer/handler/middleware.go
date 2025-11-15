package handler

import (
	"errors"
	"net/http"
	"strings"

	"log/slog"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	oapiMiddleware "github.com/oapi-codegen/gin-middleware"
)

// MakeValidateMiddleware はOpenAPIバリデーションミドルウェアを作成する
func MakeValidateMiddleware() (gin.HandlerFunc, error) {
	swagger, err := oapi.GetSwagger()
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
