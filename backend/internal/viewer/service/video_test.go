package service_test

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	statusRecording  = "recording"
	statusPending    = "pending"
	statusProcessing = "processing"
	statusReady      = "ready"
	statusFailed     = "failed"
)

func setupVideoService(t *testing.T) (service.VideoService, *sqlc.Queries, func()) {
	t.Helper()
	testDB, cleanup := db.SetupTestDB(t)
	queries := sqlc.New(testDB)
	cfg := config.AppConfig{
		VideoDir: "/tmp/test_videos",
	}
	clk := &clock.MockClock{FixedTime: time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)}
	svc := service.NewVideoService(queries, cfg, clk)
	return svc, queries, cleanup
}

func TestVideoService_StopVideo(t *testing.T) {
	t.Parallel()

	t.Run("recording状態からpendingに遷移できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// StopVideoを実行する
		updated, err := svc.StopVideo(ctx, video.ID)
		require.NoError(t, err)

		// 状態がpendingに変わっていることを確認する
		assert.Equal(t, "pending", updated.ProcessingStatus)
		assert.True(t, updated.FinishedAt.Valid)
		assert.True(t, updated.FinishedAt.Time.Equal(time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)))
	})

	t.Run("recording以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// StopVideoを実行する
		_, err = svc.StopVideo(ctx, video.ID)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidStateTransition)
	})

	t.Run("存在しないIDの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// 存在しないIDでStopVideoを実行する
		_, err := svc.StopVideo(ctx, 99999)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoService_ProcessVideo(t *testing.T) {
	t.Parallel()

	t.Run("pending状態からprocessingに遷移できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// ProcessVideoを実行する
		updated, err := svc.ProcessVideo(ctx, video.ID)
		require.NoError(t, err)

		// 状態がprocessingに変わっていることを確認する
		assert.Equal(t, "processing", updated.ProcessingStatus)
	})

	t.Run("pending以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// ProcessVideoを実行する
		_, err = svc.ProcessVideo(ctx, video.ID)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidStateTransition)
	})
}

func TestVideoService_CompleteVideo(t *testing.T) {
	t.Parallel()

	t.Run("processing状態からreadyに遷移できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// processing状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusProcessing
		}).Create(ctx, queries)
		require.NoError(t, err)

		// CompleteVideoを実行する
		updated, err := svc.CompleteVideo(ctx, video.ID)
		require.NoError(t, err)

		// 状態がreadyに変わっていることを確認する
		assert.Equal(t, "ready", updated.ProcessingStatus)
	})

	t.Run("processing以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// CompleteVideoを実行する
		_, err = svc.CompleteVideo(ctx, video.ID)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidStateTransition)
	})
}

func TestVideoService_FailVideo(t *testing.T) {
	t.Parallel()

	t.Run("processing状態からfailedに遷移できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// processing状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusProcessing
		}).Create(ctx, queries)
		require.NoError(t, err)

		// FailVideoを実行する
		updated, err := svc.FailVideo(ctx, video.ID)
		require.NoError(t, err)

		// 状態がfailedに変わっていることを確認する
		assert.Equal(t, "failed", updated.ProcessingStatus)
	})

	t.Run("processing以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ready状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusReady
		}).Create(ctx, queries)
		require.NoError(t, err)

		// FailVideoを実行する
		_, err = svc.FailVideo(ctx, video.ID)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidStateTransition)
	})
}

func TestVideoService_RetryVideo(t *testing.T) {
	t.Parallel()

	t.Run("failed状態からpendingに遷移できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// failed状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusFailed
		}).Create(ctx, queries)
		require.NoError(t, err)

		// RetryVideoを実行する
		updated, err := svc.RetryVideo(ctx, video.ID)
		require.NoError(t, err)

		// 状態がpendingに変わっていることを確認する
		assert.Equal(t, "pending", updated.ProcessingStatus)
	})

	t.Run("failed以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ready状態のビデオを作成する
		video, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusReady
		}).Create(ctx, queries)
		require.NoError(t, err)

		// RetryVideoを実行する
		_, err = svc.RetryVideo(ctx, video.ID)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidStateTransition)
	})
}

func TestVideoService_ListVideos(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// 3件のビデオを作成する
		_, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)
		_, err = factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)
		_, err = factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 一覧を取得する
		videos, totalCount, err := svc.ListVideos(ctx, 10, 0)
		require.NoError(t, err)

		// 3件取得できることを確認する
		assert.Len(t, videos, 3)
		assert.Equal(t, int64(3), totalCount)
	})

	t.Run("ページネーションが機能する", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// 5件のビデオを作成する
		for i := 0; i < 5; i++ {
			_, err := factory.NewVideo().Create(ctx, queries)
			require.NoError(t, err)
		}

		// limit=2, offset=0で取得する
		videos, totalCount, err := svc.ListVideos(ctx, 2, 0)
		require.NoError(t, err)
		assert.Len(t, videos, 2)
		assert.Equal(t, int64(5), totalCount)

		// limit=2, offset=2で取得する
		videos, totalCount, err = svc.ListVideos(ctx, 2, 2)
		require.NoError(t, err)
		assert.Len(t, videos, 2)
		assert.Equal(t, int64(5), totalCount)

		// limit=2, offset=4で取得する
		videos, totalCount, err = svc.ListVideos(ctx, 2, 4)
		require.NoError(t, err)
		assert.Len(t, videos, 1)
		assert.Equal(t, int64(5), totalCount)
	})
}

func TestVideoService_GetVideo(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ詳細を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 詳細を取得する
		video, err := svc.GetVideo(ctx, created.ID)
		require.NoError(t, err)

		// 内容を確認する
		assert.Equal(t, "Test Video", video.Title)
		assert.Equal(t, created.ID, video.ID)
	})

	t.Run("存在しないIDの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// 存在しないIDで取得する
		_, err := svc.GetVideo(ctx, 99999)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoService_GetRecordingVideo(t *testing.T) {
	t.Parallel()

	t.Run("録画中のビデオを取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 録画中のビデオを取得する
		video, err := svc.GetRecordingVideo(ctx)
		require.NoError(t, err)
		require.NotNil(t, video)

		// 内容を確認する
		assert.Equal(t, created.ID, video.ID)
		assert.Equal(t, "recording", video.ProcessingStatus)
	})

	t.Run("録画中のビデオがない時はnilを返す", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// 録画中のビデオを取得する
		video, err := svc.GetRecordingVideo(ctx)
		require.NoError(t, err)

		// nilが返ることを確認する
		assert.Nil(t, video)
	})
}

func TestVideoService_CreateVideo(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		params := sqlc.CreateVideoParams{
			Title:            "New Video",
			Filename:         "new.webm",
			StartedAt:        time.Date(2024, 1, 1, 10, 0, 0, 0, time.UTC),
			ProcessingStatus: "recording",
		}
		video, err := svc.CreateVideo(ctx, params)
		require.NoError(t, err)

		// 内容を確認する
		assert.Equal(t, "New Video", video.Title)
		assert.Equal(t, "new.webm", video.Filename)
		assert.Equal(t, "recording", video.ProcessingStatus)
	})
}

func TestVideoService_UpdateVideo(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを更新できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 更新する
		params := sqlc.UpdateVideoParams{
			Title: sql.NullString{String: "Updated Title", Valid: true},
		}
		updated, err := svc.UpdateVideo(ctx, created.ID, params)
		require.NoError(t, err)

		// 内容を確認する
		assert.Equal(t, "Updated Title", updated.Title)
	})

	t.Run("startedAtがfinishedAtより後の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 無効な時刻範囲で更新する
		params := sqlc.UpdateVideoParams{
			StartedAt:  sql.NullTime{Time: time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC), Valid: true},
			FinishedAt: sql.NullTime{Time: time.Date(2024, 1, 1, 11, 0, 0, 0, time.UTC), Valid: true},
		}
		_, err = svc.UpdateVideo(ctx, created.ID, params)

		// エラーが返ることを確認する
		assert.ErrorIs(t, err, service.ErrInvalidTimeRange)
	})
}
