package main

import (
	"context"
	"log"
	"os"
	"os/exec"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

type Checker interface {
	IsActive() (bool, error)
}

type Recorder interface {
	Start() error
	Stop() error
}

type Monitor struct {
	recorder Recorder
}

func NewMonitor(recorder Recorder) *Monitor {
	return &Monitor{
		recorder: recorder,
	}
}

func (m *Monitor) Run(ctx context.Context, states <-chan bool) {
	defer func() {
		log.Println("Cleanup: stopping recording")
		m.recorder.Stop()
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

func pollChecker(ctx context.Context, checker Checker, interval time.Duration, states chan<- bool) {
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

type EmacsChecker struct{}

func (e *EmacsChecker) IsActive() (bool, error) {
	out, err := exec.Command("emacsclient", "-e", "(org-pomodoro-active-p)").Output()
	if err != nil {
		return false, err
	}
	return strings.TrimSpace(string(out)) == "t", nil
}

type FFmpegRecorder struct {
	cmd *exec.Cmd
}

func (f *FFmpegRecorder) Start() error {
	f.cmd = exec.Command("./record_screen.sh")
	f.cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	return f.cmd.Start()
}

func (f *FFmpegRecorder) Stop() error {
	if f.cmd != nil && f.cmd.Process != nil {
		pgid, err := syscall.Getpgid(f.cmd.Process.Pid)
		if err != nil {
			return err
		}
		return syscall.Kill(-pgid, syscall.SIGTERM)
	}
	return nil
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		log.Printf("Received signal: %v, shutting down...", sig)
		cancel()
	}()

	recorder := &FFmpegRecorder{}
	monitor := NewMonitor(recorder)

	states := make(chan bool)
	checker := &EmacsChecker{}
	go pollChecker(ctx, checker, 2*time.Second, states)

	monitor.Run(ctx, states)
	log.Println("Shutdown complete")
}
