package recorder

import (
	"encoding/json"
	"net/http"
)

// RecordingInfoProvider は録画情報を提供する
type RecordingInfoProvider interface {
	GetRecordingInfo() RecordingInfo
}

// StatusHandler はRecordingInfoProviderの状態を提供するHTTPハンドラー
type StatusHandler struct {
	provider RecordingInfoProvider
}

// NewStatusHandler は新しいStatusHandlerを作成する
func NewStatusHandler(provider RecordingInfoProvider) *StatusHandler {
	return &StatusHandler{
		provider: provider,
	}
}

// GetRecordingStatus は録画状態をJSONで返す
func (h *StatusHandler) GetRecordingStatus(w http.ResponseWriter, _ *http.Request) {
	info := h.provider.GetRecordingInfo()
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(info); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
