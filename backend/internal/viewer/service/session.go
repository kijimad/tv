package service

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// SessionService はセッションビジネスロジックのインターフェース
type SessionService interface {
	Baser
	CreateSession(ctx context.Context, params sqlc.CreateSessionParams) (*sqlc.Session, error)
	UpdateSessionStatus(ctx context.Context, id int64, status string) (*SessionWithVideoID, error)
	GetCurrentRecordingSession(ctx context.Context) (*sqlc.Session, error)
}

// SessionWithVideoID はセッションとビデオIDを持つ構造体
type SessionWithVideoID struct {
	Session sqlc.Session
	VideoID *int64
}

// SessionQuerier はセッション操作に必要なクエリメソッドのインターフェース
type SessionQuerier interface {
	CreateSession(ctx context.Context, params sqlc.CreateSessionParams) (sqlc.Session, error)
	UpdateSessionStatus(ctx context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error)
	GetCurrentRecordingSession(ctx context.Context) (sqlc.Session, error)
	CreateVideoFromSession(ctx context.Context, id int64) (sqlc.Video, error)
	CreateVideoSession(ctx context.Context, params sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error)
}

type sessionService struct {
	Base
	queries SessionQuerier
}

// NewSessionService はSessionServiceを作成する
func NewSessionService(queries SessionQuerier, cfg config.AppConfig, clk clock.Clock) SessionService {
	return &sessionService{
		Base:    NewBase(cfg, clk),
		queries: queries,
	}
}

func (s *sessionService) CreateSession(ctx context.Context, params sqlc.CreateSessionParams) (*sqlc.Session, error) {
	session, err := s.queries.CreateSession(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to create session: %w", err)
	}
	return &session, nil
}

func (s *sessionService) UpdateSessionStatus(ctx context.Context, id int64, status string) (*SessionWithVideoID, error) {
	// セッションのステータスを更新する
	session, err := s.queries.UpdateSessionStatus(ctx, sqlc.UpdateSessionStatusParams{
		ID:     id,
		Status: status,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to update session status: %w", err)
	}

	result := &SessionWithVideoID{
		Session: session,
		VideoID: nil,
	}

	// status='completed'の場合、videoレコードと中間テーブルレコードを自動作成する
	if status == "completed" {
		video, err := s.queries.CreateVideoFromSession(ctx, id)
		if err != nil {
			log.Printf("Failed to create video from session: %v", err)
			// エラーだが、セッション更新は成功しているのでエラーを返さない
		} else {
			// 中間テーブルに関連付けを作成する
			_, err = s.queries.CreateVideoSession(ctx, sqlc.CreateVideoSessionParams{
				VideoID:   video.ID,
				SessionID: id,
			})
			if err != nil {
				log.Printf("Failed to create video session: %v", err)
			}
			result.VideoID = &video.ID
		}
	}

	return result, nil
}

func (s *sessionService) GetCurrentRecordingSession(ctx context.Context) (*sqlc.Session, error) {
	session, err := s.queries.GetCurrentRecordingSession(ctx)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get current recording session: %w", err)
	}
	return &session, nil
}
