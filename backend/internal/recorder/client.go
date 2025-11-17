package recorder

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/kijimaD/tv/internal/oapi"
)

// ViewerClient はViewerサービスのAPIクライアント
type ViewerClient struct {
	endpoint   string
	httpClient *http.Client
}

// NewViewerClient は新しいViewerClientを作成する
func NewViewerClient(endpoint string) *ViewerClient {
	return &ViewerClient{
		endpoint:   endpoint,
		httpClient: &http.Client{},
	}
}

// CreateSession はセッションを作成する
func (c *ViewerClient) CreateSession(req oapi.SessionCreate) (*oapi.Session, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	resp, err := c.httpClient.Post(
		c.endpoint+"/api/v1/sessions",
		"application/json",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create session: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusCreated {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to create session: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var session oapi.Session
	if err := json.NewDecoder(resp.Body).Decode(&session); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &session, nil
}

// UpdateSessionStatus はセッションのステータスを更新する
func (c *ViewerClient) UpdateSessionStatus(id int64, req oapi.SessionUpdate) (*oapi.Session, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	httpReq, err := http.NewRequest(
		http.MethodPatch,
		fmt.Sprintf("%s/api/v1/sessions/%d", c.endpoint, id),
		bytes.NewBuffer(body),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to update session: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to update session: status=%d body=%s", resp.StatusCode, string(bodyBytes))
	}

	var session oapi.Session
	if err := json.NewDecoder(resp.Body).Decode(&session); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &session, nil
}
