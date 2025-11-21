// Package handler はHTTPハンドラを提供する
package handler

import (
	"database/sql"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
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
func NewVideoHandler(svc service.VideoService, sessionService service.SessionService) *VideoHandler {
	return &VideoHandler{
		service:        svc,
		sessionService: sessionService,
	}
}

// VideosList はビデオ一覧を取得する
func (h *VideoHandler) VideosList(c *gin.Context, params oapi.VideosListParams) {
	page := int32(1)
	size := int32(30)
	if params.Page != nil {
		page = *params.Page
	}
	if params.Size != nil {
		size = *params.Size
	}

	// page/sizeをoffset/limitに変換する
	offset := (page - 1) * size
	limit := size

	videos, totalCount, err := h.service.ListVideos(c.Request.Context(), limit, offset)
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	response := oapi.VideoPage{
		Pager: oapi.Pager{
			Page:       page,
			Size:       size,
			TotalCount: int32(totalCount),
		},
		Data: toAPIVideos(videos),
	}
	c.JSON(http.StatusOK, response)
}

// VideosCreate はビデオを作成する
func (h *VideoHandler) VideosCreate(c *gin.Context) {
	var req oapi.VideoCreate
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
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
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	c.JSON(http.StatusCreated, toAPIVideo(*video))
}

// VideosGet はビデオ詳細を取得する
func (h *VideoHandler) VideosGet(c *gin.Context, id int64) {
	video, err := h.service.GetVideo(c.Request.Context(), id)
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
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
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	c.JSON(http.StatusOK, toAPIVideo(*video))
}

// VideosDelete はビデオを削除する
func (h *VideoHandler) VideosDelete(c *gin.Context, id int64) {
	if err := h.service.DeleteVideo(c.Request.Context(), id); err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	c.Status(http.StatusNoContent)
}

// VideosFile は動画ファイルを配信する
func (h *VideoHandler) VideosFile(c *gin.Context, id int64) {
	// ビデオ情報を取得する
	video, err := h.service.GetVideo(c.Request.Context(), id)
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	// ファイル名を検証する（パストラバーサル対策）
	if err := validateFilename(video.Filename); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Message: err.Error(),
		})
		return
	}

	// ファイルパスを構築する
	filePath := filepath.Join(h.service.GetConfig().VideoDir, video.Filename)

	// Content-Typeを設定して配信する
	c.Header("Content-Type", "video/webm")
	c.File(filePath)
}

// VideosThumbnail はサムネイル画像を配信する
func (h *VideoHandler) VideosThumbnail(c *gin.Context, id int64) {
	// ビデオ情報を取得する
	video, err := h.service.GetVideo(c.Request.Context(), id)
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	// ファイル名を検証する（パストラバーサル対策）
	if err := validateFilename(video.Filename); err != nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Message: err.Error(),
		})
		return
	}

	// サムネイルパスを生成する
	thumbnailFilename := strings.TrimSuffix(video.Filename, ".webm") + ".jpg"
	thumbnailPath := filepath.Join(h.service.GetConfig().VideoDir, thumbnailFilename)

	// Content-Typeを設定して配信する
	c.Header("Content-Type", "image/jpeg")
	c.Header("Cache-Control", "public, max-age=31536000")
	c.File(thumbnailPath)
}

// validateFilename はファイル名を検証する（パストラバーサル対策）
func validateFilename(filename string) error {
	// ファイル名にパス区切り文字が含まれていないことを確認する
	if strings.Contains(filename, "/") || strings.Contains(filename, "\\") {
		return fmt.Errorf("filename contains path separator")
	}
	// ファイル名に相対パス指定が含まれていないことを確認する
	if strings.Contains(filename, "..") {
		return fmt.Errorf("filename contains relative path")
	}
	return nil
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
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
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
			Message: err.Error(),
		})
		return
	}

	if req.Status == nil {
		c.JSON(http.StatusBadRequest, oapi.Error{
			Message: "status is required",
		})
		return
	}

	result, err := h.sessionService.UpdateSessionStatus(c.Request.Context(), id, string(*req.Status))
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
		})
		return
	}

	c.JSON(http.StatusOK, toAPISession(result.Session, result.VideoID))
}

// StatusGet は現在の録画状態を取得する
func (h *VideoHandler) StatusGet(c *gin.Context) {
	session, err := h.sessionService.GetCurrentRecordingSession(c.Request.Context())
	if err != nil {
		statusCode, message := errorResponse(err)
		c.JSON(statusCode, oapi.Error{
			Message: message,
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
