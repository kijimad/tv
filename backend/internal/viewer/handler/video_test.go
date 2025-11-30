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
		startedAt := time.Now().UTC()
		finishedAt := startedAt.Add(25 * time.Minute)
		req := oapi.VideosCreateRequestObject{
			Body: &oapi.VideoCreate{
				Title:      "New Video",
				Filename:   "new.webm",
				StartedAt:  startedAt,
				FinishedAt: finishedAt,
			},
		}
		resp, err := h.VideosCreate(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		createResp, ok := resp.(oapi.VideosCreate201JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "New Video", createResp.Title)
		assert.Equal(t, "new.webm", createResp.Filename)
		assert.WithinDuration(t, startedAt, createResp.StartedAt, time.Second)
		assert.WithinDuration(t, finishedAt, *createResp.FinishedAt, time.Second)
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
