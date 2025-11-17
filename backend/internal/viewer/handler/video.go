// Package handler はHTTPハンドラを提供する
package handler

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
)

// VideoHandler は動画ハンドラ
type VideoHandler struct {
	service        service.VideoService
	sessionService service.SessionService
}

// NewVideoHandler はVideoHandlerを作成する
func NewVideoHandler(service service.VideoService, sessionService service.SessionService) *VideoHandler {
	return &VideoHandler{
		service:        service,
		sessionService: sessionService,
	}
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
		params.Title = sql.NullString{String: *req.Title, Valid: true}
	}
	if req.Filename != nil {
		params.Filename = sql.NullString{String: *req.Filename, Valid: true}
	}
	if req.StartedAt != nil {
		params.StartedAt = sql.NullTime{Time: *req.StartedAt, Valid: true}
	}
	if req.FinishedAt != nil {
		params.FinishedAt = sql.NullTime{Time: *req.FinishedAt, Valid: true}
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

// SessionsCreate はセッションを作成する
func (h *VideoHandler) SessionsCreate(c *gin.Context) {
	var req oapi.SessionCreate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	title := ""
	if req.Title != nil {
		title = *req.Title
	}

	session, err := h.sessionService.CreateSession(c.Request.Context(), sqlc.CreateSessionParams{
		Filename: req.Filename,
		Title:    title,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "create_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, toAPISession(*session, nil))
}

// SessionsUpdate はセッションを更新する
func (h *VideoHandler) SessionsUpdate(c *gin.Context, id int64) {
	var req oapi.SessionUpdate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "invalid_request",
			Message: err.Error(),
		})
		return
	}

	if req.Status == nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "invalid_request",
			Message: "status is required",
		})
		return
	}

	result, err := h.sessionService.UpdateSessionStatus(c.Request.Context(), id, string(*req.Status))
	if err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Code:    "update_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, toAPISession(result.Session, result.VideoID))
}

// StatusGet は現在の録画状態を取得する
func (h *VideoHandler) StatusGet(c *gin.Context) {
	session, err := h.sessionService.GetCurrentRecordingSession(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, oapi.Error{
			Code:    "get_failed",
			Message: err.Error(),
		})
		return
	}

	if session == nil {
		c.JSON(http.StatusOK, oapi.RecordingStatus{
			Recording:      false,
			CurrentSession: nil,
		})
		return
	}

	currentSession := toAPISession(*session, nil)
	c.JSON(http.StatusOK, oapi.RecordingStatus{
		Recording:      true,
		CurrentSession: &currentSession,
	})
}

// toAPISession はsqlc.Sessionをoapi.Sessionに変換する
func toAPISession(s sqlc.Session, videoID *int64) oapi.Session {
	id := s.ID
	createdAt := s.CreatedAt
	updatedAt := s.UpdatedAt
	startedAt := s.StartedAt
	var finishedAt *time.Time
	if s.FinishedAt.Valid {
		finishedAt = &s.FinishedAt.Time
	}

	status := oapi.SessionStatus(s.Status)

	return oapi.Session{
		Id:         &id,
		Filename:   s.Filename,
		Title:      &s.Title,
		Status:     status,
		StartedAt:  &startedAt,
		FinishedAt: finishedAt,
		CreatedAt:  &createdAt,
		UpdatedAt:  &updatedAt,
		VideoId:    videoID,
	}
}
