// Package service はビジネスロジックを提供する
// 基本的なバリデーションはOpenAPI validatorで行っているので、OpenAPIで表現できないルールを書く
package service

import (
	"context"
	"fmt"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// VideoService は動画ビジネスロジックのインターフェース
type VideoService interface {
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
	UpdateVideo(ctx context.Context, params sqlc.UpdateVideoParams) (sqlc.Video, error)
	DeleteVideo(ctx context.Context, id int64) error
}

type videoService struct {
	queries VideoQuerier
}

// NewVideoService はVideoServiceを作成する
func NewVideoService(queries VideoQuerier) VideoService {
	return &videoService{queries: queries}
}

func (s *videoService) ListVideos(ctx context.Context, limit, offset int32) ([]sqlc.Video, int64, error) {
	videos, err := s.queries.ListVideos(ctx, sqlc.ListVideosParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, 0, fmt.Errorf("failed to list videos: %w", err)
	}

	return videos, int64(len(videos)), nil
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
	if err := s.queries.DeleteVideo(ctx, id); err != nil {
		return fmt.Errorf("failed to delete video: %w", err)
	}
	return nil
}
