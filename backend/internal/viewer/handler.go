// Package viewer はビューアAPIのハンドラを提供する
package viewer

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/gen"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
)

// Handler はAPIハンドラを実装する
type Handler struct {
	queries *dbgen.Queries
}

// NewHandler はHandlerを作成する
func NewHandler(queries *dbgen.Queries) *Handler {
	return &Handler{
		queries: queries,
	}
}

// VideosList はビデオ一覧を取得する
func (h *Handler) VideosList(c *gin.Context, _ gen.VideosListParams) {
	// TODO: paramsを使ってlimit/offsetでページネーション
	response := gen.VideoList{
		Total:  0,
		Videos: []gen.Video{},
	}
	c.JSON(http.StatusOK, response)
}

// VideosCreate はビデオを作成する
func (h *Handler) VideosCreate(c *gin.Context) {
	var req gen.VideoCreate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	// TODO: データベースに保存
	response := gen.Video{
		Id:         nil,
		Title:      req.Title,
		Filename:   req.Filename,
		StartedAt:  req.StartedAt,
		FinishedAt: req.FinishedAt,
		CreatedAt:  nil,
		UpdatedAt:  nil,
	}
	c.JSON(http.StatusCreated, response)
}

// VideosGet はビデオ詳細を取得する
func (h *Handler) VideosGet(c *gin.Context, id int64) {
	// TODO: データベースから取得
	response := gen.Video{
		Id:         &id,
		Title:      "",
		Filename:   "",
		StartedAt:  time.Time{},
		FinishedAt: time.Time{},
		CreatedAt:  nil,
		UpdatedAt:  nil,
	}
	c.JSON(http.StatusOK, response)
}

// VideosUpdate はビデオを更新する
func (h *Handler) VideosUpdate(c *gin.Context, id int64) {
	var req gen.VideoUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	// TODO: データベースを更新
	response := gen.Video{
		Id:         &id,
		Title:      "",
		Filename:   "",
		StartedAt:  time.Time{},
		FinishedAt: time.Time{},
		CreatedAt:  nil,
		UpdatedAt:  nil,
	}
	c.JSON(http.StatusOK, response)
}

// VideosDelete はビデオを削除する
func (h *Handler) VideosDelete(c *gin.Context, _ int64) {
	// TODO: idを使ってデータベースから削除
	c.Status(http.StatusNoContent)
}
