package service_test

import (
	"context"
	"database/sql"
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

	t.Run("範囲を指定して統計を取得できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
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
		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: baseTime, Valid: true}, sql.NullTime{Time: baseTime.Add(24 * time.Hour), Valid: true}, 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 1)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Total)
		assert.Equal(t, "タスクA", stats.Items[0].Title)
		assert.Equal(t, int64(created.FinishedAt.Sub(created.StartedAt).Seconds()), stats.Items[0].Duration)
		assert.InDelta(t, 100.0, stats.Items[0].Percentage, 0.1)
	})

	t.Run("同じタスク名の時間を集計できる", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		taskTitle := "コーディング"
		baseTime := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)

		// 同じタイトルで3つのビデオを作成する
		// コーディング: 10分
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(10 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// コーディング: 20分
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.StartedAt = baseTime.Add(1 * time.Hour)
			vf.FinishedAt = baseTime.Add(1*time.Hour + 20*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// コーディング: 30分
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = taskTitle
			vf.StartedAt = baseTime.Add(2 * time.Hour)
			vf.FinishedAt = baseTime.Add(2*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: baseTime, Valid: true}, sql.NullTime{Time: baseTime.Add(24 * time.Hour), Valid: true}, 100)
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

		now := time.Now()
		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: now, Valid: true}, sql.NullTime{Time: now.Add(24 * time.Hour), Valid: true}, 100)
		require.NoError(t, err)

		assert.Len(t, stats.Items, 0)
		assert.Equal(t, int64(0), stats.Total)
	})

	t.Run("割合が正しく計算される", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
		defer cleanup()
		ctx := context.Background()

		baseTime := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)

		// 合計60分のビデオを作成する
		// タスクA: 30分 (50%)
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクA"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(30 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// タスクB: 30分 (50%)
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "タスクB"
			vf.StartedAt = baseTime.Add(1 * time.Hour)
			vf.FinishedAt = baseTime.Add(1*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: baseTime, Valid: true}, sql.NullTime{Time: baseTime.Add(24 * time.Hour), Valid: true}, 100)
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

	t.Run("期間外のデータは除外される", func(t *testing.T) {
		t.Parallel()
		svc, queries, cleanup := setupStatisticsService(t)
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
		createdToday, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "今日のタスク"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(20 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 今日の統計を取得する
		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: baseTime, Valid: true}, sql.NullTime{Time: baseTime.Add(24 * time.Hour), Valid: true}, 100)
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

		baseTime := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)

		// 10個のビデオを作成する
		for i := 0; i < 10; i++ {
			_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
				vf.Title = "タスク" + string(rune('A'+i))
				vf.StartedAt = baseTime.Add(time.Duration(i) * time.Hour)
				vf.FinishedAt = vf.StartedAt.Add(time.Duration(i+1) * 10 * time.Minute)
			}).Create(ctx, queries)
			require.NoError(t, err)
		}

		// limit=3で取得する
		stats, err := svc.GetStatistics(ctx, sql.NullTime{Time: baseTime, Valid: true}, sql.NullTime{Time: baseTime.Add(24 * time.Hour), Valid: true}, 3)
		require.NoError(t, err)

		// 3件のみ返される
		assert.Len(t, stats.Items, 3)
	})
}
