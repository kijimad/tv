package handler_test

import (
	"context"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/handler"
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

func setupVideoHandler(t *testing.T) (*handler.VideoHandler, *sqlc.Queries, func()) {
	t.Helper()
	testDB, cleanup := db.SetupTestDB(t)
	queries := sqlc.New(testDB)
	cfg := config.AppConfig{
		VideoDir: "/tmp/test_videos",
	}
	clk := &clock.MockClock{FixedTime: time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)}
	svc := service.NewVideoService(queries, cfg, clk)
	h := handler.NewVideoHandler(svc)
	return h, queries, cleanup
}

func TestVideoHandler_VideosList(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
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
		page := int32(1)
		size := int32(10)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page: &page,
				Size: &size,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 3)
		assert.Equal(t, int32(3), listResp.Pager.TotalCount)
		assert.Equal(t, int32(1), listResp.Pager.Page)
		assert.Equal(t, int32(10), listResp.Pager.Size)
	})

	t.Run("ページネーションパラメータを指定できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 5件のビデオを作成する
		for i := 0; i < 5; i++ {
			_, err := factory.NewVideo().Create(ctx, queries)
			require.NoError(t, err)
		}

		// page=2, size=2で取得する
		page := int32(2)
		size := int32(2)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page: &page,
				Size: &size,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 2)
		assert.Equal(t, int32(5), listResp.Pager.TotalCount)
	})
}

func TestVideoHandler_VideosGet(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ詳細を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 詳細を取得する
		req := oapi.VideosGetRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosGet(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		getResp, ok := resp.(oapi.VideosGet200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "Test Video", getResp.Title)
		assert.Equal(t, created.ID, *getResp.Id)
	})
}

func TestVideoHandler_VideosCreate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		req := oapi.VideosCreateRequestObject{
			Body: &oapi.VideoCreate{
				Title:    "New Video",
				Filename: "new.webm",
			},
		}
		resp, err := h.VideosCreate(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		createResp, ok := resp.(oapi.VideosCreate201JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "New Video", createResp.Title)
		assert.Equal(t, "new.webm", createResp.Filename)
		assert.Equal(t, oapi.VideoProcessingStatus("recording"), createResp.ProcessingStatus)
	})
}

func TestVideoHandler_VideosUpdate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを更新できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 更新する
		newTitle := "Updated Title"
		req := oapi.VideosUpdateRequestObject{
			Id: created.ID,
			Body: &oapi.VideoUpdate{
				Title: &newTitle,
			},
		}
		resp, err := h.VideosUpdate(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		updateResp, ok := resp.(oapi.VideosUpdate200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "Updated Title", updateResp.Title)
	})
}

func TestVideoHandler_VideosDelete(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを削除できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 削除する
		req := oapi.VideosDeleteRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosDelete(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		_, ok := resp.(oapi.VideosDelete204Response)
		require.True(t, ok)

		// 削除されたことを確認する
		_, err = queries.GetVideo(ctx, created.ID)
		assert.Error(t, err)
	})
}

func TestVideoHandler_VideosStop(t *testing.T) {
	t.Parallel()

	t.Run("recording状態を停止できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 停止する
		req := oapi.VideosStopRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosStop(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		stopResp, ok := resp.(oapi.VideosStop200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, oapi.VideoProcessingStatus("pending"), stopResp.ProcessingStatus)
		assert.True(t, stopResp.FinishedAt != nil)
	})

	t.Run("recording以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 停止する
		req := oapi.VideosStopRequestObject{
			Id: created.ID,
		}
		_, err = h.VideosStop(ctx, req)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoHandler_VideosProcess(t *testing.T) {
	t.Parallel()

	t.Run("pending状態を変換開始できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 変換開始する
		req := oapi.VideosProcessRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosProcess(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		processResp, ok := resp.(oapi.VideosProcess200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, oapi.VideoProcessingStatus("processing"), processResp.ProcessingStatus)
	})

	t.Run("pending以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 変換開始する
		req := oapi.VideosProcessRequestObject{
			Id: created.ID,
		}
		_, err = h.VideosProcess(ctx, req)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoHandler_VideosComplete(t *testing.T) {
	t.Parallel()

	t.Run("processing状態を完了できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// processing状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusProcessing
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 完了する
		req := oapi.VideosCompleteRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosComplete(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		completeResp, ok := resp.(oapi.VideosComplete200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, oapi.VideoProcessingStatus("ready"), completeResp.ProcessingStatus)
	})

	t.Run("processing以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// pending状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusPending
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 完了する
		req := oapi.VideosCompleteRequestObject{
			Id: created.ID,
		}
		_, err = h.VideosComplete(ctx, req)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoHandler_VideosFail(t *testing.T) {
	t.Parallel()

	t.Run("processing状態を失敗にできる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// processing状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusProcessing
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 失敗にする
		req := oapi.VideosFailRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosFail(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		failResp, ok := resp.(oapi.VideosFail200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, oapi.VideoProcessingStatus("failed"), failResp.ProcessingStatus)
	})

	t.Run("processing以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ready状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusReady
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 失敗にする
		req := oapi.VideosFailRequestObject{
			Id: created.ID,
		}
		_, err = h.VideosFail(ctx, req)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoHandler_VideosRetry(t *testing.T) {
	t.Parallel()

	t.Run("failed状態を再試行できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// failed状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusFailed
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 再試行する
		req := oapi.VideosRetryRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosRetry(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		retryResp, ok := resp.(oapi.VideosRetry200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, oapi.VideoProcessingStatus("pending"), retryResp.ProcessingStatus)
	})

	t.Run("failed以外の状態の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ready状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusReady
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 再試行する
		req := oapi.VideosRetryRequestObject{
			Id: created.ID,
		}
		_, err = h.VideosRetry(ctx, req)

		// エラーが返ることを確認する
		assert.Error(t, err)
	})
}

func TestVideoHandler_StatusGet(t *testing.T) {
	t.Parallel()

	t.Run("録画中の時は録画状態を返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// recording状態のビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.ProcessingStatus = statusRecording
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 録画状態を取得する
		req := oapi.StatusGetRequestObject{}
		resp, err := h.StatusGet(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		statusResp, ok := resp.(oapi.StatusGet200JSONResponse)
		require.True(t, ok)
		assert.True(t, statusResp.Recording)
		require.NotNil(t, statusResp.CurrentVideo)
		assert.Equal(t, created.ID, *statusResp.CurrentVideo.Id)
	})

	t.Run("録画中でない時はfalseを返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 録画状態を取得する
		req := oapi.StatusGetRequestObject{}
		resp, err := h.StatusGet(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		statusResp, ok := resp.(oapi.StatusGet200JSONResponse)
		require.True(t, ok)
		assert.False(t, statusResp.Recording)
		assert.Nil(t, statusResp.CurrentVideo)
	})
}
