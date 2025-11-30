package handler

import (
	"context"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/service"
)

// StatisticsHandler は統計ハンドラ
type StatisticsHandler struct {
	statisticsSvc service.StatisticsService
}

// NewStatisticsHandler はStatisticsHandlerを作成する
func NewStatisticsHandler(statisticsSvc service.StatisticsService) *StatisticsHandler {
	return &StatisticsHandler{
		statisticsSvc: statisticsSvc,
	}
}

// StatisticsAPIGet は統計を取得する
func (h *StatisticsHandler) StatisticsAPIGet(ctx context.Context, request oapi.StatisticsAPIGetRequestObject) (oapi.StatisticsAPIGetResponseObject, error) {
	period := service.Period(request.Params.Period)
	// TODO: 将来的にはクエリパラメータで基準日を受け取れるようにする
	baseDate := time.Now()

	// limitのデフォルト値は5
	limit := int32(5)
	if request.Params.Limit != nil {
		limit = *request.Params.Limit
	}

	stats, err := h.statisticsSvc.GetStatistics(ctx, period, baseDate, limit)
	if err != nil {
		statusCode, message := errorResponse(err)
		return oapi.StatisticsAPIGetdefaultJSONResponse{
			Body:       oapi.Error{Message: message},
			StatusCode: statusCode,
		}, nil
	}

	return oapi.StatisticsAPIGet200JSONResponse(toAPIPeriodStatistics(*stats)), nil
}

// toAPIPeriodStatistics はservice.PeriodStatisticsをoapi.PeriodStatisticsに変換する
func toAPIPeriodStatistics(ps service.PeriodStatistics) oapi.PeriodStatistics {
	items := make([]oapi.StatisticsItem, len(ps.Items))
	for i, item := range ps.Items {
		items[i] = oapi.StatisticsItem{
			Title:      item.Title,
			Duration:   item.Duration,
			Percentage: item.Percentage,
		}
	}

	return oapi.PeriodStatistics{
		Items: items,
		Total: ps.Total,
	}
}
