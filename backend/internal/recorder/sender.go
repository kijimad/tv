package recorder

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/recorder/config"
)

// HTTPVideoSender はHTTP経由で動画情報をAPIサーバーに送信する
type HTTPVideoSender struct{}

// NewHTTPVideoSender は新しいHTTPVideoSenderを作成する
func NewHTTPVideoSender() *HTTPVideoSender {
	return &HTTPVideoSender{}
}

// Send は動画情報をAPIサーバーに送信する
func (s *HTTPVideoSender) Send(videoCreate oapi.VideoCreate) error {
	if videoCreate.Title == "" {
		return fmt.Errorf("no title recorded")
	}

	if videoCreate.Filename == "" {
		return fmt.Errorf("no filename recorded")
	}

	jsonData, err := json.Marshal(videoCreate)
	if err != nil {
		return fmt.Errorf("failed to marshal video info: %w", err)
	}

	apiURL := fmt.Sprintf("%s/api/v1/videos", config.Config.APIEndpoint)
	resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to send HTTP request: %w", err)
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	log.Printf("Video info sent successfully: %s (%s - %s)", videoCreate.Title, videoCreate.StartedAt.Format(time.RFC3339), videoCreate.FinishedAt.Format(time.RFC3339))
	return nil
}
