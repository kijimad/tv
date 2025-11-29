package service_test

import (
	"context"
	"database/sql"
	"os"
	"path/filepath"
	"strings"
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

func TestVideoService_CreateVideo(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		params := sqlc.CreateVideoParams{
			Title:     "New Video",
			Filename:  "new.webm",
			StartedAt: time.Date(2024, 1, 1, 10, 0, 0, 0, time.UTC),
		}
		video, err := svc.CreateVideo(ctx, params)
		require.NoError(t, err)

		// 内容を確認する
		assert.Equal(t, "New Video", video.Title)
		assert.Equal(t, "new.webm", video.Filename)
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

func TestVideoService_DeleteOldVideoFiles(t *testing.T) {
	t.Parallel()

	t.Run("30日以上経過した動画ファイルを削除できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// MockClockの現在時刻を取得する
		now := time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)

		// 31日前の動画を作成する
		oldVideo, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.StartedAt = now.AddDate(0, 0, -31)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 29日前の動画を作成する
		recentVideo, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.StartedAt = now.AddDate(0, 0, -29)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 古い動画を作成する
		pendingVideo, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.StartedAt = now.AddDate(0, 0, -31)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// ビデオディレクトリを作成する
		cfg := svc.GetConfig()
		err = os.MkdirAll(cfg.VideoDir, 0755)
		require.NoError(t, err)

		// 動画ファイルとサムネイルを作成する
		oldVideoPath := filepath.Join(cfg.VideoDir, oldVideo.Filename)
		oldThumbnailPath := filepath.Join(cfg.VideoDir, strings.TrimSuffix(oldVideo.Filename, ".webm")+".jpg")
		recentVideoPath := filepath.Join(cfg.VideoDir, recentVideo.Filename)
		recentThumbnailPath := filepath.Join(cfg.VideoDir, strings.TrimSuffix(recentVideo.Filename, ".webm")+".jpg")

		err = os.WriteFile(oldVideoPath, []byte("old video"), 0644)
		require.NoError(t, err)
		err = os.WriteFile(oldThumbnailPath, []byte("old thumbnail"), 0644)
		require.NoError(t, err)
		err = os.WriteFile(recentVideoPath, []byte("recent video"), 0644)
		require.NoError(t, err)
		err = os.WriteFile(recentThumbnailPath, []byte("recent thumbnail"), 0644)
		require.NoError(t, err)

		// ファイルが存在することを確認する
		_, err = os.Stat(oldVideoPath)
		assert.NoError(t, err)
		_, err = os.Stat(oldThumbnailPath)
		assert.NoError(t, err)
		_, err = os.Stat(recentVideoPath)
		assert.NoError(t, err)
		_, err = os.Stat(recentThumbnailPath)
		assert.NoError(t, err)

		// ファイル削除実行する
		count, err := svc.DeleteOldVideoFiles(ctx, 30)
		require.NoError(t, err)

		// 1件削除されたことを確認する
		assert.Equal(t, 1, count)

		// レコードは残っていることを確認する
		_, err = queries.GetVideo(ctx, oldVideo.ID)
		assert.NoError(t, err)
		_, err = queries.GetVideo(ctx, recentVideo.ID)
		assert.NoError(t, err)
		_, err = queries.GetVideo(ctx, pendingVideo.ID)
		assert.NoError(t, err)

		// 古い動画のファイルが削除されたことを確認する
		_, err = os.Stat(oldVideoPath)
		assert.True(t, os.IsNotExist(err), "old video file should be deleted")
		_, err = os.Stat(oldThumbnailPath)
		assert.True(t, os.IsNotExist(err), "old thumbnail file should be deleted")

		// 最近の動画のファイルは残っていることを確認する
		_, err = os.Stat(recentVideoPath)
		assert.NoError(t, err, "recent video file should exist")
		_, err = os.Stat(recentThumbnailPath)
		assert.NoError(t, err, "recent thumbnail file should exist")
	})

	t.Run("削除対象がない時は0を返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupVideoService(t)
		defer cleanup()
		ctx := context.Background()

		// MockClockの現在時刻を取得する
		now := time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)

		// 最近の動画を作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.StartedAt = now.AddDate(0, 0, -10)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// ファイル削除実行する
		count, err := svc.DeleteOldVideoFiles(ctx, 30)
		require.NoError(t, err)

		// 0件削除されたことを確認する
		assert.Equal(t, 0, count)
	})
}
