package recorder

import (
	"context"
	"log"
	"time"
)

// Monitor はポモドーロの状態を監視して録画を制御する
type Monitor struct {
	session *RecordingSession
}

// NewMonitor は新しいMonitorを作成する
func NewMonitor(recorder Recorder, statusProvider StatusProvider, client VideoClient, processor VideoProcessor) *Monitor {
	return &Monitor{
		session: NewRecordingSession(recorder, statusProvider, client, processor),
	}
}

// Session はRecordingSessionを返す
func (m *Monitor) Session() *RecordingSession {
	return m.session
}

// Run はポモドーロの状態監視と録画を開始する
func (m *Monitor) Run(ctx context.Context, states <-chan bool) {
	defer func() {
		log.Println("Cleanup: stopping recording")
		_ = m.session.Stop()
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
				if err := m.session.Start(); err != nil {
					log.Printf("Error starting recording: %v", err)
				}
			} else if !isActive && wasActive {
				log.Println("Pomodoro stopped, stopping recording")
				if err := m.session.Stop(); err != nil {
					log.Printf("Error stopping recording: %v", err)
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
