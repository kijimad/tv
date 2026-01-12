package service

import (
	"context"
	"database/sql"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// StatisticsService は統計ビジネスロジックのインターフェース
type StatisticsService interface {
	GetStatistics(ctx context.Context, startedAtFrom, startedAtTo sql.NullTime, limit int32) (*PeriodStatistics, error)
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
func (s *statisticsService) GetStatistics(ctx context.Context, startedAtFrom, startedAtTo sql.NullTime, limit int32) (*PeriodStatistics, error) {
	rows, err := s.q.GetPeriodStatistics(ctx, sqlc.GetPeriodStatisticsParams{
		PeriodStart: startedAtFrom,
		PeriodEnd:   startedAtTo,
		LimitCount:  limit,
	})
	if err != nil {
		return nil, err
	}

	result := toPeriodStatistics(rows)
	return &result, nil
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
