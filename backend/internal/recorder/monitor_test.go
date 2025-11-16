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

type MockSessionClient struct {
	createCalls chan oapi.SessionCreate
	updateCalls chan int64
}

func NewMockSessionClient() *MockSessionClient {
	return &MockSessionClient{
		createCalls: make(chan oapi.SessionCreate, 1),
		updateCalls: make(chan int64, 1),
	}
}

func (m *MockSessionClient) CreateSession(req oapi.SessionCreate) (*oapi.Session, error) {
	m.createCalls <- req
	sessionID := int64(1)
	return &oapi.Session{
		Id:       &sessionID,
		Filename: req.Filename,
		Title:    req.Title,
		Status:   oapi.SessionStatusRecording,
	}, nil
}

func (m *MockSessionClient) UpdateSessionStatus(id int64, _ oapi.SessionUpdate) (*oapi.Session, error) {
	m.updateCalls <- id
	return &oapi.Session{
		Id:       &id,
		Filename: "test.webm",
		Status:   oapi.SessionStatusCompleted,
	}, nil
}

func TestMonitor_StartRecordingOnPomodoroStart(t *testing.T) {
	t.Parallel()
	mockRecorder := NewMockRecorder()
	mockEmacs := NewEmacsChecker()
	mockClient := NewMockSessionClient()
	monitor := NewMonitor(mockRecorder, mockEmacs, mockClient)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true

	assert.Equal(t, "start", <-mockRecorder.calls)
	sessionReq := <-mockClient.createCalls
	assert.NotEmpty(t, sessionReq.Filename, "セッションが作成される")
	assert.Equal(t, 0, len(mockRecorder.calls))
	assert.Equal(t, 0, len(mockClient.updateCalls), "セッション更新は呼ばれない")
}

func TestMonitor_StopRecordingOnPomodoroStop(t *testing.T) {
	t.Parallel()
	mockRecorder := NewMockRecorder()
	mockEmacs := NewEmacsChecker()
	mockClient := NewMockSessionClient()
	monitor := NewMonitor(mockRecorder, mockEmacs, mockClient)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	states := make(chan bool)

	go monitor.Run(ctx, states)

	states <- false
	states <- true
	assert.Equal(t, "start", <-mockRecorder.calls)
	<-mockClient.createCalls // セッション作成を消費

	states <- false
	assert.Equal(t, "stop", <-mockRecorder.calls)
	assert.Equal(t, 0, len(mockRecorder.calls)) // 1度だけ呼ばれる

	sessionID := <-mockClient.updateCalls
	assert.Equal(t, int64(1), sessionID, "セッションが更新される")
	assert.Equal(t, 0, len(mockClient.updateCalls)) // 1度だけ呼ばれる
}
