package handler_test

import (
	"context"
	"testing"
	"time"

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

	t.Run("範囲を指定して統計を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		// テストデータを作成する
		baseTime := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(1 * time.Hour)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 統計を取得する
		from := baseTime
		to := baseTime.Add(24 * time.Hour)
		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				StartedAtFrom: &from,
				StartedAtTo:   &to,
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

	t.Run("データが0件の時は空の統計を返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		now := time.Now()
		from := now
		to := now.Add(24 * time.Hour)
		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				StartedAtFrom: &from,
				StartedAtTo:   &to,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		assert.Len(t, statsResp.Items, 0)
		assert.Equal(t, int64(0), statsResp.Total)
	})

	t.Run("期間外のデータは除外される", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		baseTime := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
		yesterday := baseTime.AddDate(0, 0, -1)

		// 昨日のデータを作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "昨日のタスク"
			vf.StartedAt = yesterday
			vf.FinishedAt = yesterday.Add(30 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 今日のデータを作成する
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "今日のタスク"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(20 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 今日の統計を取得する
		from := baseTime
		to := baseTime.Add(24 * time.Hour)
		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				StartedAtFrom: &from,
				StartedAtTo:   &to,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.NoError(t, err)

		statsResp, ok := resp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)

		// 今日のデータだけが含まれる
		assert.Len(t, statsResp.Items, 1)
		assert.Equal(t, "今日のタスク", statsResp.Items[0].Title)
	})
}
