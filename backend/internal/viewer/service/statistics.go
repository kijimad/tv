package service

import (
	"context"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// Period は統計期間の型
type Period string

// 統計期間の定数
const (
	PeriodDay   Period = "day"
	PeriodWeek  Period = "week"
	PeriodMonth Period = "month"
)

// StatisticsService は統計ビジネスロジックのインターフェース
type StatisticsService interface {
	GetStatistics(ctx context.Context, period Period, baseDate time.Time) (*PeriodStatistics, error)
}

// StatisticsQuerier は統計操作に必要なクエリメソッドのインターフェース
type StatisticsQuerier interface {
	GetPeriodStatistics(ctx context.Context, arg sqlc.GetPeriodStatisticsParams) ([]sqlc.GetPeriodStatisticsRow, error)
}

type statisticsService struct {
	q StatisticsQuerier
}

// NewStatisticsService はStatisticsServiceを作成する
func NewStatisticsService(q StatisticsQuerier) StatisticsService {
	return &statisticsService{
		q: q,
	}
}

// PeriodStatistics は期間統計
type PeriodStatistics struct {
	Items []StatisticsItem
	Total int64
}

// StatisticsItem は統計アイテム
type StatisticsItem struct {
	Title      string
	Duration   int64
	Percentage float64
}

// GetStatistics は統計を取得する
func (s *statisticsService) GetStatistics(ctx context.Context, period Period, baseDate time.Time) (*PeriodStatistics, error) {
	periodStart, periodEnd := calculatePeriodRange(period, baseDate)
	rows, err := s.q.GetPeriodStatistics(ctx, sqlc.GetPeriodStatisticsParams{
		PeriodStart: periodStart,
		PeriodEnd:   periodEnd,
	})
	if err != nil {
		return nil, err
	}

	result := toPeriodStatistics(rows)
	return &result, nil
}

// calculatePeriodRange は期間と基準日に基づいて開始時刻と終了時刻を計算する
func calculatePeriodRange(period Period, baseDate time.Time) (time.Time, time.Time) {
	switch period {
	case PeriodDay:
		// 基準日の00:00から翌日の00:00まで
		start := baseDate.Truncate(24 * time.Hour)
		end := start.AddDate(0, 0, 1)
		return start, end
	case PeriodWeek:
		// 基準日を含む週の月曜日00:00から翌週の月曜日00:00まで
		weekday := int(baseDate.Weekday())
		if weekday == 0 {
			weekday = 7 // 日曜日を7として扱う
		}
		start := baseDate.AddDate(0, 0, -weekday+1).Truncate(24 * time.Hour)
		end := start.AddDate(0, 0, 7)
		return start, end
	case PeriodMonth:
		// 基準日を含む月の1日00:00から翌月の1日00:00まで
		start := time.Date(baseDate.Year(), baseDate.Month(), 1, 0, 0, 0, 0, baseDate.Location())
		end := start.AddDate(0, 1, 0)
		return start, end
	default:
		// デフォルトは日
		start := baseDate.Truncate(24 * time.Hour)
		end := start.AddDate(0, 0, 1)
		return start, end
	}
}

// toPeriodStatistics は統計行を期間統計に変換する
func toPeriodStatistics(rows []sqlc.GetPeriodStatisticsRow) PeriodStatistics {
	if len(rows) == 0 {
		return PeriodStatistics{
			Items: []StatisticsItem{},
			Total: 0,
		}
	}

	var total int64
	items := make([]StatisticsItem, len(rows))

	// 合計時間を計算する
	for _, row := range rows {
		total += row.Duration
	}

	// 各アイテムの割合を計算する
	for i, row := range rows {
		percentage := 0.0
		if total > 0 {
			percentage = float64(row.Duration) / float64(total) * 100
		}

		items[i] = StatisticsItem{
			Title:      row.Title,
			Duration:   row.Duration,
			Percentage: percentage,
		}
	}

	return PeriodStatistics{
		Items: items,
		Total: total,
	}
}
