package handler

import (
	"context"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/service"
)

// Handler はすべてのハンドラを統合したハンドラ
type Handler struct {
	*VideoHandler
	*StatisticsHandler
}

// NewHandler はHandlerを作成する
func NewHandler(videoSvc service.VideoService, statisticsSvc service.StatisticsService) *Handler {
	return &Handler{
		VideoHandler:      NewVideoHandler(videoSvc),
		StatisticsHandler: NewStatisticsHandler(statisticsSvc),
	}
}

// VideosList はビデオ一覧を取得する
func (h *Handler) VideosList(ctx context.Context, request oapi.VideosListRequestObject) (oapi.VideosListResponseObject, error) {
	return h.VideoHandler.VideosList(ctx, request)
}

// VideosCreate はビデオを作成する
func (h *Handler) VideosCreate(ctx context.Context, request oapi.VideosCreateRequestObject) (oapi.VideosCreateResponseObject, error) {
	return h.VideoHandler.VideosCreate(ctx, request)
}

// VideosGet はビデオ詳細を取得する
func (h *Handler) VideosGet(ctx context.Context, request oapi.VideosGetRequestObject) (oapi.VideosGetResponseObject, error) {
	return h.VideoHandler.VideosGet(ctx, request)
}

// VideosUpdate はビデオを更新する
func (h *Handler) VideosUpdate(ctx context.Context, request oapi.VideosUpdateRequestObject) (oapi.VideosUpdateResponseObject, error) {
	return h.VideoHandler.VideosUpdate(ctx, request)
}

// VideosDelete はビデオを削除する
func (h *Handler) VideosDelete(ctx context.Context, request oapi.VideosDeleteRequestObject) (oapi.VideosDeleteResponseObject, error) {
	return h.VideoHandler.VideosDelete(ctx, request)
}

// VideosFile は動画ファイルを配信する
func (h *Handler) VideosFile(ctx context.Context, request oapi.VideosFileRequestObject) (oapi.VideosFileResponseObject, error) {
	return h.VideoHandler.VideosFile(ctx, request)
}

// VideosThumbnail はサムネイル画像を配信する
func (h *Handler) VideosThumbnail(ctx context.Context, request oapi.VideosThumbnailRequestObject) (oapi.VideosThumbnailResponseObject, error) {
	return h.VideoHandler.VideosThumbnail(ctx, request)
}

// StatisticsAPIGet は統計を取得する
func (h *Handler) StatisticsAPIGet(ctx context.Context, request oapi.StatisticsAPIGetRequestObject) (oapi.StatisticsAPIGetResponseObject, error) {
	return h.StatisticsHandler.StatisticsAPIGet(ctx, request)
}
