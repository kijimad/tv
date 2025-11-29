package recorder

import (
	"fmt"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
)

// Recorder は画面録画を管理する
type Recorder interface {
	Start(filename string) error
	Stop() error
	Filename() string
}

// VideoClient はVideo APIのクライアント
type VideoClient interface {
	CreateVideo(req oapi.VideoCreate) (*oapi.Video, error)
}

// RecordingSession は録画セッションを表す
type RecordingSession struct {
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

// Start は録画を開始する
func (s *RecordingSession) Start() (string, string, error) {
	title, err := s.getTitle()
	if err != nil {
		return "", "", fmt.Errorf("failed to get title: %w", err)
	}

	filename := s.generateFilename()

	// 録画を開始する
	if err := s.recorder.Start(filename); err != nil {
		return "", "", fmt.Errorf("failed to start recording: %w", err)
	}

	return filename, title, nil
}

// getTitle は現在のタスク名を取得する
func (s *RecordingSession) getTitle() (string, error) {
	title, err := s.statusProvider.GetTitle()
	if err != nil {
		return "", fmt.Errorf("failed to get title from status provider: %w", err)
	}
	if title == "" {
		return "", fmt.Errorf("title is empty")
	}
	return title, nil
}

// generateFilename は録画ファイル名を生成する
func (s *RecordingSession) generateFilename() string {
	return fmt.Sprintf("recording_%s.webm", time.Now().Format("20060102_150405"))
}

// Stop は録画を停止し、ファイル名を返す
func (s *RecordingSession) Stop() (string, error) {
	filename := s.recorder.Filename()

	// 録画を停止する
	if err := s.recorder.Stop(); err != nil {
		return "", fmt.Errorf("failed to stop recording: %w", err)
	}

	return filename, nil
}
