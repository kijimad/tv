// Package handler はHTTPハンドラを提供する
package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
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
func (h *VideoHandler) VideosList(c *gin.Context, params oapi.VideosListParams) {
	limit := int32(10)
	offset := int32(0)
	if params.Limit != nil {
		limit = *params.Limit
	}
	if params.Offset != nil {
		offset = *params.Offset
	}

	videos, total, err := h.service.ListVideos(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "list_failed",
			Message: err.Error(),
		})
		return
	}

	response := oapi.VideoList{
		Total:  int32(total),
		Videos: toAPIVideos(videos),
	}
	c.JSON(http.StatusOK, response)
}

// VideosCreate はビデオを作成する
func (h *VideoHandler) VideosCreate(c *gin.Context) {
	var req oapi.VideoCreate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	video, err := h.service.CreateVideo(c.Request.Context(), sqlc.CreateVideoParams{
		Title:      req.Title,
		Filename:   req.Filename,
		StartedAt:  req.StartedAt,
		FinishedAt: req.FinishedAt,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
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
		c.JSON(http.StatusNotFound, oapi.Error{
			Code:    "not_found",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, toAPIVideo(*video))
}

// VideosUpdate はビデオを更新する
func (h *VideoHandler) VideosUpdate(c *gin.Context, id int64) {
	var req oapi.VideoUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	params := sqlc.UpdateVideoParams{
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
		c.JSON(http.StatusBadRequest, oapi.Error{
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
		c.JSON(http.StatusInternalServerError, oapi.Error{
			Code:    "delete_failed",
			Message: err.Error(),
		})
		return
	}

	c.Status(http.StatusNoContent)
}

// toAPIVideo はsqlc.Videoをoapi.Videoに変換する
func toAPIVideo(v sqlc.Video) oapi.Video {
	id := v.ID
	return oapi.Video{
		Id:         &id,
		Title:      v.Title,
		Filename:   v.Filename,
		StartedAt:  v.StartedAt,
		FinishedAt: v.FinishedAt,
		CreatedAt:  &v.CreatedAt,
		UpdatedAt:  &v.UpdatedAt,
	}
}

func toAPIVideos(videos []sqlc.Video) []oapi.Video {
	result := make([]oapi.Video, len(videos))
	for i, v := range videos {
		result[i] = toAPIVideo(v)
	}
	return result
}

// SessionsCreate はセッションを作成する（仮実装）
func (h *VideoHandler) SessionsCreate(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, oapi.Error{
		Code:    "not_implemented",
		Message: "SessionsCreate is not implemented yet",
	})
}

// SessionsUpdate はセッションを更新する（仮実装）
func (h *VideoHandler) SessionsUpdate(c *gin.Context, id int64) {
	c.JSON(http.StatusNotImplemented, oapi.Error{
		Code:    "not_implemented",
		Message: "SessionsUpdate is not implemented yet",
	})
}

// StatusGet は現在の録画状態を取得する（仮実装）
func (h *VideoHandler) StatusGet(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, oapi.Error{
		Code:    "not_implemented",
		Message: "StatusGet is not implemented yet",
	})
}
