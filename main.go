package main

import (
	"log"
	"os/exec"
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

func (m *Monitor) Run(states <-chan bool, done <-chan struct{}) {
	wasActive := false

	for {
		select {
		case <-done:
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

func pollChecker(checker Checker, interval time.Duration, states chan<- bool) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for range ticker.C {
		isActive, err := checker.IsActive()
		if err != nil {
			log.Printf("Error checking pomodoro status: %v", err)
			continue
		}

		states <- isActive
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
	checker := &EmacsChecker{}
	recorder := &FFmpegRecorder{}
	monitor := NewMonitor(recorder)

	states := make(chan bool)
	done := make(chan struct{})
	go pollChecker(checker, 2*time.Second, states)
	monitor.Run(states, done)
}
