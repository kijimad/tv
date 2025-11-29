package recorder

import (
	"encoding/json"
	"net/http"
)

// StatusHandler はRecordingSessionの状態を提供するHTTPハンドラー
type StatusHandler struct {
	session *RecordingSession
}

// NewStatusHandler は新しいStatusHandlerを作成する
func NewStatusHandler(session *RecordingSession) *StatusHandler {
	return &StatusHandler{
		session: session,
	}
}

// GetRecordingStatus は録画状態をJSONで返す
func (h *StatusHandler) GetRecordingStatus(w http.ResponseWriter, _ *http.Request) {
	info := h.session.GetRecordingInfo()
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(info); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
