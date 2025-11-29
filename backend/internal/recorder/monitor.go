package recorder

import (
	"context"
	"log"
	"sync"
	"time"
)

// StatusProvider はポモドーロの状態と情報を提供する
type StatusProvider interface {
	IsActive() (bool, error)
	GetTitle() (string, error)
}

// RecordingStatus は録画の状態を表す
type RecordingStatus string

// RecordingStatusの定数定義
// オンメモリでジョブの状況を表す
const (
	StatusIdle       RecordingStatus = "idle"
	StatusRecording  RecordingStatus = "recording"
	StatusProcessing RecordingStatus = "processing"
	StatusSuccess    RecordingStatus = "success"
	StatusFailed     RecordingStatus = "failed"
)

// RecordingInfo は現在の録画情報を表す
type RecordingInfo struct {
	Status   RecordingStatus `json:"status"`
	Filename string          `json:"filename,omitempty"`
	Title    string          `json:"title,omitempty"`
}

// Monitor はポモドーロの状態を監視して録画を制御する
type Monitor struct {
	session       *RecordingSession
	processor     *VideoProcessor
	recordingInfo RecordingInfo
	mu            sync.RWMutex
}

// NewMonitor は新しいMonitorを作成する
func NewMonitor(recorder Recorder, statusProvider StatusProvider, client VideoClient, processor *VideoProcessor) *Monitor {
	return &Monitor{
		session:   NewRecordingSession(recorder, statusProvider, client),
		processor: processor,
		recordingInfo: RecordingInfo{
			Status: StatusIdle,
		},
	}
}

// GetRecordingInfo は現在の録画情報を返す
func (m *Monitor) GetRecordingInfo() RecordingInfo {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.recordingInfo
}

// setRecordingInfo は録画情報を更新する
func (m *Monitor) setRecordingInfo(info RecordingInfo) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.recordingInfo = info
}

// Run はポモドーロの状態監視と録画を開始する
func (m *Monitor) Run(ctx context.Context, states <-chan bool) {
	defer func() {
		log.Println("Cleanup: stopping recording")
		_, _ = m.session.Stop()
		m.setRecordingInfo(RecordingInfo{Status: StatusIdle})
	}()

	wasActive := false

	for {
		select {
		case <-ctx.Done():
			log.Println("Monitor stopped by context")
			return
		case isActive, ok := <-states:
			if !ok {
				return
			}
			if isActive && !wasActive {
				log.Println("Pomodoro started, beginning recording")
				info, err := m.session.Start()
				if err != nil {
					log.Printf("Error starting recording: %v", err)
					m.setRecordingInfo(RecordingInfo{Status: StatusFailed})
				} else {
					m.setRecordingInfo(info)
				}
			} else if !isActive && wasActive {
				log.Println("Pomodoro stopped, stopping recording")
				stopped, err := m.session.Stop()
				if err != nil {
					log.Printf("Error stopping recording: %v", err)
					m.setRecordingInfo(RecordingInfo{Status: StatusFailed})
				} else if stopped != nil {
					// 変換処理を開始する
					info := m.GetRecordingInfo()
					info.Status = StatusProcessing
					m.setRecordingInfo(info)
					go func(videoID int64, filename string) {
						success := m.processor.processVideo(videoID, filename)
						info := m.GetRecordingInfo()
						if success {
							info.Status = StatusSuccess
						} else {
							info.Status = StatusFailed
						}
						m.setRecordingInfo(info)
					}(stopped.VideoID, stopped.Filename)
				}
			}

			wasActive = isActive
		}
	}
}

// PollChecker は定期的にStatusProviderをポーリングし、結果をstatesチャネルに送信する
func PollChecker(ctx context.Context, checker StatusProvider, interval time.Duration, states chan<- bool) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			isActive, err := checker.IsActive()
			if err != nil {
				log.Printf("Error checking pomodoro status: %v", err)
				continue
			}

			select {
			case states <- isActive:
			case <-ctx.Done():
				return
			}
		}
	}
}
