package handler

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/kijimaD/tv/internal/viewer/service"
)

// errorResponse はエラーをHTTPステータスコードとメッセージに変換する
// oapi validator はここまで到達せずに400エラーを返してくれるので書く必要はない
func errorResponse(err error) (int, string) {
	switch {
	// 400
	case errors.Is(err, service.ErrInvalidTimeRange):
		return http.StatusBadRequest, err.Error()
	// 404
	case errors.Is(err, sql.ErrNoRows):
		return http.StatusNotFound, http.StatusText(http.StatusNotFound)
	// 500
	default:
		return http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError)
	}
}
