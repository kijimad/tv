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

	timezone := "UTC"
	if request.Params.Timezone != nil {
		timezone = *request.Params.Timezone
	}

	// タイムゾーンをロードする
	loc, err := time.LoadLocation(timezone)
	if err != nil {
		return oapi.StatisticsAPIGetdefaultJSONResponse{
			Body:       oapi.Error{Message: "Invalid timezone: " + timezone + ": " + err.Error()},
			StatusCode: 400,
		}, err
	}

	// baseDateのデフォルト値は現在日付（指定されたタイムゾーン）の00:00:00
	now := time.Now().In(loc)
	year, month, day := now.Date()
	baseDate := time.Date(year, month, day, 0, 0, 0, 0, loc)

	if request.Params.BaseDate != nil {
		// date形式（YYYY-MM-DD）をパースして、指定されたタイムゾーンの00:00:00として解釈する
		parsedDate, err := time.Parse("2006-01-02", *request.Params.BaseDate)
		if err != nil {
			return oapi.StatisticsAPIGetdefaultJSONResponse{
				Body:       oapi.Error{Message: "Invalid baseDate format: " + err.Error()},
				StatusCode: 400,
			}, err
		}
		year, month, day := parsedDate.Year(), parsedDate.Month(), parsedDate.Day()
		baseDate = time.Date(year, month, day, 0, 0, 0, 0, loc)
	}

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
