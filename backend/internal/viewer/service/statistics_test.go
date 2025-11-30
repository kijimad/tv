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
		stats, err := svc.GetStatistics(ctx, service.PeriodDay, created.StartedAt)
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

		stats, err := svc.GetStatistics(ctx, service.PeriodWeek, created.StartedAt)
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

		stats, err := svc.GetStatistics(ctx, service.PeriodMonth, created.StartedAt)
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

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, created1.StartedAt)
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

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, time.Now())
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
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
			vf.FinishedAt = vf.StartedAt.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		// タスクB: 30分 (50%)
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクB"
			vf.FinishedAt = vf.StartedAt.Add(30 * 60 * 1000000000) // 30分
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, service.PeriodDay, time.Now())
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

		stats, err := svc.GetStatistics(ctx, service.Period("invalid"), created.StartedAt)
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
		stats, err := svc.GetStatistics(ctx, service.PeriodDay, now)
		require.NoError(t, err)

		// 今日のデータだけが含まれる
		assert.Len(t, stats.Items, 1)
		assert.Equal(t, "今日のタスク", stats.Items[0].Title)
		assert.Equal(t, int64(createdToday.FinishedAt.Sub(createdToday.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.Equal(t, int64(createdToday.FinishedAt.Sub(createdToday.StartedAt).Seconds()), stats.Total)
	})
}
