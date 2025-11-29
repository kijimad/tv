package recorder

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/kijimaD/tv/internal/recorder/config"
)

// CompletionCallback は処理完了時に呼び出されるコールバック
type CompletionCallback func(success bool)

// VideoProcessor は動画の後処理を管理する
type VideoProcessor struct {
	config config.AppConfig
	jobs   chan ProcessingJob
}

// ProcessingJob は処理中のジョブ情報
type ProcessingJob struct {
	VideoID  int64
	Filename string
	Callback CompletionCallback
}

// NewVideoProcessor は新しいVideoProcessorを作成する
func NewVideoProcessor(cfg config.AppConfig) VideoProcessor {
	p := VideoProcessor{
		config: cfg,
		jobs:   make(chan ProcessingJob, 100),
	}
	go p.worker()
	return p
}

// Process は動画の後処理を開始する
func (p VideoProcessor) Process(videoID int64, filename string, callback CompletionCallback) {
	p.jobs <- ProcessingJob{
		VideoID:  videoID,
		Filename: filename,
		Callback: callback,
	}
}

// worker はジョブキューを処理する
func (p VideoProcessor) worker() {
	for job := range p.jobs {
		success := p.processVideo(job.VideoID, job.Filename)
		if job.Callback != nil {
			job.Callback(success)
		}
	}
}

// processVideo は動画の変換処理を実行する
func (p VideoProcessor) processVideo(videoID int64, filename string) bool {
	outputPath := filepath.Join(p.config.OutputDir, filename)
	tempPath := strings.TrimSuffix(outputPath, ".webm") + ".temp.mp4"

	log.Printf("Starting post-processing for video %d: %s", videoID, filename)

	// サムネイルを生成する
	thumbnailPath := strings.TrimSuffix(outputPath, ".webm") + ".jpg"
	if err := p.generateThumbnail(tempPath, thumbnailPath); err != nil {
		log.Printf("Failed to generate thumbnail for video %d: %v", videoID, err)
		// サムネイル生成に失敗しても続行する
	}

	// WebMに変換する
	if err := p.convertToWebM(tempPath, outputPath); err != nil {
		log.Printf("Failed to convert video %d to WebM: %v", videoID, err)
		return false
	}

	// 一時ファイルを削除する
	if err := os.Remove(tempPath); err != nil {
		log.Printf("Failed to remove temp file for video %d: %v", videoID, err)
	}

	log.Printf("Post-processing completed for video %d: %s", videoID, filename)
	return true
}

// convertToWebM はMP4ファイルをWebMに変換する
func (p VideoProcessor) convertToWebM(inputPath, outputPath string) error {
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
func (p VideoProcessor) generateThumbnail(inputPath, outputPath string) error {
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
