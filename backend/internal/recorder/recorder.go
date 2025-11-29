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
	Filename() string
}

// VideoClient はVideo APIのクライアント
// TODO: これらは情報を送るだけなので、プレフィクスにSyncをつけるべきかもしれない
type VideoClient interface {
	CreateVideo(req oapi.VideoCreate) (*oapi.Video, error)
	StopVideo(id int64, req oapi.VideoStopRequest) (*oapi.Video, error)
	ProcessVideo(id int64) (*oapi.Video, error)
	CompleteVideo(id int64) (*oapi.Video, error)
	FailVideo(id int64) (*oapi.Video, error)
}

// RecordingSession は録画セッションを表す
type RecordingSession struct {
	currentVideoID int64
	recorder       Recorder
	statusProvider StatusProvider
	client         VideoClient
	processor      VideoProcessor
}

// NewRecordingSession は新しいRecordingSessionを作成する
func NewRecordingSession(recorder Recorder, statusProvider StatusProvider, client VideoClient, processor VideoProcessor) *RecordingSession {
	return &RecordingSession{
		recorder:       recorder,
		statusProvider: statusProvider,
		client:         client,
		processor:      processor,
	}
}

// Start は録画を開始し、ビデオを作成する
func (s *RecordingSession) Start() error {
	title, err := s.getTitle()
	if err != nil {
		return fmt.Errorf("failed to get title: %w", err)
	}

	filename := s.generateFilename()

	video, err := s.client.CreateVideo(oapi.VideoCreate{
		Filename: filename,
		Title:    title,
	})
	if err != nil {
		return fmt.Errorf("failed to create video: %w", err)
	}

	s.currentVideoID = *video.Id

	// 録画を開始する
	if err := s.recorder.Start(filename); err != nil {
		_, _ = s.client.StopVideo(s.currentVideoID, oapi.VideoStopRequest{
			Success: false,
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

// Stop は録画を停止し、ビデオを完了にする
func (s *RecordingSession) Stop() error {
	videoID := s.currentVideoID
	filename := s.recorder.Filename()

	// 録画を停止する
	if err := s.recorder.Stop(); err != nil {
		_, _ = s.client.StopVideo(s.currentVideoID, oapi.VideoStopRequest{
			Success: false,
		})
		return fmt.Errorf("failed to stop recording: %w", err)
	}

	// 待ちステータスにする（recording → pending）
	_, err := s.client.StopVideo(s.currentVideoID, oapi.VideoStopRequest{})
	if err != nil {
		return fmt.Errorf("failed to stop video: %w", err)
	}

	// 変換開始ステータスにする（pending → processing）
	_, err = s.client.ProcessVideo(s.currentVideoID)
	if err != nil {
		return fmt.Errorf("failed to process video: %w", err)
	}

	// 後処理をVideoProcessorに依頼する
	s.processor.Process(videoID, filename)

	s.currentVideoID = 0
	return nil
}
