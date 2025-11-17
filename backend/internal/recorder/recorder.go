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

// SessionClient はセッションAPIのクライアント
type SessionClient interface {
	CreateSession(req oapi.SessionCreate) (*oapi.Session, error)
	UpdateSessionStatus(id int64, req oapi.SessionUpdate) (*oapi.Session, error)
}

// RecordingSession は録画セッションを表す
type RecordingSession struct {
	currentSessionID int64
	recorder         Recorder
	statusProvider   StatusProvider
	client           SessionClient
}

// NewRecordingSession は新しいRecordingSessionを作成する
func NewRecordingSession(recorder Recorder, statusProvider StatusProvider, client SessionClient) *RecordingSession {
	return &RecordingSession{
		recorder:       recorder,
		statusProvider: statusProvider,
		client:         client,
	}
}

// Start は録画を開始し、セッションを作成する
func (s *RecordingSession) Start() error {
	title, err := s.getTitle()
	if err != nil {
		return fmt.Errorf("failed to get title: %w", err)
	}

	filename := s.generateFilename()

	// Viewerにセッション作成をリクエストする
	session, err := s.client.CreateSession(oapi.SessionCreate{
		Filename: filename,
		Title:    &title,
	})
	if err != nil {
		return fmt.Errorf("failed to create session: %w", err)
	}

	s.currentSessionID = *session.Id

	// 録画を開始する
	if err := s.recorder.Start(filename); err != nil {
		// 録画開始に失敗したらセッションを失敗にマークする
		status := oapi.SessionUpdateStatusFailed
		_, _ = s.client.UpdateSessionStatus(s.currentSessionID, oapi.SessionUpdate{
			Status: &status,
		})
		return fmt.Errorf("failed to start recording: %w", err)
	}

	return nil
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

// Stop は録画を停止し、セッションを完了にする
func (s *RecordingSession) Stop() error {
	// 録画を停止する
	if err := s.recorder.Stop(); err != nil {
		// 録画停止に失敗したらセッションを失敗にマークする
		status := oapi.SessionUpdateStatusFailed
		_, _ = s.client.UpdateSessionStatus(s.currentSessionID, oapi.SessionUpdate{
			Status: &status,
		})
		return fmt.Errorf("failed to stop recording: %w", err)
	}

	// セッションを完了にマークする（Viewer側でvideosテーブルのレコードが作成される）
	status := oapi.SessionUpdateStatusCompleted
	_, err := s.client.UpdateSessionStatus(s.currentSessionID, oapi.SessionUpdate{
		Status: &status,
	})
	if err != nil {
		return fmt.Errorf("failed to update session status: %w", err)
	}

	s.currentSessionID = 0
	return nil
}
