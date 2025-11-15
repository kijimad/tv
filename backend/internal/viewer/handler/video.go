// Package handler はHTTPハンドラを提供する
package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/gen"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
	"github.com/kijimaD/tv/internal/viewer/service"
)

// VideoHandler は動画ハンドラ
type VideoHandler struct {
	service service.VideoService
}

// NewVideoHandler はVideoHandlerを作成する
func NewVideoHandler(service service.VideoService) *VideoHandler {
	return &VideoHandler{service: service}
}

// VideosList はビデオ一覧を取得する
func (h *VideoHandler) VideosList(c *gin.Context, params gen.VideosListParams) {
	limit := int32(10)
	offset := int32(0)
	if params.Limit != nil {
		limit = int32(*params.Limit)
	}
	if params.Offset != nil {
		offset = int32(*params.Offset)
	}

	videos, total, err := h.service.ListVideos(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "list_failed",
			Message: err.Error(),
		})
		return
	}

	response := gen.VideoList{
		Total:  int32(total),
		Videos: toAPIVideos(videos),
	}
	c.JSON(http.StatusOK, response)
}

// VideosCreate はビデオを作成する
func (h *VideoHandler) VideosCreate(c *gin.Context) {
	var req gen.VideoCreate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	video, err := h.service.CreateVideo(c.Request.Context(), dbgen.CreateVideoParams{
		Title:      req.Title,
		Filename:   req.Filename,
		StartedAt:  req.StartedAt,
		FinishedAt: req.FinishedAt,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "create_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, toAPIVideo(*video))
}

// VideosGet はビデオ詳細を取得する
func (h *VideoHandler) VideosGet(c *gin.Context, id int64) {
	video, err := h.service.GetVideo(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gen.Error{
			Code:    "not_found",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, toAPIVideo(*video))
}

// VideosUpdate はビデオを更新する
func (h *VideoHandler) VideosUpdate(c *gin.Context, id int64) {
	var req gen.VideoUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	params := dbgen.UpdateVideoParams{
		ID: id,
	}
	if req.Title != nil {
		params.Title = *req.Title
	}
	if req.Filename != nil {
		params.Filename = *req.Filename
	}
	if req.StartedAt != nil {
		params.StartedAt = *req.StartedAt
	}
	if req.FinishedAt != nil {
		params.FinishedAt = *req.FinishedAt
	}

	video, err := h.service.UpdateVideo(c.Request.Context(), id, params)
	if err != nil {
		c.JSON(http.StatusBadRequest, gen.Error{
			Code:    "update_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, toAPIVideo(*video))
}

// VideosDelete はビデオを削除する
func (h *VideoHandler) VideosDelete(c *gin.Context, id int64) {
	if err := h.service.DeleteVideo(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gen.Error{
			Code:    "delete_failed",
			Message: err.Error(),
		})
		return
	}

	c.Status(http.StatusNoContent)
}

// toAPIVideo はdbgen.Videoをgen.Videoに変換する
func toAPIVideo(v dbgen.Video) gen.Video {
	id := v.ID
	return gen.Video{
		Id:         &id,
		Title:      v.Title,
		Filename:   v.Filename,
		StartedAt:  v.StartedAt,
		FinishedAt: v.FinishedAt,
		CreatedAt:  &v.CreatedAt,
		UpdatedAt:  &v.UpdatedAt,
	}
}

func toAPIVideos(videos []dbgen.Video) []gen.Video {
	result := make([]gen.Video, len(videos))
	for i, v := range videos {
		result[i] = toAPIVideo(v)
	}
	return result
}
