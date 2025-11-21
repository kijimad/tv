package service

import (
	"context"
	"database/sql"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockQueries はsqlc.Queriesのモック
type mockVideoQueries struct {
	createVideoFunc func(ctx context.Context, params sqlc.CreateVideoParams) (sqlc.Video, error)
	getVideoFunc    func(ctx context.Context, id int64) (sqlc.Video, error)
	listVideosFunc  func(ctx context.Context, params sqlc.ListVideosParams) ([]sqlc.Video, error)
	countVideosFunc func(ctx context.Context) (int64, error)
	updateVideoFunc func(ctx context.Context, params sqlc.UpdateVideoParams) (sqlc.Video, error)
	deleteVideoFunc func(ctx context.Context, id int64) error
}

func (m *mockVideoQueries) CreateVideo(ctx context.Context, params sqlc.CreateVideoParams) (sqlc.Video, error) {
	if m.createVideoFunc != nil {
		return m.createVideoFunc(ctx, params)
	}
	return sqlc.Video{}, nil
}

func (m *mockVideoQueries) GetVideo(ctx context.Context, id int64) (sqlc.Video, error) {
	if m.getVideoFunc != nil {
		return m.getVideoFunc(ctx, id)
	}
	return sqlc.Video{}, nil
}

func (m *mockVideoQueries) ListVideos(ctx context.Context, params sqlc.ListVideosParams) ([]sqlc.Video, error) {
	if m.listVideosFunc != nil {
		return m.listVideosFunc(ctx, params)
	}
	return []sqlc.Video{}, nil
}

func (m *mockVideoQueries) CountVideos(ctx context.Context) (int64, error) {
	if m.countVideosFunc != nil {
		return m.countVideosFunc(ctx)
	}
	return 0, nil
}

func (m *mockVideoQueries) UpdateVideo(ctx context.Context, params sqlc.UpdateVideoParams) (sqlc.Video, error) {
	if m.updateVideoFunc != nil {
		return m.updateVideoFunc(ctx, params)
	}
	return sqlc.Video{}, nil
}

func (m *mockVideoQueries) DeleteVideo(ctx context.Context, id int64) error {
	if m.deleteVideoFunc != nil {
		return m.deleteVideoFunc(ctx, id)
	}
	return nil
}

// sqlc.Queriesインターフェースを満たすために他のメソッドも実装する必要がある
func (m *mockVideoQueries) CreateSession(_ context.Context, _ sqlc.CreateSessionParams) (sqlc.Session, error) {
	return sqlc.Session{}, nil
}

func (m *mockVideoQueries) UpdateSessionStatus(_ context.Context, _ sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
	return sqlc.Session{}, nil
}

func (m *mockVideoQueries) GetCurrentRecordingSession(_ context.Context) (sqlc.Session, error) {
	return sqlc.Session{}, nil
}

func (m *mockVideoQueries) CreateVideoFromSession(_ context.Context, _ int64) (sqlc.Video, error) {
	return sqlc.Video{}, nil
}

func (m *mockVideoQueries) CreateVideoSession(_ context.Context, _ sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error) {
	return sqlc.VideoSession{}, nil
}

func TestVideoService_CreateVideo(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()
		finishedAt := now.Add(time.Hour)

		mock := &mockVideoQueries{
			createVideoFunc: func(_ context.Context, params sqlc.CreateVideoParams) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         1,
					Title:      params.Title,
					Filename:   params.Filename,
					StartedAt:  params.StartedAt,
					FinishedAt: params.FinishedAt,
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{})
		video, err := svc.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "テストビデオ",
			Filename:   "test.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		})

		require.NoError(t, err)
		assert.Equal(t, int64(1), video.ID)
		assert.Equal(t, "テストビデオ", video.Title)
		assert.Equal(t, "test.mp4", video.Filename)
	})

	t.Run("started_atがfinished_atより後の場合エラーを返す", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockVideoQueries{}
		svc := NewVideoService(mock, config.AppConfig{})

		_, err := svc.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "不正なビデオ",
			Filename:   "invalid.mp4",
			StartedAt:  now,
			FinishedAt: now.Add(-time.Hour),
		})

		require.Error(t, err)
		assert.Contains(t, err.Error(), "started_at must be before finished_at")
	})
}

func TestVideoService_UpdateVideo(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("ビデオを更新できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockVideoQueries{
			updateVideoFunc: func(_ context.Context, params sqlc.UpdateVideoParams) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         params.ID,
					Title:      params.Title.String,
					Filename:   "test.mp4",
					StartedAt:  now,
					FinishedAt: now.Add(time.Hour),
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{})
		newTitle := "更新されたタイトル"
		video, err := svc.UpdateVideo(ctx, 1, sqlc.UpdateVideoParams{
			ID:    1,
			Title: sql.NullString{String: newTitle, Valid: true},
		})

		require.NoError(t, err)
		assert.Equal(t, int64(1), video.ID)
		assert.Equal(t, newTitle, video.Title)
	})

	t.Run("started_atがfinished_atより後の場合エラーを返す", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockVideoQueries{}
		svc := NewVideoService(mock, config.AppConfig{})

		_, err := svc.UpdateVideo(ctx, 1, sqlc.UpdateVideoParams{
			ID:         1,
			StartedAt:  sql.NullTime{Time: now, Valid: true},
			FinishedAt: sql.NullTime{Time: now.Add(-time.Hour), Valid: true},
		})

		require.Error(t, err)
		assert.Contains(t, err.Error(), "started_at must be before finished_at")
	})
}

func TestVideoService_GetVideo(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("ビデオを取得できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()
		expectedVideo := sqlc.Video{
			ID:         1,
			Title:      "テストビデオ",
			Filename:   "test.mp4",
			StartedAt:  now,
			FinishedAt: now.Add(time.Hour),
			CreatedAt:  now,
			UpdatedAt:  now,
		}

		mock := &mockVideoQueries{
			getVideoFunc: func(_ context.Context, _ int64) (sqlc.Video, error) {
				return expectedVideo, nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{})
		video, err := svc.GetVideo(ctx, 1)

		require.NoError(t, err)
		assert.Equal(t, expectedVideo.ID, video.ID)
		assert.Equal(t, expectedVideo.Title, video.Title)
	})
}

func TestVideoService_ListVideos(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()
		expectedVideos := []sqlc.Video{
			{
				ID:         1,
				Title:      "ビデオ1",
				Filename:   "test1.mp4",
				StartedAt:  now,
				FinishedAt: now.Add(time.Hour),
				CreatedAt:  now,
				UpdatedAt:  now,
			},
			{
				ID:         2,
				Title:      "ビデオ2",
				Filename:   "test2.mp4",
				StartedAt:  now,
				FinishedAt: now.Add(time.Hour),
				CreatedAt:  now,
				UpdatedAt:  now,
			},
		}

		mock := &mockVideoQueries{
			listVideosFunc: func(_ context.Context, _ sqlc.ListVideosParams) ([]sqlc.Video, error) {
				return expectedVideos, nil
			},
			countVideosFunc: func(_ context.Context) (int64, error) {
				return 5, nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{})
		videos, total, err := svc.ListVideos(ctx, 10, 0)

		require.NoError(t, err)
		assert.Len(t, videos, 2)
		assert.Equal(t, int64(5), total)
		assert.Equal(t, "ビデオ1", videos[0].Title)
		assert.Equal(t, "ビデオ2", videos[1].Title)
	})
}

func TestVideoService_DeleteVideo(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("ビデオとファイルを削除できる", func(t *testing.T) {
		t.Parallel()

		// テスト用の一時ディレクトリを作成する
		tempDir := t.TempDir()

		// テスト用の動画ファイルとサムネイルを作成する
		videoFilename := "test_video.webm"
		videoPath := filepath.Join(tempDir, videoFilename)
		thumbnailPath := filepath.Join(tempDir, "test_video.jpg")

		err := os.WriteFile(videoPath, []byte("test video content"), 0644)
		require.NoError(t, err)
		err = os.WriteFile(thumbnailPath, []byte("test thumbnail content"), 0644)
		require.NoError(t, err)

		now := time.Now()
		mock := &mockVideoQueries{
			getVideoFunc: func(_ context.Context, id int64) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         id,
					Title:      "テストビデオ",
					Filename:   videoFilename,
					StartedAt:  now,
					FinishedAt: now.Add(time.Hour),
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			deleteVideoFunc: func(_ context.Context, _ int64) error {
				return nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{VideoDir: tempDir})
		err = svc.DeleteVideo(ctx, 1)

		require.NoError(t, err)

		// ファイルが削除されたことを確認する
		_, err = os.Stat(videoPath)
		assert.True(t, os.IsNotExist(err), "動画ファイルが削除されていない")

		_, err = os.Stat(thumbnailPath)
		assert.True(t, os.IsNotExist(err), "サムネイルファイルが削除されていない")
	})

	t.Run("ファイルが存在しない場合でも削除できる", func(t *testing.T) {
		t.Parallel()

		// テスト用の一時ディレクトリを作成する
		tempDir := t.TempDir()

		now := time.Now()
		mock := &mockVideoQueries{
			getVideoFunc: func(_ context.Context, id int64) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         id,
					Title:      "テストビデオ",
					Filename:   "nonexistent.webm",
					StartedAt:  now,
					FinishedAt: now.Add(time.Hour),
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			deleteVideoFunc: func(_ context.Context, _ int64) error {
				return nil
			},
		}

		svc := NewVideoService(mock, config.AppConfig{VideoDir: tempDir})
		err := svc.DeleteVideo(ctx, 1)

		// ファイルが存在しなくてもエラーにならない
		require.NoError(t, err)
	})
}
