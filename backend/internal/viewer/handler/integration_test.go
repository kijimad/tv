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
	"github.com/kijimaD/tv/internal/gen"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// setupTestServer はテスト用のHTTPサーバーをセットアップする
func setupTestServer(t *testing.T) (*gin.Engine, *dbgen.Queries, func()) {
	t.Helper()

	queries, cleanup := setupTestDB(t)

	videoService := service.NewVideoService(queries)
	videoHandler := NewVideoHandler(videoService)

	gin.SetMode(gin.TestMode)
	r := gin.New()

	validateMiddleware, err := MakeValidateMiddleware()
	require.NoError(t, err, "バリデーションミドルウェアの作成に失敗しました")
	r.Use(validateMiddleware)

	gen.RegisterHandlers(r, videoHandler)

	return r, queries, cleanup
}

func TestIntegration_VideosCRUD(t *testing.T) {
	r, queries, cleanup := setupTestServer(t)
	defer cleanup()

	ctx := context.Background()
	now := time.Now()
	finishedAt := now.Add(time.Hour)

	var createdVideoID int64

	t.Run("ビデオを作成できる", func(t *testing.T) {
		reqBody := gen.VideoCreate{
			Title:      "統合テストビデオ",
			Filename:   "integration-test.mp4",
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

		var response gen.Video
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.NotNil(t, response.Id)
		assert.Equal(t, "統合テストビデオ", response.Title)
		assert.Equal(t, "integration-test.mp4", response.Filename)

		createdVideoID = *response.Id
	})

	t.Run("作成したビデオを取得できる", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/videos/%d", createdVideoID), nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.Video
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, createdVideoID, *response.Id)
		assert.Equal(t, "統合テストビデオ", response.Title)
	})

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.VideoList
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, int32(1), response.Total)
		assert.Len(t, response.Videos, 1)
	})

	t.Run("ビデオを更新できる", func(t *testing.T) {
		newTitle := "更新された統合テストビデオ"
		reqBody := gen.VideoUpdate{
			Title: &newTitle,
		}
		body, err := json.Marshal(reqBody)
		require.NoError(t, err)

		req := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/api/v1/videos/%d", createdVideoID), bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.Video
		err = json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Equal(t, newTitle, response.Title)
	})

	t.Run("ビデオを削除できる", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/api/v1/videos/%d", createdVideoID), nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNoContent, w.Code)

		// 削除されたことを確認
		_, err := queries.GetVideo(ctx, createdVideoID)
		assert.Error(t, err)
	})
}

func TestIntegration_ValidationErrors(t *testing.T) {
	r, _, cleanup := setupTestServer(t)
	defer cleanup()

	t.Run("limit範囲外でエラー", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?limit=101", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Contains(t, w.Body.String(), "must be at most 100")
	})

	t.Run("limitが0でエラー", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?limit=0", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
		assert.Contains(t, w.Body.String(), "must be at least 1")
	})

	t.Run("不正なJSON形式でエラー", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBufferString("invalid json"))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}

func TestIntegration_BusinessLogicValidation(t *testing.T) {
	r, _, cleanup := setupTestServer(t)
	defer cleanup()

	t.Run("started_atがfinished_atより後の場合エラー", func(t *testing.T) {
		now := time.Now()
		reqBody := gen.VideoCreate{
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
	r, queries, cleanup := setupTestServer(t)
	defer cleanup()

	ctx := context.Background()
	now := time.Now()

	// テストデータを複数作成
	for i := 0; i < 25; i++ {
		_, err := queries.CreateVideo(ctx, dbgen.CreateVideoParams{
			Title:      fmt.Sprintf("テストビデオ %d", i),
			Filename:   fmt.Sprintf("test-%d.mp4", i),
			StartedAt:  now.Add(time.Duration(i) * time.Minute),
			FinishedAt: now.Add(time.Duration(i+1) * time.Hour),
		})
		require.NoError(t, err)
	}

	t.Run("limitパラメータが機能する", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?limit=10", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.VideoList
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Len(t, response.Videos, 10)
	})

	t.Run("offsetパラメータが機能する", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/videos?limit=10&offset=20", nil)
		w := httptest.NewRecorder()

		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.VideoList
		err := json.Unmarshal(w.Body.Bytes(), &response)
		require.NoError(t, err)
		assert.Len(t, response.Videos, 5) // 25件中、20件スキップして残り5件
	})
}

// TestIntegration_Parallel は並列実行テスト
func TestIntegration_Parallel(t *testing.T) {
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
			defer cleanup()

			now := time.Now()
			reqBody := gen.VideoCreate{
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
