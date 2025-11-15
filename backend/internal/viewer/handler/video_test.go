package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/gen"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockVideoService はVideoServiceのモック
type MockVideoService struct {
	mock.Mock
}

func (m *MockVideoService) ListVideos(ctx context.Context, limit, offset int32) ([]dbgen.Video, int64, error) {
	args := m.Called(ctx, limit, offset)
	return args.Get(0).([]dbgen.Video), int64(args.Int(1)), args.Error(2)
}

func (m *MockVideoService) GetVideo(ctx context.Context, id int64) (*dbgen.Video, error) {
	args := m.Called(ctx, id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*dbgen.Video), args.Error(1)
}

func (m *MockVideoService) CreateVideo(ctx context.Context, params dbgen.CreateVideoParams) (*dbgen.Video, error) {
	args := m.Called(ctx, params)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*dbgen.Video), args.Error(1)
}

func (m *MockVideoService) UpdateVideo(ctx context.Context, id int64, params dbgen.UpdateVideoParams) (*dbgen.Video, error) {
	args := m.Called(ctx, id, params)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*dbgen.Video), args.Error(1)
}

func (m *MockVideoService) DeleteVideo(ctx context.Context, id int64) error {
	args := m.Called(ctx, id)
	return args.Error(0)
}

func TestVideoHandler_VideosList(t *testing.T) {
	gin.SetMode(gin.TestMode)

	now := time.Now()
	testVideos := []dbgen.Video{
		{
			ID:         1,
			Title:      "テストビデオ1",
			Filename:   "test1.mp4",
			StartedAt:  now,
			FinishedAt: now.Add(time.Hour),
			CreatedAt:  now,
			UpdatedAt:  now,
		},
	}

	t.Run("ビデオ一覧取得成功", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("ListVideos", mock.Anything, int32(10), int32(0)).Return(testVideos, 1, nil)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/v1/videos", nil)

		handler.VideosList(c, gen.VideosListParams{})

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.VideoList
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, int32(1), response.Total)
		assert.Len(t, response.Videos, 1)
		mockService.AssertExpectations(t)
	})

	t.Run("limitとoffsetパラメータ指定", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		limit := int32(20)
		offset := int32(10)
		mockService.On("ListVideos", mock.Anything, int32(20), int32(10)).Return(testVideos, 1, nil)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/v1/videos?limit=20&offset=10", nil)

		handler.VideosList(c, gen.VideosListParams{
			Limit:  &limit,
			Offset: &offset,
		})

		assert.Equal(t, http.StatusOK, w.Code)
		mockService.AssertExpectations(t)
	})

	t.Run("データベースエラー時は400エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("ListVideos", mock.Anything, int32(10), int32(0)).Return([]dbgen.Video{}, 0, errors.New("database error"))

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/v1/videos", nil)

		handler.VideosList(c, gen.VideosListParams{})

		assert.Equal(t, http.StatusBadRequest, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "list_failed", response.Code)
		mockService.AssertExpectations(t)
	})
}

func TestVideoHandler_VideosGet(t *testing.T) {
	gin.SetMode(gin.TestMode)

	now := time.Now()
	testVideo := &dbgen.Video{
		ID:         1,
		Title:      "テストビデオ",
		Filename:   "test.mp4",
		StartedAt:  now,
		FinishedAt: now.Add(time.Hour),
		CreatedAt:  now,
		UpdatedAt:  now,
	}

	t.Run("ビデオ詳細取得成功", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("GetVideo", mock.Anything, int64(1)).Return(testVideo, nil)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/v1/videos/1", nil)

		handler.VideosGet(c, 1)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.Video
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, int64(1), *response.Id)
		assert.Equal(t, "テストビデオ", response.Title)
		mockService.AssertExpectations(t)
	})

	t.Run("存在しないIDを指定した場合は404エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("GetVideo", mock.Anything, int64(999)).Return(nil, errors.New("video not found"))

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/v1/videos/999", nil)

		handler.VideosGet(c, 999)

		assert.Equal(t, http.StatusNotFound, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "not_found", response.Code)
		mockService.AssertExpectations(t)
	})
}

func TestVideoHandler_VideosCreate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	now := time.Now()
	finishedAt := now.Add(time.Hour)

	t.Run("ビデオ作成成功", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		createdVideo := &dbgen.Video{
			ID:         1,
			Title:      "新しいビデオ",
			Filename:   "new.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
			CreatedAt:  now,
			UpdatedAt:  now,
		}

		mockService.On("CreateVideo", mock.Anything, mock.MatchedBy(func(params dbgen.CreateVideoParams) bool {
			return params.Title == "新しいビデオ" &&
				params.Filename == "new.mp4" &&
				params.StartedAt.Equal(now) &&
				params.FinishedAt.Equal(finishedAt)
		})).Return(createdVideo, nil)

		reqBody := gen.VideoCreate{
			Title:      "新しいビデオ",
			Filename:   "new.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		}
		body, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosCreate(c)

		assert.Equal(t, http.StatusCreated, w.Code)

		var response gen.Video
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "新しいビデオ", response.Title)
		mockService.AssertExpectations(t)
	})

	t.Run("不正なJSON形式の場合は400エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBufferString("invalid json"))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosCreate(c)

		assert.Equal(t, http.StatusBadRequest, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "invalid_request", response.Code)
	})

	t.Run("作成処理に失敗した場合は400エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("CreateVideo", mock.Anything, mock.MatchedBy(func(params dbgen.CreateVideoParams) bool {
			return params.Title == "新しいビデオ" &&
				params.Filename == "new.mp4" &&
				params.StartedAt.Equal(now) &&
				params.FinishedAt.Equal(finishedAt)
		})).Return(nil, errors.New("database error"))

		reqBody := gen.VideoCreate{
			Title:      "新しいビデオ",
			Filename:   "new.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
		}
		body, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosCreate(c)

		assert.Equal(t, http.StatusBadRequest, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "create_failed", response.Code)
		mockService.AssertExpectations(t)
	})
}

func TestVideoHandler_VideosUpdate(t *testing.T) {
	gin.SetMode(gin.TestMode)

	now := time.Now()
	finishedAt := now.Add(time.Hour)

	t.Run("ビデオ更新成功", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		newTitle := "更新されたタイトル"
		updatedVideo := &dbgen.Video{
			ID:         1,
			Title:      newTitle,
			Filename:   "test.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
			CreatedAt:  now,
			UpdatedAt:  now,
		}

		mockService.On("UpdateVideo", mock.Anything, int64(1), mock.MatchedBy(func(params dbgen.UpdateVideoParams) bool {
			return params.ID == 1 &&
				params.Title == newTitle &&
				params.Filename == "test.mp4" &&
				params.StartedAt.Equal(now) &&
				params.FinishedAt.Equal(finishedAt)
		})).Return(updatedVideo, nil)

		filename := "test.mp4"
		reqBody := gen.VideoUpdate{
			Title:      &newTitle,
			Filename:   &filename,
			StartedAt:  &now,
			FinishedAt: &finishedAt,
		}
		body, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPatch, "/api/v1/videos/1", bytes.NewBuffer(body))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosUpdate(c, 1)

		assert.Equal(t, http.StatusOK, w.Code)

		var response gen.Video
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, newTitle, response.Title)
		mockService.AssertExpectations(t)
	})

	t.Run("部分更新できる", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		newTitle := "部分更新タイトル"
		updatedVideo := &dbgen.Video{
			ID:         1,
			Title:      newTitle,
			Filename:   "original.mp4",
			StartedAt:  now,
			FinishedAt: finishedAt,
			CreatedAt:  now,
			UpdatedAt:  now,
		}

		mockService.On("UpdateVideo", mock.Anything, int64(1), mock.MatchedBy(func(params dbgen.UpdateVideoParams) bool {
			return params.ID == 1 && params.Title == newTitle
		})).Return(updatedVideo, nil)

		reqBody := gen.VideoUpdate{
			Title: &newTitle,
		}
		body, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPatch, "/api/v1/videos/1", bytes.NewBuffer(body))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosUpdate(c, 1)

		assert.Equal(t, http.StatusOK, w.Code)
		mockService.AssertExpectations(t)
	})

	t.Run("更新処理に失敗した場合は400エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		newTitle := "更新されたタイトル"
		mockService.On("UpdateVideo", mock.Anything, int64(1), mock.MatchedBy(func(params dbgen.UpdateVideoParams) bool {
			return params.ID == 1 && params.Title == newTitle
		})).Return(nil, errors.New("update failed"))

		reqBody := gen.VideoUpdate{
			Title: &newTitle,
		}
		body, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodPatch, "/api/v1/videos/1", bytes.NewBuffer(body))
		c.Request.Header.Set("Content-Type", "application/json")

		handler.VideosUpdate(c, 1)

		assert.Equal(t, http.StatusBadRequest, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "update_failed", response.Code)
		mockService.AssertExpectations(t)
	})
}

func TestVideoHandler_VideosDelete(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("ビデオ削除できる", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("DeleteVideo", mock.Anything, int64(1)).Return(nil)

		w := httptest.NewRecorder()
		c, r := gin.CreateTestContext(w)
		r.DELETE("/api/v1/videos/:id", func(ctx *gin.Context) {
			handler.VideosDelete(ctx, 1)
		})
		c.Request = httptest.NewRequest(http.MethodDelete, "/api/v1/videos/1", nil)

		r.ServeHTTP(w, c.Request)

		assert.Equal(t, http.StatusNoContent, w.Code)
		mockService.AssertExpectations(t)
	})

	t.Run("削除処理に失敗した場合は500エラーを返す", func(t *testing.T) {
		mockService := new(MockVideoService)
		handler := NewVideoHandler(mockService)

		mockService.On("DeleteVideo", mock.Anything, int64(1)).Return(errors.New("delete failed"))

		w := httptest.NewRecorder()
		c, r := gin.CreateTestContext(w)
		r.DELETE("/api/v1/videos/:id", func(ctx *gin.Context) {
			handler.VideosDelete(ctx, 1)
		})
		c.Request = httptest.NewRequest(http.MethodDelete, "/api/v1/videos/1", nil)

		r.ServeHTTP(w, c.Request)

		assert.Equal(t, http.StatusInternalServerError, w.Code)

		var response gen.Error
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "delete_failed", response.Code)
		mockService.AssertExpectations(t)
	})
}
