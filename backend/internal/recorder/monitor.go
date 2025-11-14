package recorder

import (
	"context"
	"log"
	"time"
)

// Monitor monitors pomodoro status and controls recording
type Monitor struct {
	recorder Recorder
}

// NewMonitor creates a new Monitor
func NewMonitor(recorder Recorder) *Monitor {
	return &Monitor{
		recorder: recorder,
	}
}

// Run starts monitoring pomodoro status and recording
func (m *Monitor) Run(ctx context.Context, states <-chan bool) {
	defer func() {
		log.Println("Cleanup: stopping recording")
		_ = m.recorder.Stop()
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
				if err := m.recorder.Start(); err != nil {
					log.Printf("Error starting recording: %v", err)
				}
			} else if !isActive && wasActive {
				log.Println("Pomodoro stopped, stopping recording")
				if err := m.recorder.Stop(); err != nil {
					log.Printf("Error stopping recording: %v", err)
				}
			}

			wasActive = isActive
		}
	}
}

// PollChecker polls the checker at regular intervals and sends results to states channel
func PollChecker(ctx context.Context, checker Checker, interval time.Duration, states chan<- bool) {
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
