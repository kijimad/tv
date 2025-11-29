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

// StoppedRecording は録画停止時の情報を表す
type StoppedRecording struct {
	VideoID  int64
	Filename string
}

// RecordingSession は録画セッションを表す
type RecordingSession struct {
	currentVideoID int64
	recorder       Recorder
	statusProvider StatusProvider
	client         VideoClient
}

// NewRecordingSession は新しいRecordingSessionを作成する
func NewRecordingSession(recorder Recorder, statusProvider StatusProvider, client VideoClient) *RecordingSession {
	return &RecordingSession{
		recorder:       recorder,
		statusProvider: statusProvider,
		client:         client,
	}
}

// Start は録画を開始し、ビデオを作成する
func (s *RecordingSession) Start() (RecordingInfo, error) {
	title, err := s.getTitle()
	if err != nil {
		return RecordingInfo{}, fmt.Errorf("failed to get title: %w", err)
	}

	filename := s.generateFilename()

	video, err := s.client.CreateVideo(oapi.VideoCreate{
		Filename: filename,
		Title:    title,
	})
	if err != nil {
		return RecordingInfo{}, fmt.Errorf("failed to create video: %w", err)
	}

	s.currentVideoID = *video.Id

	// 録画を開始する
	if err := s.recorder.Start(filename); err != nil {
		return RecordingInfo{}, fmt.Errorf("failed to start recording: %w", err)
	}

	return RecordingInfo{
		Status:   StatusRecording,
		Filename: filename,
		Title:    title,
	}, nil
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

// Stop は録画を停止し、録画情報を返す
func (s *RecordingSession) Stop() (*StoppedRecording, error) {
	videoID := s.currentVideoID
	filename := s.recorder.Filename()

	// 録画を停止する
	if err := s.recorder.Stop(); err != nil {
		return nil, fmt.Errorf("failed to stop recording: %w", err)
	}

	s.currentVideoID = 0
	return &StoppedRecording{
		VideoID:  videoID,
		Filename: filename,
	}, nil
}
