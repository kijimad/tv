package recorder

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/recorder/config"
)

// VideoProcessor は動画の後処理を管理する
type VideoProcessor struct {
	config config.AppConfig
	client VideoClient
}

// NewVideoProcessor は新しいVideoProcessorを作成する
func NewVideoProcessor(cfg config.AppConfig, client VideoClient) *VideoProcessor {
	return &VideoProcessor{
		config: cfg,
		client: client,
	}
}

// processVideo は動画の変換処理を実行し、完了後にビデオを作成する
func (p *VideoProcessor) processVideo(filename, title string, startedAt, finishedAt time.Time) bool {
	outputPath := filepath.Join(p.config.OutputDir, filename)
	tempPath := strings.TrimSuffix(outputPath, ".webm") + ".temp.mp4"

	log.Printf("Starting post-processing for: %s", filename)

	// サムネイルを生成する
	thumbnailPath := strings.TrimSuffix(outputPath, ".webm") + ".jpg"
	if err := p.generateThumbnail(tempPath, thumbnailPath); err != nil {
		log.Printf("Failed to generate thumbnail for %s: %v", filename, err)
		// サムネイル生成に失敗しても続行する
	}

	// WebMに変換する
	if err := p.convertToWebM(tempPath, outputPath); err != nil {
		log.Printf("Failed to convert %s to WebM: %v", filename, err)
		return false
	}

	// 一時ファイルを削除する
	if err := os.Remove(tempPath); err != nil {
		log.Printf("Failed to remove temp file for %s: %v", filename, err)
	}

	// ビデオを作成する
	video, err := p.client.CreateVideo(oapi.VideoCreate{
		Filename:   filename,
		Title:      title,
		StartedAt:  startedAt,
		FinishedAt: finishedAt,
	})
	if err != nil {
		log.Printf("Failed to create video for %s: %v", filename, err)
		return false
	}

	log.Printf("Post-processing completed (video %d): %s", *video.Id, filename)
	return true
}

// convertToWebM はMP4ファイルをWebMに変換する
func (p *VideoProcessor) convertToWebM(inputPath, outputPath string) error {
	scriptPath := "./convert_to_webm.sh"
	if !filepath.IsAbs(scriptPath) {
		if absPath, err := filepath.Abs(scriptPath); err == nil {
			scriptPath = absPath
		}
	}

	cmd := exec.Command(scriptPath, inputPath, outputPath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	log.Printf("Converting to WebM: %s -> %s", inputPath, outputPath)
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("conversion failed: %w", err)
	}

	return nil
}

// generateThumbnail は動画からサムネイルを生成する
func (p *VideoProcessor) generateThumbnail(inputPath, outputPath string) error {
	scriptPath := "./generate_thumbnail.sh"
	if !filepath.IsAbs(scriptPath) {
		if absPath, err := filepath.Abs(scriptPath); err == nil {
			scriptPath = absPath
		}
	}

	cmd := exec.Command(scriptPath, inputPath, outputPath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	log.Printf("Generating thumbnail: %s -> %s", inputPath, outputPath)
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("thumbnail generation failed: %w", err)
	}

	return nil
}
