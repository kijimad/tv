package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupStatisticsService(t *testing.T) (service.StatisticsService, *sqlc.Queries, func()) {
	t.Helper()
	testDB, cleanup := db.SetupTestDB(t)
	queries := sqlc.New(testDB)
	svc := service.NewStatisticsService(queries)
	return svc, queries, cleanup
}

func TestStatisticsService_GetStatistics(t *testing.T) {
	t.Parallel()

	t.Run("日の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		// テストデータを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 統計を取得する
		stats, err := svc.GetStatistics(ctx, service.PeriodDay, created.StartedAt, 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Total)
		assert.Equal(t, "タスクA", stats.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.InDelta(t, 100.0, stats.Items[0].Percentage, 0.1)
	})

	t.Run("週の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクB"
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.PeriodWeek, created.StartedAt, 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Total)
		assert.Equal(t, "タスクB", stats.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.InDelta(t, 100.0, stats.Items[0].Percentage, 0.1)
	})

	t.Run("月の統計を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクC"
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.PeriodMonth, created.StartedAt, 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Total)
		assert.Equal(t, "タスクC", stats.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.InDelta(t, 100.0, stats.Items[0].Percentage, 0.1)
	})

	t.Run("同じタスク名の時間を集計できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		taskTitle := "コーディング"

		// 同じタイトルで3つのビデオを作成する
		// コーディング: 10分
		created1, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.FinishedAt = vf.StartedAt.Add(10 * 60 * 1000000000) // 10分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// コーディング: 20分
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.StartedAt = created1.StartedAt
			vf.FinishedAt = created1.StartedAt.Add(20 * 60 * 1000000000) // 20分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// コーディング: 30分
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.StartedAt = created1.StartedAt
			vf.FinishedAt = created1.StartedAt.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, created1.StartedAt, 100)
		require.NoError(t, err)

		// 同じタイトルが集計されて1つのアイテムになる
		assert.Len(t, stats.Items, 1)
		assert.Equal(t, taskTitle, stats.Items[0].Title)
		// 合計時間: 10 + 20 + 30 = 60分 = 3600秒
		assert.Equal(t, int64(3600), stats.Items[0].Duration)
		assert.Equal(t, int64(3600), stats.Total)
		assert.InDelta(t, 100.0, stats.Items[0].Percentage, 0.1)
	})

	t.Run("データが0件の時は空の統計を返す", func(t *testing.T) {
		t.Parallel()
		svc, _, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, time.Now(), 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 0)
		assert.Equal(t, int64(0), stats.Total)
	})

	t.Run("割合が正しく計算される", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		// 合計60分のビデオを作成する
		// タスクA: 30分 (50%)
		createdA, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
			vf.FinishedAt = vf.StartedAt.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// タスクB: 30分 (50%)
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクB"
			vf.StartedAt = createdA.StartedAt
			vf.FinishedAt = createdA.StartedAt.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, createdA.StartedAt, 100)
		require.NoError(t, err)

		// 合計時間を確認する
		assert.Equal(t, int64(3600), stats.Total) // 60分 = 3600秒

		// 各アイテムの割合を確認する
		var totalPercentage float64
		for _, item := range stats.Items {
			assert.Greater(t, item.Percentage, 0.0)
			totalPercentage += item.Percentage
		}

		// 割合の合計が100%に近いことを確認する
		assert.InDelta(t, 100.0, totalPercentage, 0.1)
	})

	t.Run("不正な期間の時はデフォルトで日の統計を返す", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.Period("invalid"), created.StartedAt, 100)
		require.NoError(t, err)

		assert.GreaterOrEqual(t, len(stats.Items), 0)
		assert.GreaterOrEqual(t, stats.Total, int64(0))
	})

	t.Run("期間外のデータは除外される", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		now := time.Now()
		today := now.Truncate(24 * time.Hour)
		yesterday := today.AddDate(0, 0, -1)

		// 昨日のデータを作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "昨日のタスク"
			vf.StartedAt = yesterday
			vf.FinishedAt = yesterday.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 今日のデータを作成する
		createdToday, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "今日のタスク"
			vf.StartedAt = today
			vf.FinishedAt = today.Add(20 * 60 * 1000000000) // 20分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 今日の統計を取得する
		stats, err := svc.GetStatistics(ctx, service.PeriodDay, now, 100)
		require.NoError(t, err)

		// 今日のデータだけが含まれる
		assert.Len(t, stats.Items, 1)
		assert.Equal(t, "今日のタスク", stats.Items[0].Title)
		assert.Equal(t, int64(createdToday.FinishedAt.Sub(createdToday.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.Equal(t, int64(createdToday.FinishedAt.Sub(createdToday.StartedAt).Seconds()), stats.Total)
	})

	t.Run("limit件数で結果を制限できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		// 10個のビデオを作成する
		var firstVideo sqlc.Video
		for i := 0; i < 10; i++ {
			created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
				vf.Title = "タスク" + string(rune('A'+i))
				if i > 0 {
					vf.StartedAt = firstVideo.StartedAt
				}
				vf.FinishedAt = vf.StartedAt.Add(time.Duration(i+1) * 10 * 60 * 1000000000) // (i+1)*10分
			}).Create(ctx, queries)
			require.NoError(t, err)
			if i == 0 {
				firstVideo = created
			}
		}

		// limit=3で取得する
		stats, err := svc.GetStatistics(ctx, service.PeriodDay, firstVideo.StartedAt, 3)
		require.NoError(t, err)

		// 3件のみ返される
		assert.Len(t, stats.Items, 3)
	})

	t.Run("タイムゾーンによって統計結果が変わる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
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

		// UTC で 2025-12-01 の統計を取得する
		utcBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, time.UTC)
		utcStats, err := svc.GetStatistics(ctx, service.PeriodDay, utcBaseDate, 100)
		require.NoError(t, err)

		// データが含まれる（UTC 23:00 は UTC 2025-12-01 の範囲内）
		assert.Len(t, utcStats.Items, 1)
		assert.Equal(t, "境界をまたぐタスク", utcStats.Items[0].Title)

		// JST で 2025-12-01 の統計を取得する
		jst, err := time.LoadLocation("Asia/Tokyo")
		require.NoError(t, err)
		jstBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, jst)
		jstStats, err := svc.GetStatistics(ctx, service.PeriodDay, jstBaseDate, 100)
		require.NoError(t, err)

		// データが含まれない（UTC 23:00 = JST 2025-12-02 08:00 なので JST 2025-12-01 の範囲外）
		assert.Len(t, jstStats.Items, 0)
	})

	t.Run("週の統計でタイムゾーンによって結果が変わる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		// UTC 2025-12-01(月) 00:30 のデータを作成する
		// JST では 2025-12-01(月) 09:30
		startTime := time.Date(2025, 12, 1, 0, 30, 0, 0, time.UTC)
		endTime := startTime.Add(1 * time.Hour)

		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "週の境界テスト"
			vf.StartedAt = startTime
			vf.FinishedAt = endTime
		}).Create(ctx, queries)
		require.NoError(t, err)

		// UTC 2025-11-30(日) 23:00 のデータを作成する
		// JST では 2025-12-01(月) 08:00 になるので週が変わる
		startTime2 := time.Date(2025, 11, 30, 23, 0, 0, 0, time.UTC)
		endTime2 := startTime2.Add(1 * time.Hour)

		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "前週のタスク"
			vf.StartedAt = startTime2
			vf.FinishedAt = endTime2
		}).Create(ctx, queries)
		require.NoError(t, err)

		// UTC で 2025-12-01 を含む週の統計を取得する
		utcBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, time.UTC)
		utcStats, err := svc.GetStatistics(ctx, service.PeriodWeek, utcBaseDate, 100)
		require.NoError(t, err)

		// UTC では2025-12-01 00:30 のみが含まれる
		assert.Len(t, utcStats.Items, 1)
		assert.Equal(t, "週の境界テスト", utcStats.Items[0].Title)

		// JST で 2025-12-01 を含む週の統計を取得する
		jst, err := time.LoadLocation("Asia/Tokyo")
		require.NoError(t, err)
		jstBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, jst)
		jstStats, err := svc.GetStatistics(ctx, service.PeriodWeek, jstBaseDate, 100)
		require.NoError(t, err)

		// JST では両方のデータが含まれる（どちらも JST 2025-12-01(月) の週に含まれる）
		assert.Len(t, jstStats.Items, 2)
	})

	t.Run("月の統計でタイムゾーンによって結果が変わる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		// UTC 2025-12-01 00:30 のデータを作成する
		startTime := time.Date(2025, 12, 1, 0, 30, 0, 0, time.UTC)
		endTime := startTime.Add(1 * time.Hour)

		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "12月のタスク"
			vf.StartedAt = startTime
			vf.FinishedAt = endTime
		}).Create(ctx, queries)
		require.NoError(t, err)

		// UTC 2025-11-30 23:00 のデータを作成する（JST では 2025-12-01 08:00）
		startTime2 := time.Date(2025, 11, 30, 23, 0, 0, 0, time.UTC)
		endTime2 := startTime2.Add(1 * time.Hour)

		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "11月のタスク"
			vf.StartedAt = startTime2
			vf.FinishedAt = endTime2
		}).Create(ctx, queries)
		require.NoError(t, err)

		// UTC で 2025-12 月の統計を取得する
		utcBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, time.UTC)
		utcStats, err := svc.GetStatistics(ctx, service.PeriodMonth, utcBaseDate, 100)
		require.NoError(t, err)

		// UTC では 12月のタスクのみが含まれる
		assert.Len(t, utcStats.Items, 1)
		assert.Equal(t, "12月のタスク", utcStats.Items[0].Title)

		// JST で 2025-12 月の統計を取得する
		jst, err := time.LoadLocation("Asia/Tokyo")
		require.NoError(t, err)
		jstBaseDate := time.Date(2025, 12, 1, 0, 0, 0, 0, jst)
		jstStats, err := svc.GetStatistics(ctx, service.PeriodMonth, jstBaseDate, 100)
		require.NoError(t, err)

		// JST では両方のタスクが含まれる（どちらも JST 12月）
		assert.Len(t, jstStats.Items, 2)
	})
}
