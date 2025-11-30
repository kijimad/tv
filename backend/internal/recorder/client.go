package recorder

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/recorder/config"
)

// ViewerClient はViewerサービスのAPIクライアント
type ViewerClient struct {
	endpoint   string
	httpClient *http.Client
}

// NewViewerClient は新しいViewerClientを作成する
func NewViewerClient(cfg config.AppConfig) *ViewerClient {
	return &ViewerClient{
		endpoint:   cfg.APIEndpoint,
		httpClient: &http.Client{},
	}
}

// CreateVideo はビデオを作成する
func (c *ViewerClient) CreateVideo(req oapi.VideoCreate) (*oapi.Video, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	resp, err := c.httpClient.Post(
		c.endpoint+"/api/v1/videos",
		"application/json",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create video: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusCreated {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to create video: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var video oapi.Video
	if err := json.NewDecoder(resp.Body).Decode(&video); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &video, nil
}
