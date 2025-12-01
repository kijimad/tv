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

	t.Run("timezoneパラメータが指定されなかった時はUTCで処理する", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		// テストデータを作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクD"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// timezoneを指定せずに統計を取得する
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
		assert.Equal(t, "タスクD", statsResp.Items[0].Title)
	})

	t.Run("タイムゾーンによって統計結果が変わる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		// UTC 2025-12-01 23:00:00 のデータを作成する
		// これは JST では 2025-12-02 08:00:00 になる
		startTime := time.Date(2025, 12, 1, 23, 0, 0, 0, time.UTC)
		endTime := startTime.Add(1 * time.Hour)

		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "境界をまたぐタスク"
			vf.StartedAt = startTime
			vf.FinishedAt = endTime
		}).Create(ctx, queries)
		require.NoError(t, err)

		// baseDate を作成（2025-12-01）
		baseDate := "2025-12-01"

		// UTCで2025-12-01の統計を取得 → データが含まれる
		// UTC 2025-12-01 00:00-24:00の範囲で、データはUTC 23:00なので含まれる
		utcTimezone := "UTC"
		utcReq := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period:   oapi.Day,
				BaseDate: &baseDate,
				Timezone: &utcTimezone,
			},
		}
		utcResp, err := h.StatisticsAPIGet(ctx, utcReq)
		require.NoError(t, err)

		utcStatsResp, ok := utcResp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)
		assert.Len(t, utcStatsResp.Items, 1, "UTCの2025-12-01にはデータが含まれるはず（UTC 23:00）")
		assert.Equal(t, "境界をまたぐタスク", utcStatsResp.Items[0].Title)

		// Asia/Tokyoで2025-12-01の統計を取得 → データが含まれない
		// JST 2025-12-01 00:00-24:00 = UTC 2025-11-30 15:00 - 2025-12-01 15:00
		// データは UTC 23:00 = JST 2025-12-02 08:00 なので範囲外
		jstTimezone := "Asia/Tokyo"
		jstReq := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period:   oapi.Day,
				BaseDate: &baseDate,
				Timezone: &jstTimezone,
			},
		}
		jstResp, err := h.StatisticsAPIGet(ctx, jstReq)
		require.NoError(t, err)

		jstStatsResp, ok := jstResp.(oapi.StatisticsAPIGet200JSONResponse)
		require.True(t, ok)
		assert.Len(t, jstStatsResp.Items, 0, "JSTの2025-12-01にはデータが含まれないはず（UTC 23:00 = JST 2025-12-02 08:00）")
	})

	t.Run("無効なタイムゾーンの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupStatisticsHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 無効なタイムゾーンを指定する
		invalidTimezone := "Invalid/Timezone"
		req := oapi.StatisticsAPIGetRequestObject{
			Params: oapi.StatisticsAPIGetParams{
				Period:   oapi.Day,
				Timezone: &invalidTimezone,
			},
		}
		resp, err := h.StatisticsAPIGet(ctx, req)
		require.Error(t, err)

		// エラーレスポンスを確認する
		errResp, ok := resp.(oapi.StatisticsAPIGetdefaultJSONResponse)
		require.True(t, ok)
		assert.Equal(t, 400, errResp.StatusCode)
		assert.Contains(t, errResp.Body.Message, "Invalid timezone")
	})
}
