package recorder

import (
	"context"
	"testing"

	"github.com/kijimaD/tv/internal/oapi"
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

func (m *MockRecorder) Start(_ string) error {
	m.calls <- "start"
	return nil
}

func (m *MockRecorder) Stop() error {
	m.calls <- "stop"
	return nil
}

type MockVideoSender struct {
	calls chan oapi.VideoCreate
}

func NewMockVideoSender() *MockVideoSender {
	return &MockVideoSender{
		calls: make(chan oapi.VideoCreate, 1),
	}
}

func (m *MockVideoSender) Send(video oapi.VideoCreate) error {
	m.calls <- video
	return nil
}

func TestMonitor_StartRecordingOnPomodoroStart(t *testing.T) {
	t.Parallel()
	mockRecorder := NewMockRecorder()
	mockEmacs := NewEmacsChecker()
	mockSender := NewMockVideoSender()
	monitor := NewMonitor(mockRecorder, mockEmacs, mockSender)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true

	assert.Equal(t, "start", <-mockRecorder.calls)
	assert.Equal(t, 0, len(mockRecorder.calls))
	assert.Equal(t, 0, len(mockSender.calls), "送信関数が呼び出されない")
}

func TestMonitor_StopRecordingOnPomodoroStop(t *testing.T) {
	t.Parallel()
	mockRecorder := NewMockRecorder()
	mockEmacs := NewEmacsChecker()
	mockSender := NewMockVideoSender()
	monitor := NewMonitor(mockRecorder, mockEmacs, mockSender)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true
	assert.Equal(t, "start", <-mockRecorder.calls)

	states <- false
	assert.Equal(t, "stop", <-mockRecorder.calls)
	assert.Equal(t, 0, len(mockRecorder.calls)) // 1度だけ呼ばれる

	videoInfo := <-mockSender.calls
	assert.NotEmpty(t, videoInfo.Filename, "ファイル名が設定される")
	assert.Equal(t, 0, len(mockSender.calls)) // 1度だけ呼ばれる
}
