package recorder

import (
	"context"
	"log"
	"sort"
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
	Status     RecordingStatus `json:"status"`
	Filename   string          `json:"filename"`
	Title      string          `json:"title,omitempty"`
	StartedAt  time.Time       `json:"startedAt,omitempty"`
	FinishedAt time.Time       `json:"finishedAt,omitempty"`
}

// Monitor はポモドーロの状態を監視して録画を制御する
type Monitor struct {
	session   *RecordingSession
	processor *VideoProcessor
	jobs      map[string]RecordingInfo // filename -> RecordingInfo
	mu        sync.RWMutex
}

// NewMonitor は新しいMonitorを作成する
func NewMonitor(recorder Recorder, statusProvider StatusProvider, processor *VideoProcessor) *Monitor {
	return &Monitor{
		session:   NewRecordingSession(recorder, statusProvider),
		processor: processor,
		jobs:      make(map[string]RecordingInfo),
	}
}

// GetAllRecordingInfos は全ての録画情報を新しい順に返す
func (m *Monitor) GetAllRecordingInfos() []RecordingInfo {
	m.mu.RLock()
	defer m.mu.RUnlock()

	result := make([]RecordingInfo, 0, len(m.jobs))
	for _, info := range m.jobs {
		result = append(result, info)
	}

	// Filenameの降順でソートする（新しい順）
	sort.Slice(result, func(i, j int) bool {
		return result[i].Filename > result[j].Filename
	})

	return result
}

// getRecordingInfo は指定されたfilenameの録画情報を返す
func (m *Monitor) getRecordingInfo(filename string) (RecordingInfo, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	info, ok := m.jobs[filename]
	return info, ok
}

// setRecordingInfo は録画情報を更新する
func (m *Monitor) setRecordingInfo(info RecordingInfo) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.jobs[info.Filename] = info
}

// Run はポモドーロの状態監視と録画を開始する
func (m *Monitor) Run(ctx context.Context, states <-chan bool) {
	defer func() {
		log.Println("Cleanup: stopping recording")
		_, _ = m.session.Stop()
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
				startedAt := time.Now().UTC()
				filename, title, err := m.session.Start()
				status := StatusRecording
				if err != nil {
					log.Printf("Error starting recording: %v", err)
					status = StatusFailed
				}
				m.setRecordingInfo(RecordingInfo{
					Status:    status,
					Filename:  filename,
					Title:     title,
					StartedAt: startedAt,
				})
			} else if !isActive && wasActive {
				log.Println("Pomodoro stopped, stopping recording")
				finishedAt := time.Now().UTC()
				filename, err := m.session.Stop()
				if err != nil {
					log.Printf("Error stopping recording: %v", err)
				} else if filename != "" {
					// 変換処理を開始する
					if info, ok := m.getRecordingInfo(filename); ok {
						info.Status = StatusProcessing
						info.FinishedAt = finishedAt
						m.setRecordingInfo(info)
						go func(filename, title string, startedAt, finishedAt time.Time) {
							success := m.processor.processVideo(filename, title, startedAt, finishedAt)
							if info, ok := m.getRecordingInfo(filename); ok {
								if success {
									info.Status = StatusSuccess
								} else {
									info.Status = StatusFailed
								}
								m.setRecordingInfo(info)
							}
						}(info.Filename, info.Title, info.StartedAt, info.FinishedAt)
					}
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
