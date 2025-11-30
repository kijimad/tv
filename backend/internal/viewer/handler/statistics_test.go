package handler_test

import (
	"context"
	"testing"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/handler"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupStatisticsHandler(t *testing.T) (*handler.StatisticsHandler, *sqlc.Queries, func()) {
	t.Helper()
	testDB, cleanup := db.SetupTestDB(t)
	queries := sqlc.New(testDB)
	svc := service.NewStatisticsService(queries)
	h := handler.NewStatisticsHandler(svc)
	return h, queries, cleanup
}

func TestStatisticsHandler_StatisticsAPIGet(t *testing.T) {
	t.Parallel()

	t.Run("日の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		// テストデータを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 統計を取得する
		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period: oapi.Day,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		assert.Len(t, statsResp.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Total)
		assert.Equal(t, "タスクA", statsResp.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Items[0].Duration)
		assert.InDelta(t, 100.0, statsResp.Items[0].Percentage, 0.1)
	})

	t.Run("週の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクB"
		}).Create(ctx, queries)
		require.NoError(t, err)

		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period: oapi.Week,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		assert.Len(t, statsResp.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Total)
		assert.Equal(t, "タスクB", statsResp.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Items[0].Duration)
		assert.InDelta(t, 100.0, statsResp.Items[0].Percentage, 0.1)
	})

	t.Run("月の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクC"
		}).Create(ctx, queries)
		require.NoError(t, err)

		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period: oapi.Month,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		assert.Len(t, statsResp.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Total)
		assert.Equal(t, "タスクC", statsResp.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), statsResp.Items[0].Duration)
		assert.InDelta(t, 100.0, statsResp.Items[0].Percentage, 0.1)
	})

	t.Run("データが0件の時は空の統計を返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period: oapi.Day,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		assert.Len(t, statsResp.Items, 0)
		assert.Equal(t, int64(0), statsResp.Total)
	})
}
