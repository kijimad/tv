package recorder

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// mockRecordingInfoProvider はテスト用のRecordingInfoProvider
type mockRecordingInfoProvider struct {
	infos []RecordingInfo
}

func (m *mockRecordingInfoProvider) GetAllRecordingInfos() []RecordingInfo {
	return m.infos
}

func TestStatusHandler_GetRecordingStatus(t *testing.T) {
	t.Parallel()

	t.Run("録画中の情報を取得できる", func(t *testing.T) {
		t.Parallel()

		startedAt := time.Date(2025, 11, 30, 10, 0, 0, 0, time.UTC)
		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{
				{
					Status:    StatusRecording,
					Filename:  "recording_20251130_100000.webm",
					Title:     "テストタスク",
					StartedAt: startedAt,
				},
			},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "application/json", rec.Header().Get("Content-Type"))

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 1)
		assert.Equal(t, StatusRecording, infos[0].Status)
		assert.Equal(t, "recording_20251130_100000.webm", infos[0].Filename)
		assert.Equal(t, "テストタスク", infos[0].Title)
		assert.Equal(t, startedAt, infos[0].StartedAt)
		assert.True(t, infos[0].FinishedAt.IsZero())
	})

	t.Run("処理中の情報を取得できる", func(t *testing.T) {
		t.Parallel()

		startedAt := time.Date(2025, 11, 30, 10, 0, 0, 0, time.UTC)
		finishedAt := time.Date(2025, 11, 30, 10, 25, 0, 0, time.UTC)
		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{
				{
					Status:     StatusProcessing,
					Filename:   "recording_20251130_100000.webm",
					Title:      "処理中のタスク",
					StartedAt:  startedAt,
					FinishedAt: finishedAt,
				},
			},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 1)
		assert.Equal(t, StatusProcessing, infos[0].Status)
		assert.Equal(t, finishedAt, infos[0].FinishedAt)
	})

	t.Run("成功した録画情報を取得できる", func(t *testing.T) {
		t.Parallel()

		startedAt := time.Date(2025, 11, 30, 10, 0, 0, 0, time.UTC)
		finishedAt := time.Date(2025, 11, 30, 10, 25, 0, 0, time.UTC)
		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{
				{
					Status:     StatusSuccess,
					Filename:   "recording_20251130_100000.webm",
					Title:      "完了したタスク",
					StartedAt:  startedAt,
					FinishedAt: finishedAt,
				},
			},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 1)
		assert.Equal(t, StatusSuccess, infos[0].Status)
	})

	t.Run("失敗した録画情報を取得できる", func(t *testing.T) {
		t.Parallel()

		startedAt := time.Date(2025, 11, 30, 10, 0, 0, 0, time.UTC)
		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{
				{
					Status:    StatusFailed,
					Filename:  "recording_20251130_100000.webm",
					Title:     "失敗したタスク",
					StartedAt: startedAt,
				},
			},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 1)
		assert.Equal(t, StatusFailed, infos[0].Status)
	})

	t.Run("複数の録画情報を取得できる", func(t *testing.T) {
		t.Parallel()

		startedAt1 := time.Date(2025, 11, 30, 10, 0, 0, 0, time.UTC)
		finishedAt1 := time.Date(2025, 11, 30, 10, 25, 0, 0, time.UTC)
		startedAt2 := time.Date(2025, 11, 30, 11, 0, 0, 0, time.UTC)

		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{
				{
					Status:     StatusSuccess,
					Filename:   "recording_20251130_100000.webm",
					Title:      "完了したタスク",
					StartedAt:  startedAt1,
					FinishedAt: finishedAt1,
				},
				{
					Status:    StatusRecording,
					Filename:  "recording_20251130_110000.webm",
					Title:     "録画中のタスク",
					StartedAt: startedAt2,
				},
			},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 2)
		assert.Equal(t, StatusSuccess, infos[0].Status)
		assert.Equal(t, StatusRecording, infos[1].Status)
	})

	t.Run("録画情報が空の時は空配列を返す", func(t *testing.T) {
		t.Parallel()

		provider := &mockRecordingInfoProvider{
			infos: []RecordingInfo{},
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)

		var infos []RecordingInfo
		err := json.NewDecoder(rec.Body).Decode(&infos)
		assert.NoError(t, err)
		assert.Len(t, infos, 0)
	})

	t.Run("nilの録画情報を返す時はnullを返す", func(t *testing.T) {
		t.Parallel()

		provider := &mockRecordingInfoProvider{
			infos: nil,
		}

		handler := NewStatusHandler(provider)
		req := httptest.NewRequest(http.MethodGet, "/status", nil)
		rec := httptest.NewRecorder()

		handler.GetRecordingStatus(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "null\n", rec.Body.String())
	})
}
