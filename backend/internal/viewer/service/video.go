// Package service はビジネスロジックを提供する
// 基本的なバリデーションはOpenAPI validatorで行っているので、OpenAPIで表現できないルールを書く
package service

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// Baser は全サービス共通の依存を提供するインターフェース
type Baser interface {
	GetConfig() config.AppConfig
	GetClock() clock.Clock
}

// VideoService は動画ビジネスロジックのインターフェース
type VideoService interface {
	Baser
	ListVideos(ctx context.Context, limit, offset int32) ([]sqlc.Video, int64, error)
	GetVideo(ctx context.Context, id int64) (*sqlc.Video, error)
	CreateVideo(ctx context.Context, params sqlc.CreateVideoParams) (*sqlc.Video, error)
	UpdateVideo(ctx context.Context, id int64, params sqlc.UpdateVideoParams) (*sqlc.Video, error)
	DeleteVideo(ctx context.Context, id int64) error
}

// VideoQuerier はビデオ操作に必要なクエリメソッドのインターフェース
type VideoQuerier interface {
	CreateVideo(ctx context.Context, params sqlc.CreateVideoParams) (sqlc.Video, error)
	GetVideo(ctx context.Context, id int64) (sqlc.Video, error)
	ListVideos(ctx context.Context, params sqlc.ListVideosParams) ([]sqlc.Video, error)
	CountVideos(ctx context.Context) (int64, error)
	UpdateVideo(ctx context.Context, params sqlc.UpdateVideoParams) (sqlc.Video, error)
	DeleteVideo(ctx context.Context, id int64) error
}

type videoService struct {
	Base
	queries VideoQuerier
}

// NewVideoService はVideoServiceを作成する
func NewVideoService(queries VideoQuerier, cfg config.AppConfig, clk clock.Clock) VideoService {
	return &videoService{
		Base:    NewBase(cfg, clk),
		queries: queries,
	}
}

func (s *videoService) ListVideos(ctx context.Context, limit, offset int32) ([]sqlc.Video, int64, error) {
	videos, err := s.queries.ListVideos(ctx, sqlc.ListVideosParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, 0, fmt.Errorf("failed to list videos: %w", err)
	}

	totalCount, err := s.queries.CountVideos(ctx)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to count videos: %w", err)
	}

	return videos, totalCount, nil
}

func (s *videoService) GetVideo(ctx context.Context, id int64) (*sqlc.Video, error) {
	video, err := s.queries.GetVideo(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get video: %w", err)
	}
	return &video, nil
}

func (s *videoService) CreateVideo(ctx context.Context, params sqlc.CreateVideoParams) (*sqlc.Video, error) {
	// 時系列の整合性チェック
	if params.StartedAt.After(params.FinishedAt) {
		return nil, ErrInvalidTimeRange
	}

	video, err := s.queries.CreateVideo(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to create video: %w", err)
	}
	return &video, nil
}

func (s *videoService) UpdateVideo(ctx context.Context, id int64, params sqlc.UpdateVideoParams) (*sqlc.Video, error) {
	// 時系列の整合性チェック
	if params.StartedAt.Valid && params.FinishedAt.Valid {
		if params.StartedAt.Time.After(params.FinishedAt.Time) {
			return nil, ErrInvalidTimeRange
		}
	}

	params.ID = id
	video, err := s.queries.UpdateVideo(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to update video: %w", err)
	}
	return &video, nil
}

func (s *videoService) DeleteVideo(ctx context.Context, id int64) error {
	// ビデオ情報を取得する
	video, err := s.queries.GetVideo(ctx, id)
	if err != nil {
		return fmt.Errorf("failed to get video: %w", err)
	}

	// DBからビデオレコードを削除する
	if err := s.queries.DeleteVideo(ctx, id); err != nil {
		return fmt.Errorf("failed to delete video: %w", err)
	}

	// 動画ファイルを削除する
	videoFilePath := filepath.Join(s.GetConfig().VideoDir, video.Filename)
	if err := os.Remove(videoFilePath); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to delete video file: %w", err)
	}

	// サムネイルファイルを削除する
	thumbnailFilename := strings.TrimSuffix(video.Filename, ".webm") + ".jpg"
	thumbnailPath := filepath.Join(s.GetConfig().VideoDir, thumbnailFilename)
	if err := os.Remove(thumbnailPath); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to delete thumbnail file: %w", err)
	}

	return nil
}
