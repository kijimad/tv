// Package service はビジネスロジックを提供する
// 基本的なバリデーションはOpenAPI validatorで行っているので、OpenAPIで表現できないルールを書く
package service

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

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
	// ファイル削除メソッド
	DeleteVideoFile(ctx context.Context, id int64) error
	DeleteOldVideoFiles(ctx context.Context, olderThanDays int) (int, error)
}

// VideoQuerier はビデオ操作に必要なクエリメソッドのインターフェース
type VideoQuerier interface {
	CreateVideo(ctx context.Context, params sqlc.CreateVideoParams) (sqlc.Video, error)
	GetVideo(ctx context.Context, id int64) (sqlc.Video, error)
	ListVideos(ctx context.Context, params sqlc.ListVideosParams) ([]sqlc.Video, error)
	ListVideosOlderThan(ctx context.Context, startedAt time.Time) ([]sqlc.Video, error)
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

	// ファイルが存在する場合は削除する
	if video.Filename.Valid && video.Filename.String != "" {
		// 動画ファイルを削除する
		videoFilePath := filepath.Join(s.GetConfig().VideoDir, video.Filename.String)
		if err := os.Remove(videoFilePath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("failed to delete video file: %w", err)
		}

		// サムネイルファイルを削除する
		thumbnailFilename := strings.TrimSuffix(video.Filename.String, ".webm") + ".jpg"
		thumbnailPath := filepath.Join(s.GetConfig().VideoDir, thumbnailFilename)
		if err := os.Remove(thumbnailPath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("failed to delete thumbnail file: %w", err)
		}
	}

	return nil
}

// DeleteVideoFile は動画ファイルとサムネイルを削除する（レコードは残す）
func (s *videoService) DeleteVideoFile(ctx context.Context, id int64) error {
	video, err := s.queries.GetVideo(ctx, id)
	if err != nil {
		return fmt.Errorf("failed to get video: %w", err)
	}

	// ファイル名が有効な場合のみファイルを削除する
	if video.Filename.Valid && video.Filename.String != "" {
		// ファイルパスを構築する
		filePath := filepath.Join(s.GetConfig().VideoDir, video.Filename.String)
		thumbnailFilename := strings.TrimSuffix(video.Filename.String, ".webm") + ".jpg"
		thumbnailPath := filepath.Join(s.GetConfig().VideoDir, thumbnailFilename)

		// 動画ファイルを削除する
		if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("failed to remove video file: %w", err)
		}

		// サムネイルを削除する
		if err := os.Remove(thumbnailPath); err != nil && !os.IsNotExist(err) {
			// サムネイルがなくてもログだけ出してエラーにしない
			log.Printf("failed to remove thumbnail: %v", err)
		}

		// FilenameをNULLに更新する
		_, err = s.queries.UpdateVideo(ctx, sqlc.UpdateVideoParams{
			ID:       id,
			Filename: sql.NullString{Valid: false},
		})
		if err != nil {
			return fmt.Errorf("failed to update video filename: %w", err)
		}
	}

	return nil
}

// DeleteOldVideoFiles は指定日数以上経過した動画ファイルを削除する
func (s *videoService) DeleteOldVideoFiles(ctx context.Context, olderThanDays int) (int, error) {
	threshold := s.GetClock().Now().AddDate(0, 0, -olderThanDays)

	videos, err := s.queries.ListVideosOlderThan(ctx, threshold)
	if err != nil {
		return 0, fmt.Errorf("failed to list old videos: %w", err)
	}

	deleted := 0
	for _, video := range videos {
		// ファイル名が空の場合はスキップする
		if !video.Filename.Valid || video.Filename.String == "" {
			continue
		}

		if err := s.DeleteVideoFile(ctx, video.ID); err != nil {
			log.Printf("failed to delete video file %d: %v", video.ID, err)
			continue
		}
		deleted++
	}

	return deleted, nil
}
