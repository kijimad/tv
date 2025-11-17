package service

import (
	"context"
	"database/sql"
	"errors"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockSessionQueries はsqlc.Queriesのモック
type mockSessionQueries struct {
	createSessionFunc          func(ctx context.Context, params sqlc.CreateSessionParams) (sqlc.Session, error)
	updateSessionStatusFunc    func(ctx context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error)
	getCurrentRecordingSession func(ctx context.Context) (sqlc.Session, error)
	createVideoFromSessionFunc func(ctx context.Context, id int64) (sqlc.Video, error)
	createVideoSessionFunc     func(ctx context.Context, params sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error)
}

func (m *mockSessionQueries) CreateSession(ctx context.Context, params sqlc.CreateSessionParams) (sqlc.Session, error) {
	if m.createSessionFunc != nil {
		return m.createSessionFunc(ctx, params)
	}
	return sqlc.Session{}, nil
}

func (m *mockSessionQueries) UpdateSessionStatus(ctx context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
	if m.updateSessionStatusFunc != nil {
		return m.updateSessionStatusFunc(ctx, params)
	}
	return sqlc.Session{}, nil
}

func (m *mockSessionQueries) GetCurrentRecordingSession(ctx context.Context) (sqlc.Session, error) {
	if m.getCurrentRecordingSession != nil {
		return m.getCurrentRecordingSession(ctx)
	}
	return sqlc.Session{}, nil
}

func (m *mockSessionQueries) CreateVideoFromSession(ctx context.Context, id int64) (sqlc.Video, error) {
	if m.createVideoFromSessionFunc != nil {
		return m.createVideoFromSessionFunc(ctx, id)
	}
	return sqlc.Video{}, nil
}

func (m *mockSessionQueries) CreateVideoSession(ctx context.Context, params sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error) {
	if m.createVideoSessionFunc != nil {
		return m.createVideoSessionFunc(ctx, params)
	}
	return sqlc.VideoSession{}, nil
}

// video関連のメソッド（未使用だがインターフェース実装のため必要）
func (m *mockSessionQueries) CreateVideo(_ context.Context, _ sqlc.CreateVideoParams) (sqlc.Video, error) {
	return sqlc.Video{}, nil
}

func (m *mockSessionQueries) GetVideo(_ context.Context, _ int64) (sqlc.Video, error) {
	return sqlc.Video{}, nil
}

func (m *mockSessionQueries) GetVideoByFilename(_ context.Context, _ string) (sqlc.Video, error) {
	return sqlc.Video{}, nil
}

func (m *mockSessionQueries) ListVideos(_ context.Context, _ sqlc.ListVideosParams) ([]sqlc.Video, error) {
	return []sqlc.Video{}, nil
}

func (m *mockSessionQueries) UpdateVideo(_ context.Context, _ sqlc.UpdateVideoParams) (sqlc.Video, error) {
	return sqlc.Video{}, nil
}

func (m *mockSessionQueries) DeleteVideo(_ context.Context, _ int64) error {
	return nil
}

func (m *mockSessionQueries) GetVideoSessionByVideoID(_ context.Context, _ int64) (sqlc.VideoSession, error) {
	return sqlc.VideoSession{}, nil
}

func (m *mockSessionQueries) GetVideoSessionBySessionID(_ context.Context, _ int64) (sqlc.VideoSession, error) {
	return sqlc.VideoSession{}, nil
}

func (m *mockSessionQueries) DeleteVideoSession(_ context.Context, _ int64) error {
	return nil
}

func TestSessionService_CreateSession(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("セッションを作成できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockSessionQueries{
			createSessionFunc: func(_ context.Context, params sqlc.CreateSessionParams) (sqlc.Session, error) {
				return sqlc.Session{
					ID:         1,
					Filename:   params.Filename,
					Title:      params.Title,
					Status:     "recording",
					StartedAt:  now,
					FinishedAt: sql.NullTime{},
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
		}

		svc := NewSessionService(mock)
		session, err := svc.CreateSession(ctx, sqlc.CreateSessionParams{
			Filename: "test.webm",
			Title:    "テストセッション",
		})

		require.NoError(t, err)
		assert.Equal(t, int64(1), session.ID)
		assert.Equal(t, "test.webm", session.Filename)
		assert.Equal(t, "テストセッション", session.Title)
		assert.Equal(t, "recording", session.Status)
	})
}

func TestSessionService_UpdateSessionStatus(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("セッションをcompletedに更新し、ビデオと中間テーブルを作成できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockSessionQueries{
			updateSessionStatusFunc: func(_ context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
				return sqlc.Session{
					ID:         params.ID,
					Filename:   "test.webm",
					Title:      "テストセッション",
					Status:     params.Status,
					StartedAt:  now,
					FinishedAt: sql.NullTime{Time: now.Add(time.Hour), Valid: true},
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			createVideoFromSessionFunc: func(_ context.Context, _ int64) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         100,
					Filename:   "test.webm",
					Title:      "テストセッション",
					StartedAt:  now,
					FinishedAt: now.Add(time.Hour),
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			createVideoSessionFunc: func(_ context.Context, params sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error) {
				return sqlc.VideoSession{
					ID:        1,
					VideoID:   params.VideoID,
					SessionID: params.SessionID,
					CreatedAt: now,
					UpdatedAt: now,
				}, nil
			},
		}

		svc := NewSessionService(mock)
		result, err := svc.UpdateSessionStatus(ctx, 1, "completed")

		require.NoError(t, err)
		assert.Equal(t, "completed", result.Session.Status)
		assert.NotNil(t, result.VideoID)
		assert.Equal(t, int64(100), *result.VideoID)
	})

	t.Run("セッションをfailedに更新する場合、ビデオは作成しない", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockSessionQueries{
			updateSessionStatusFunc: func(_ context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
				return sqlc.Session{
					ID:         params.ID,
					Filename:   "test.webm",
					Title:      "テストセッション",
					Status:     params.Status,
					StartedAt:  now,
					FinishedAt: sql.NullTime{Time: now.Add(time.Hour), Valid: true},
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
		}

		svc := NewSessionService(mock)
		result, err := svc.UpdateSessionStatus(ctx, 1, "failed")

		require.NoError(t, err)
		assert.Equal(t, "failed", result.Session.Status)
		assert.Nil(t, result.VideoID)
	})

	t.Run("ビデオ作成に失敗してもセッション更新は成功する", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockSessionQueries{
			updateSessionStatusFunc: func(_ context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
				return sqlc.Session{
					ID:         params.ID,
					Filename:   "test.webm",
					Title:      "テストセッション",
					Status:     params.Status,
					StartedAt:  now,
					FinishedAt: sql.NullTime{Time: now.Add(time.Hour), Valid: true},
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			createVideoFromSessionFunc: func(_ context.Context, _ int64) (sqlc.Video, error) {
				return sqlc.Video{}, errors.New("video creation failed")
			},
		}

		svc := NewSessionService(mock)
		result, err := svc.UpdateSessionStatus(ctx, 1, "completed")

		require.NoError(t, err)
		assert.Equal(t, "completed", result.Session.Status)
		assert.Nil(t, result.VideoID)
	})

	t.Run("中間テーブル作成に失敗してもセッション更新とビデオ作成は成功する", func(t *testing.T) {
		t.Parallel()
		now := time.Now()

		mock := &mockSessionQueries{
			updateSessionStatusFunc: func(_ context.Context, params sqlc.UpdateSessionStatusParams) (sqlc.Session, error) {
				return sqlc.Session{
					ID:         params.ID,
					Filename:   "test.webm",
					Title:      "テストセッション",
					Status:     params.Status,
					StartedAt:  now,
					FinishedAt: sql.NullTime{Time: now.Add(time.Hour), Valid: true},
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			createVideoFromSessionFunc: func(_ context.Context, _ int64) (sqlc.Video, error) {
				return sqlc.Video{
					ID:         100,
					Filename:   "test.webm",
					Title:      "テストセッション",
					StartedAt:  now,
					FinishedAt: now.Add(time.Hour),
					CreatedAt:  now,
					UpdatedAt:  now,
				}, nil
			},
			createVideoSessionFunc: func(_ context.Context, _ sqlc.CreateVideoSessionParams) (sqlc.VideoSession, error) {
				return sqlc.VideoSession{}, errors.New("video_session creation failed")
			},
		}

		svc := NewSessionService(mock)
		result, err := svc.UpdateSessionStatus(ctx, 1, "completed")

		require.NoError(t, err)
		assert.Equal(t, "completed", result.Session.Status)
		assert.NotNil(t, result.VideoID)
		assert.Equal(t, int64(100), *result.VideoID)
	})
}

func TestSessionService_GetCurrentRecordingSession(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	t.Run("録画中のセッションを取得できる", func(t *testing.T) {
		t.Parallel()
		now := time.Now()
		expectedSession := sqlc.Session{
			ID:         1,
			Filename:   "test.webm",
			Title:      "テストセッション",
			Status:     "recording",
			StartedAt:  now,
			FinishedAt: sql.NullTime{},
			CreatedAt:  now,
			UpdatedAt:  now,
		}

		mock := &mockSessionQueries{
			getCurrentRecordingSession: func(_ context.Context) (sqlc.Session, error) {
				return expectedSession, nil
			},
		}

		svc := NewSessionService(mock)
		session, err := svc.GetCurrentRecordingSession(ctx)

		require.NoError(t, err)
		assert.Equal(t, expectedSession.ID, session.ID)
		assert.Equal(t, "recording", session.Status)
	})

	t.Run("録画中のセッションがない場合、nilを返す", func(t *testing.T) {
		t.Parallel()
		mock := &mockSessionQueries{
			getCurrentRecordingSession: func(_ context.Context) (sqlc.Session, error) {
				return sqlc.Session{}, sql.ErrNoRows
			},
		}

		svc := NewSessionService(mock)
		session, err := svc.GetCurrentRecordingSession(ctx)

		require.NoError(t, err)
		assert.Nil(t, session)
	})
}
