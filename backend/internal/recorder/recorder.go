package recorder

import (
	"fmt"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
)

// StatusProvider はポモドーロの状態と情報を提供する
type StatusProvider interface {
	IsActive() (bool, error)
	GetTitle() (string, error)
}

// Recorder は画面録画を管理する
type Recorder interface {
	Start(filename string) error
	Stop() error
}

// VideoSender は動画情報をサーバーに送信する
type VideoSender interface {
	Send(oapi.VideoCreate) error
}

// RecordingSession は録画セッションを表す
type RecordingSession struct {
	videoCreate    oapi.VideoCreate
	recorder       Recorder
	statusProvider StatusProvider
}

// NewRecordingSession は新しいRecordingSessionを作成する
func NewRecordingSession(recorder Recorder, statusProvider StatusProvider) *RecordingSession {
	return &RecordingSession{
		recorder:       recorder,
		statusProvider: statusProvider,
	}
}

// Start は録画を開始し、メタデータを記録する
func (s *RecordingSession) Start() error {
	s.videoCreate.StartedAt = time.Now()
	s.videoCreate.Title = s.getTitle()
	s.videoCreate.Filename = s.generateFilename()
	return s.recorder.Start(s.videoCreate.Filename)
}

// getTitle は現在のタスク名を取得する
func (s *RecordingSession) getTitle() string {
	if title, err := s.statusProvider.GetTitle(); err == nil {
		return title
	}
	return ""
}

// generateFilename は録画ファイル名を生成する
func (s *RecordingSession) generateFilename() string {
	return fmt.Sprintf("recording_%s.webm", time.Now().Format("20060102_150405"))
}

// Stop は録画を停止する
func (s *RecordingSession) Stop() error {
	s.videoCreate.FinishedAt = time.Now()
	return s.recorder.Stop()
}

// GetVideoInfo は録画情報を返す
func (s *RecordingSession) GetVideoInfo() oapi.VideoCreate {
	return s.videoCreate
}
