package viewer

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kijimaD/tv/internal/gen"
	"github.com/stretchr/testify/assert"
)

func TestVideosList(t *testing.T) {
	t.Parallel()

	handler := &Handler{
		queries: nil,
	}

	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodGet, "/api/v1/videos", nil)

	handler.VideosList(c, gen.VideosListParams{})

	assert.Equal(t, http.StatusOK, w.Code)

	var response gen.VideoList
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, int32(0), response.Total)
	assert.Empty(t, response.Videos)
}

func TestVideosCreate(t *testing.T) {
	t.Parallel()

	handler := &Handler{
		queries: nil,
	}

	now := time.Now()
	reqBody := gen.VideoCreate{
		Title:      "Test Video",
		Filename:   "test.mp4",
		StartedAt:  now,
		FinishedAt: now.Add(time.Hour),
	}
	body, _ := json.Marshal(reqBody)

	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodPost, "/api/v1/videos", bytes.NewBuffer(body))
	c.Request.Header.Set("Content-Type", "application/json")

	handler.VideosCreate(c)

	assert.Equal(t, http.StatusCreated, w.Code)

	var response gen.Video
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "Test Video", response.Title)
	assert.Equal(t, "test.mp4", response.Filename)
}

func TestVideosGet(t *testing.T) {
	t.Parallel()

	handler := &Handler{
		queries: nil,
	}

	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodGet, "/api/v1/videos/1", nil)

	handler.VideosGet(c, 1)

	assert.Equal(t, http.StatusOK, w.Code)

	var response gen.Video
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.NotNil(t, response.Id)
	assert.Equal(t, int64(1), *response.Id)
}

func TestVideosUpdate(t *testing.T) {
	t.Parallel()

	handler := &Handler{
		queries: nil,
	}

	title := "Updated Title"
	reqBody := gen.VideoUpdate{
		Title: &title,
	}
	body, _ := json.Marshal(reqBody)

	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodPatch, "/api/v1/videos/1", bytes.NewBuffer(body))
	c.Request.Header.Set("Content-Type", "application/json")

	handler.VideosUpdate(c, 1)

	assert.Equal(t, http.StatusOK, w.Code)

	var response gen.Video
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.NotNil(t, response.Id)
}

func TestVideosDelete(t *testing.T) {
	t.Parallel()

	handler := &Handler{
		queries: nil,
	}

	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.DELETE("/api/v1/videos/:id", func(c *gin.Context) {
		handler.VideosDelete(c, 1)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodDelete, "/api/v1/videos/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)
}
