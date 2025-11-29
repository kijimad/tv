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

// StopVideo はビデオの録画を停止する（recording → pending）
func (c *ViewerClient) StopVideo(id int64, _ oapi.VideoStopRequest) (*oapi.Video, error) {
	// 新しいAPIでは /stop エンドポイントはリクエストボディを受け取らない
	httpReq, err := http.NewRequest(
		http.MethodPost,
		fmt.Sprintf("%s/api/v1/videos/%d/stop", c.endpoint, id),
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to stop video: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to stop video: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var video oapi.Video
	if err := json.NewDecoder(resp.Body).Decode(&video); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &video, nil
}

// ProcessVideo は変換を開始する（pending → processing）
func (c *ViewerClient) ProcessVideo(id int64) (*oapi.Video, error) {
	httpReq, err := http.NewRequest(
		http.MethodPost,
		fmt.Sprintf("%s/api/v1/videos/%d/process", c.endpoint, id),
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to process video: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to process video: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var video oapi.Video
	if err := json.NewDecoder(resp.Body).Decode(&video); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &video, nil
}

// CompleteVideo は変換を完了する（processing → ready）
func (c *ViewerClient) CompleteVideo(id int64) (*oapi.Video, error) {
	httpReq, err := http.NewRequest(
		http.MethodPost,
		fmt.Sprintf("%s/api/v1/videos/%d/complete", c.endpoint, id),
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to complete video: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to complete video: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var video oapi.Video
	if err := json.NewDecoder(resp.Body).Decode(&video); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &video, nil
}

// FailVideo は変換失敗を記録する（processing → failed）
func (c *ViewerClient) FailVideo(id int64) (*oapi.Video, error) {
	httpReq, err := http.NewRequest(
		http.MethodPost,
		fmt.Sprintf("%s/api/v1/videos/%d/fail", c.endpoint, id),
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to fail video: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to fail video: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var video oapi.Video
	if err := json.NewDecoder(resp.Body).Decode(&video); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &video, nil
}
