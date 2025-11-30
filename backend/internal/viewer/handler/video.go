// Package handler はHTTPハンドラを提供する
package handler

import (
	"context"
	"database/sql"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
)

// VideoHandler は動画ハンドラ
type VideoHandler struct {
	videoSvc service.VideoService
}

// NewVideoHandler はVideoHandlerを作成する
func NewVideoHandler(videoSvc service.VideoService) *VideoHandler {
	return &VideoHandler{
		videoSvc: videoSvc,
	}
}

// VideosList はビデオ一覧を取得する
func (h *VideoHandler) VideosList(ctx context.Context, request oapi.VideosListRequestObject) (oapi.VideosListResponseObject, error) {
	page := int32(1)
	size := int32(30)
	if request.Params.Page != nil {
		page = *request.Params.Page
	}
	if request.Params.Size != nil {
		size = *request.Params.Size
	}

	// page/sizeをoffset/limitに変換する
	offset := (page - 1) * size
	limit := size

	videos, totalCount, err := h.videoSvc.ListVideos(ctx, limit, offset)
	if err != nil {
		return nil, err
	}

	return oapi.VideosList200JSONResponse{
		Pager: oapi.Pager{
			Page:       page,
			Size:       size,
			TotalCount: int32(totalCount),
		},
		Data: toAPIVideos(videos),
	}, nil
}

// VideosCreate はビデオを作成する
func (h *VideoHandler) VideosCreate(ctx context.Context, request oapi.VideosCreateRequestObject) (oapi.VideosCreateResponseObject, error) {
	video, err := h.videoSvc.CreateVideo(ctx, sqlc.CreateVideoParams{
		Title:              request.Body.Title,
		Filename:           request.Body.Filename,
		StartedAt:          request.Body.StartedAt,
		FinishedAt:         sql.NullTime{Time: request.Body.FinishedAt, Valid: true},
		AudioActivityRatio: request.Body.AudioActivityRatio,
	})
	if err != nil {
		statusCode, message := errorResponse(err)
		return oapi.VideosCreatedefaultJSONResponse{
			Body:       oapi.Error{Message: message},
			StatusCode: statusCode,
		}, nil
	}

	return oapi.VideosCreate201JSONResponse(toAPIVideo(*video)), nil
}

// VideosGet はビデオ詳細を取得する
func (h *VideoHandler) VideosGet(ctx context.Context, request oapi.VideosGetRequestObject) (oapi.VideosGetResponseObject, error) {
	video, err := h.videoSvc.GetVideo(ctx, request.Id)
	if err != nil {
		statusCode, message := errorResponse(err)
		return oapi.VideosGetdefaultJSONResponse{
			Body:       oapi.Error{Message: message},
			StatusCode: statusCode,
		}, nil
	}

	return oapi.VideosGet200JSONResponse(toAPIVideo(*video)), nil
}

// VideosUpdate はビデオを更新する
func (h *VideoHandler) VideosUpdate(ctx context.Context, request oapi.VideosUpdateRequestObject) (oapi.VideosUpdateResponseObject, error) {
	params := sqlc.UpdateVideoParams{
		ID: request.Id,
	}
	if request.Body.Title != nil {
		params.Title = sql.NullString{String: *request.Body.Title, Valid: true}
	}
	if request.Body.Filename != nil {
		params.Filename = sql.NullString{String: *request.Body.Filename, Valid: true}
	}
	if request.Body.StartedAt != nil {
		params.StartedAt = sql.NullTime{Time: *request.Body.StartedAt, Valid: true}
	}
	if request.Body.FinishedAt != nil {
		params.FinishedAt = sql.NullTime{Time: *request.Body.FinishedAt, Valid: true}
	}
	if request.Body.AudioActivityRatio != nil {
		params.AudioActivityRatio = sql.NullFloat64{Float64: *request.Body.AudioActivityRatio, Valid: true}
	}

	video, err := h.videoSvc.UpdateVideo(ctx, request.Id, params)
	if err != nil {
		statusCode, message := errorResponse(err)
		return oapi.VideosUpdatedefaultJSONResponse{
			Body:       oapi.Error{Message: message},
			StatusCode: statusCode,
		}, nil
	}

	return oapi.VideosUpdate200JSONResponse(toAPIVideo(*video)), nil
}

// VideosDelete はビデオを削除する
func (h *VideoHandler) VideosDelete(ctx context.Context, request oapi.VideosDeleteRequestObject) (oapi.VideosDeleteResponseObject, error) {
	if err := h.videoSvc.DeleteVideo(ctx, request.Id); err != nil {
		statusCode, message := errorResponse(err)
		return oapi.VideosDeletedefaultJSONResponse{
			Body:       oapi.Error{Message: message},
			StatusCode: statusCode,
		}, nil
	}

	return oapi.VideosDelete204Response{}, nil
}

// VideosFile は動画ファイルを配信する
func (h *VideoHandler) VideosFile(ctx context.Context, request oapi.VideosFileRequestObject) (oapi.VideosFileResponseObject, error) {
	// ビデオ情報を取得する
	video, err := h.videoSvc.GetVideo(ctx, request.Id)
	if err != nil {
		return nil, err
	}

	// ファイル名を検証する（パストラバーサル対策）
	if err := validateFilename(video.Filename); err != nil {
		return nil, err
	}

	// ファイルパスを構築する
	filePath := filepath.Join(h.videoSvc.GetConfig().VideoDir, video.Filename)

	return &videosFileResponse{filePath: filePath}, nil
}

// VideosThumbnail はサムネイル画像を配信する
func (h *VideoHandler) VideosThumbnail(ctx context.Context, request oapi.VideosThumbnailRequestObject) (oapi.VideosThumbnailResponseObject, error) {
	// ビデオ情報を取得する
	video, err := h.videoSvc.GetVideo(ctx, request.Id)
	if err != nil {
		return nil, err
	}

	// ファイル名を検証する（パストラバーサル対策）
	if err := validateFilename(video.Filename); err != nil {
		return nil, err
	}

	// サムネイルパスを生成する
	thumbnailFilename := strings.TrimSuffix(video.Filename, ".webm") + ".jpg"
	thumbnailPath := filepath.Join(h.videoSvc.GetConfig().VideoDir, thumbnailFilename)

	return &videosThumbnailResponse{filePath: thumbnailPath}, nil
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
	var finishedAt *time.Time
	if v.FinishedAt.Valid {
		finishedAt = &v.FinishedAt.Time
	}
	return oapi.Video{
		Id:                 &id,
		Title:              v.Title,
		Filename:           v.Filename,
		StartedAt:          v.StartedAt,
		FinishedAt:         finishedAt,
		AudioActivityRatio: v.AudioActivityRatio,
		CreatedAt:          &v.CreatedAt,
		UpdatedAt:          &v.UpdatedAt,
	}
}

func toAPIVideos(videos []sqlc.Video) []oapi.Video {
	result := make([]oapi.Video, len(videos))
	for i, v := range videos {
		result[i] = toAPIVideo(v)
	}
	return result
}

// videosFileResponse はファイル配信のレスポンス
type videosFileResponse struct {
	filePath string
}

func (r *videosFileResponse) VisitVideosFileResponse(w http.ResponseWriter) error {
	// ファイルを開く
	file, err := os.Open(r.filePath)
	if err != nil {
		return fmt.Errorf("failed to open video file: %w", err)
	}
	defer func() {
		_ = file.Close()
	}()

	// ファイル情報を取得する
	stat, err := file.Stat()
	if err != nil {
		return fmt.Errorf("failed to stat video file: %w", err)
	}

	// Content-Typeとサイズを設定する
	w.Header().Set("Content-Type", "video/webm")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", stat.Size()))

	// ファイルを配信する
	_, err = io.Copy(w, file)
	return err
}

// videosThumbnailResponse はサムネイル配信のレスポンス
type videosThumbnailResponse struct {
	filePath string
}

func (r *videosThumbnailResponse) VisitVideosThumbnailResponse(w http.ResponseWriter) error {
	// ファイルを開く
	file, err := os.Open(r.filePath)
	if err != nil {
		return fmt.Errorf("failed to open thumbnail file: %w", err)
	}
	defer func() {
		_ = file.Close()
	}()

	// ファイル情報を取得する
	stat, err := file.Stat()
	if err != nil {
		return fmt.Errorf("failed to stat thumbnail file: %w", err)
	}

	// Content-Typeとサイズを設定する
	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", stat.Size()))

	// ファイルを配信する
	_, err = io.Copy(w, file)
	return err
}
