// Package service はビジネスロジックを提供する
// 基本的なバリデーションはOpenAPI validatorで行っているので、OpenAPIで表現できないルールを書く
package service

import (
	"context"
	"fmt"

	"github.com/kijimaD/tv/internal/viewer/db/gen"
)

// VideoService は動画ビジネスロジックのインターフェース
type VideoService interface {
	ListVideos(ctx context.Context, limit, offset int32) ([]gen.Video, int64, error)
	GetVideo(ctx context.Context, id int64) (*gen.Video, error)
	CreateVideo(ctx context.Context, params gen.CreateVideoParams) (*gen.Video, error)
	UpdateVideo(ctx context.Context, id int64, params gen.UpdateVideoParams) (*gen.Video, error)
	DeleteVideo(ctx context.Context, id int64) error
}

type videoService struct {
	queries *gen.Queries
}

// NewVideoService はVideoServiceを作成する
func NewVideoService(queries *gen.Queries) VideoService {
	return &videoService{queries: queries}
}

func (s *videoService) ListVideos(ctx context.Context, limit, offset int32) ([]gen.Video, int64, error) {
	videos, err := s.queries.ListVideos(ctx, gen.ListVideosParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, 0, fmt.Errorf("failed to list videos: %w", err)
	}

	return videos, int64(len(videos)), nil
}

func (s *videoService) GetVideo(ctx context.Context, id int64) (*gen.Video, error) {
	video, err := s.queries.GetVideo(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get video: %w", err)
	}
	return &video, nil
}

func (s *videoService) CreateVideo(ctx context.Context, params gen.CreateVideoParams) (*gen.Video, error) {
	// 時系列の整合性チェック
	if params.StartedAt.After(params.FinishedAt) {
		return nil, fmt.Errorf("started_at must be before finished_at")
	}

	video, err := s.queries.CreateVideo(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to create video: %w", err)
	}
	return &video, nil
}

func (s *videoService) UpdateVideo(ctx context.Context, id int64, params gen.UpdateVideoParams) (*gen.Video, error) {
	// 時系列の整合性チェック
	if params.StartedAt.After(params.FinishedAt) {
		return nil, fmt.Errorf("started_at must be before finished_at")
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
