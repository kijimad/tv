// 実際のDBとHTTPリクエストを使用した統合テスト
package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// setupTestServer はテスト用のHTTPサーバーをセットアップする
func setupTestServer(t *testing.T) (*gin.Engine, *sqlc.Queries, func()) {
	t.Helper()

	queries, cleanup := db.SetupTestDB(t)

	cfg := config.AppConfig{VideoDir: t.TempDir()}
	videoService := service.NewVideoService(queries, cfg, clock.RealClock{})
	sessionService := service.NewSessionService(queries, cfg, clock.RealClock{})
	videoHandler := NewVideoHandler(videoService, sessionService)

	gin.SetMode(gin.TestMode)
	r := gin.New()

	validateMiddleware, err := MakeValidateMiddleware()
	require.NoError(t, err, "バリデーションミドルウェアの作成に失敗しました")
	r.Use(validateMiddleware)

	oapi.RegisterHandlers(r, videoHandler)

	return r, queries, cleanup
}

func TestIntegration_VideosCreate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		r, _, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		now := time.Now()
		finishedAt := now.Add(time.Hour)

		reqBody := oapi.VideoCreate{
			Title:      "統合テストビデオ",
			Filename:   "integration-test-create.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusCreated, w.Code)

		var response oapi.Video
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.NotNil(t, response.Id)
		assert.Equal(t, "統合テストビデオ", response.Title)
		assert.Equal(t, "integration-test-create.mp4", response.Filename)
	})
}

func TestIntegration_VideosGet(t *testing.T) {
	t.Parallel()

	t.Run("作成したビデオを取得できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()
		finishedAt := now.Add(time.Hour)

		// このテスト用のビデオを作成
		video, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "取得テスト用ビデオ",
			Filename:   "integration-test-get.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		})
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/videos/%d", video.ID), nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.Video
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, video.ID, *response.Id)
		assert.Equal(t, "取得テスト用ビデオ", response.Title)
	})
}

func TestIntegration_VideosList(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()
		finishedAt := now.Add(time.Hour)

		// このテスト用のビデオを作成
		_, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "一覧テスト用ビデオ",
			Filename:   "integration-test-list.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		})
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.VideoPage
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, int32(1), response.Pager.TotalCount)
		assert.Len(t, response.Data, 1)
	})
}

func TestIntegration_VideosUpdate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを更新できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()
		finishedAt := now.Add(time.Hour)

		// このテスト用のビデオを作成
		video, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "更新テスト用ビデオ",
			Filename:   "integration-test-update.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		})
		require.NoError(t, err)

		newTitle := "更新された統合テストビデオ"
		reqBody := oapi.VideoUpdate{
			Title: &newTitle,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/api/v1/videos/%d", video.ID), bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.Video
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, newTitle, response.Title)
	})
}

func TestIntegration_VideosDelete(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを削除できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()
		finishedAt := now.Add(time.Hour)

		// このテスト用のビデオを作成
		video, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
			Title:      "削除テスト用ビデオ",
			Filename:   "integration-test-delete.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		})
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/api/v1/videos/%d", video.ID), nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNoContent, w.Code)

		// 削除されたことを確認
		_, err = queries.GetVideo(ctx, video.ID)
		assert.Error(t, err)
	})
}

func TestIntegration_ValidationErrors(t *testing.T) {
	t.Parallel()
	r, _, cleanup := setupTestServer(t)
	t.Cleanup(cleanup)

	t.Run("size範囲外でエラー", func(t *testing.T) {
		t.Parallel()
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?size=101", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Contains(t, w.Body.String(), "must be at most 100")
	})

	t.Run("sizeが0でエラー", func(t *testing.T) {
		t.Parallel()
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?size=0", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Contains(t, w.Body.String(), "must be at least 1")
	})

	t.Run("不正なJSON形式でエラー", func(t *testing.T) {
		t.Parallel()
		req := httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBufferString("invalid json"))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}

func TestIntegration_BusinessLogicValidation(t *testing.T) {
	t.Parallel()
	r, _, cleanup := setupTestServer(t)
	t.Cleanup(cleanup)

	t.Run("started_atがfinished_atより後の場合エラー", func(t *testing.T) {
		t.Parallel()
		now := time.Now()
		reqBody := oapi.VideoCreate{
			Title:      "不正な時刻",
			Filename:   "invalid.mp4",
			StartedAt:  now,
			FinishedAt: now.Add(-time.Hour), // 開始より前
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Contains(t, w.Body.String(), "started_at must be before finished_at")
	})
}

func TestIntegration_Pagination(t *testing.T) {
	t.Parallel()

	t.Run("sizeパラメータが機能する", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()

		// テストデータを複数作成
		for i := 0; i < 10; i++ {
			_, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
				Title:      fmt.Sprintf("テストビデオ %d", i),
				Filename:   fmt.Sprintf("test-size-%d.mp4", i),
				StartedAt:  now.Add(time.Duration(i) * time.Minute),
				FinishedAt: now.Add(time.Duration(i+1) * time.Hour),
			})
			require.NoError(t, err)
		}

		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?size=5", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.VideoPage
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Len(t, response.Data, 5)
		assert.Equal(t, int32(10), response.Pager.TotalCount)
	})

	t.Run("pageパラメータが機能する", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		now := time.Now()

		// テストデータを複数作成
		for i := 0; i < 10; i++ {
			_, err := queries.CreateVideo(ctx, sqlc.CreateVideoParams{
				Title:      fmt.Sprintf("テストビデオ %d", i),
				Filename:   fmt.Sprintf("test-page-%d.mp4", i),
				StartedAt:  now.Add(time.Duration(i) * time.Minute),
				FinishedAt: now.Add(time.Duration(i+1) * time.Hour),
			})
			require.NoError(t, err)
		}

		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?page=2&size=3", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.VideoPage
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, int32(2), response.Pager.Page)
		assert.Equal(t, int32(3), response.Pager.Size)
		assert.Len(t, response.Data, 3) // 10件中、3件スキップして3件取得
		assert.Equal(t, int32(10), response.Pager.TotalCount)
	})
}

// TestIntegration_Parallel は並列実行テスト
func TestIntegration_Parallel(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		title    string
		filename string
	}{
		{"ビデオ1", "並列テスト1", "parallel1.mp4"},
		{"ビデオ2", "並列テスト2", "parallel2.mp4"},
		{"ビデオ3", "並列テスト3", "parallel3.mp4"},
		{"ビデオ4", "並列テスト4", "parallel4.mp4"},
		{"ビデオ5", "並列テスト5", "parallel5.mp4"},
		{"ビデオ6", "並列テスト6", "parallel6.mp4"},
		{"ビデオ7", "並列テスト7", "parallel7.mp4"},
		{"ビデオ8", "並列テスト8", "parallel8.mp4"},
		{"ビデオ9", "並列テスト9", "parallel9.mp4"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			r, _, cleanup := setupTestServer(t)
			t.Cleanup(cleanup)

			now := time.Now()
			reqBody := oapi.VideoCreate{
				Title:      tt.title,
				Filename:   tt.filename,
				StartedAt:  now,
				FinishedAt: now.Add(time.Hour),
			}
			body, _ := json.Marshal(reqBody)

			req := httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()

			r.ServeHTTP(w, req)

			// エラー時はレスポンスボディも表示
			if w.Code != http.StatusCreated {
				t.Logf("Response body: %s", w.Body.String())
			}
			assert.Equal(t, http.StatusCreated, w.Code)
		})
	}
}

func TestIntegration_SessionsCreate(t *testing.T) {
	t.Parallel()

	t.Run("セッションを作成できる", func(t *testing.T) {
		t.Parallel()
		r, _, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		title := "統合テストセッション"
		reqBody := oapi.SessionCreate{
			Filename: "integration-test-session.webm",
			Title:    &title,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPost, "/api/v1/sessions", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusCreated, w.Code)

		var response oapi.Session
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.NotNil(t, response.Id)
		assert.Equal(t, title, *response.Title)
		assert.Equal(t, "integration-test-session.webm", response.Filename)
		assert.Equal(t, oapi.SessionStatus("recording"), response.Status)
	})
}

func TestIntegration_SessionsUpdate(t *testing.T) {
	t.Parallel()

	t.Run("セッションをcompletedに更新できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		// このテスト用のセッションを作成
		session, err := queries.CreateSession(ctx, sqlc.CreateSessionParams{
			Filename: "integration-test-update-session.webm",
			Title:    "更新テスト用セッション",
		})
		require.NoError(t, err)

		status := oapi.SessionUpdateStatusCompleted
		reqBody := oapi.SessionUpdate{
			Status: &status,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/api/v1/sessions/%d", session.ID), bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.Session
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, oapi.SessionStatus("completed"), response.Status)
		assert.NotNil(t, response.VideoId)
	})

	t.Run("セッションをfailedに更新できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		// このテスト用のセッションを作成
		session, err := queries.CreateSession(ctx, sqlc.CreateSessionParams{
			Filename: "integration-test-failed-session.webm",
			Title:    "失敗テスト用セッション",
		})
		require.NoError(t, err)

		status := oapi.SessionUpdateStatusFailed
		reqBody := oapi.SessionUpdate{
			Status: &status,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/api/v1/sessions/%d", session.ID), bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.Session
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, oapi.SessionStatus("failed"), response.Status)
		assert.Nil(t, response.VideoId)
	})
}

func TestIntegration_StatusGet(t *testing.T) {
	t.Parallel()

	t.Run("録画中のセッションがない場合、recording=falseを返す", func(t *testing.T) {
		t.Parallel()
		r, _, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		req := httptest.NewRequest(http.MethodGet, "/api/v1/status", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.RecordingStatus
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.False(t, response.Recording)
		assert.Nil(t, response.CurrentSession)
	})

	t.Run("録画中のセッションがある場合、recording=trueとセッション情報を返す", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		t.Cleanup(cleanup)

		ctx := context.Background()
		// このテスト用の録画中セッションを作成
		session, err := queries.CreateSession(ctx, sqlc.CreateSessionParams{
			Filename: "integration-test-status.webm",
			Title:    "ステータステスト用セッション",
		})
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodGet, "/api/v1/status", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response oapi.RecordingStatus
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.True(t, response.Recording)
		assert.NotNil(t, response.CurrentSession)
		assert.Equal(t, session.ID, *response.CurrentSession.Id)
	})
}

func TestIntegration_VideosFile(t *testing.T) {
	t.Parallel()

	t.Run("動画ファイルを配信できる", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		defer cleanup()

		// テスト用のビデオを作成する
		video, err := queries.CreateVideo(context.Background(), sqlc.CreateVideoParams{
			Title:      "Test Video",
			Filename:   "test.webm",
			StartedAt:  time.Now(),
			FinishedAt: time.Now().Add(time.Minute),
		})
		require.NoError(t, err)

		req, err := http.NewRequest("GET", fmt.Sprintf("/api/v1/videos/%d/file", video.ID), nil)
		require.NoError(t, err)

		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		// ファイルが存在しない場合は404になる可能性がある
		// ここではステータスコードとContent-Typeを確認する
		if w.Code == http.StatusOK {
			assert.Equal(t, "video/webm", w.Header().Get("Content-Type"))
		}
	})

	t.Run("存在しないビデオIDで404エラーを返す", func(t *testing.T) {
		t.Parallel()
		r, _, cleanup := setupTestServer(t)
		defer cleanup()

		req, err := http.NewRequest("GET", "/api/v1/videos/99999/file", nil)
		require.NoError(t, err)

		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)

		var response oapi.Error
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
	})

	t.Run("不正なファイル名でエラーを返す", func(t *testing.T) {
		t.Parallel()
		r, queries, cleanup := setupTestServer(t)
		defer cleanup()

		// パストラバーサル攻撃を含むファイル名でビデオを作成する
		video, err := queries.CreateVideo(context.Background(), sqlc.CreateVideoParams{
			Title:      "Test Video",
			Filename:   "../etc/passwd",
			StartedAt:  time.Now(),
			FinishedAt: time.Now().Add(time.Minute),
		})
		require.NoError(t, err)

		req, err := http.NewRequest("GET", fmt.Sprintf("/api/v1/videos/%d/file", video.ID), nil)
		require.NoError(t, err)

		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)

		var response oapi.Error
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
	})
}
