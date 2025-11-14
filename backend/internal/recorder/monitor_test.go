package recorder

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

type MockRecorder struct {
	calls chan string
}

func NewMockRecorder() *MockRecorder {
	return &MockRecorder{
		calls: make(chan string, 1),
	}
}

func (m *MockRecorder) Start() error {
	m.calls <- "start"
	return nil
}

func (m *MockRecorder) Stop() error {
	m.calls <- "stop"
	return nil
}

func TestMonitor_StartRecordingOnPomodoroStart(t *testing.T) {
	t.Parallel()
	recorder := NewMockRecorder()
	monitor := NewMonitor(recorder)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true

	assert.Equal(t, "start", <-recorder.calls)
	assert.Equal(t, 0, len(recorder.calls))
}

func TestMonitor_StopRecordingOnPomodoroStop(t *testing.T) {
	t.Parallel()
	recorder := NewMockRecorder()
	monitor := NewMonitor(recorder)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true
	assert.Equal(t, "start", <-recorder.calls)

	states <- false
	assert.Equal(t, "stop", <-recorder.calls)
	assert.Equal(t, 0, len(recorder.calls))
}
