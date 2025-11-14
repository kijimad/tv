package main

import (
	"testing"
)

type MockRecorder struct {
	startChan chan struct{}
	stopChan  chan struct{}
}

func NewMockRecorder() *MockRecorder {
	return &MockRecorder{
		startChan: make(chan struct{}, 1),
		stopChan:  make(chan struct{}, 1),
	}
}

func (m *MockRecorder) Start() error {
	m.startChan <- struct{}{}
	return nil
}

func (m *MockRecorder) Stop() error {
	m.stopChan <- struct{}{}
	return nil
}

// TODO: assertする
func TestMonitor_StartRecordingOnPomodoroStart(t *testing.T) {
	recorder := NewMockRecorder()
	monitor := NewMonitor(recorder)

	states := make(chan bool)
	done := make(chan struct{})
	go monitor.Run(states, done)

	states <- false
	states <- true

	<-recorder.startChan
	close(states)
	<-done
}

// TODO: assertする
func TestMonitor_StopRecordingOnPomodoroStop(t *testing.T) {
	recorder := NewMockRecorder()
	monitor := NewMonitor(recorder)

	states := make(chan bool)
	done := make(chan struct{})
	go monitor.Run(states, done)

	states <- true
	states <- false

	<-recorder.stopChan
	close(states)
	<-done
}
