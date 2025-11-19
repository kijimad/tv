package recorder

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"

	"github.com/kijimaD/tv/internal/recorder/config"
)

// FFmpegRecorder はffmpegスクリプトを使用して画面録画を行う
type FFmpegRecorder struct {
	cmd      *exec.Cmd
	filename string
}

// NewFFmpegRecorder は新しいFFmpegRecorderを作成する
func NewFFmpegRecorder() *FFmpegRecorder {
	return &FFmpegRecorder{}
}

// Start は画面録画を開始する
func (f *FFmpegRecorder) Start(filename string) error {
	f.filename = filename
	outputPath := filepath.Join(config.Config.OutputDir, filename)

	scriptPath := "./record_screen.sh"
	// 相対パスの場合は絶対パスに変換
	if !filepath.IsAbs(scriptPath) {
		if absPath, err := filepath.Abs(scriptPath); err == nil {
			scriptPath = absPath
		}
	}
	f.cmd = exec.Command(scriptPath, outputPath)
	f.cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}

	// 標準出力と標準エラー出力をログに出力する
	f.cmd.Stdout = os.Stdout
	f.cmd.Stderr = os.Stderr

	log.Printf("Starting recording script: %s %s", scriptPath, outputPath)
	return f.cmd.Start()
}

// Stop は画面録画を停止する
func (f *FFmpegRecorder) Stop() error {
	if f.cmd != nil && f.cmd.Process != nil {
		pgid, err := syscall.Getpgid(f.cmd.Process.Pid)
		if err != nil {
			return err
		}
		// SIGINTを送信して録画を正常終了させる（ffmpegの終了処理が走る）
		log.Printf("Sending SIGINT to process group %d for graceful shutdown", pgid)
		if err := syscall.Kill(-pgid, syscall.SIGINT); err != nil {
			return err
		}

		// 録画プロセスの終了を待つ
		if err := f.cmd.Wait(); err != nil {
			// exit status 255 はffmpegの正常なSIGINT終了
			log.Printf("Recording process exited: %v", err)
		}

		// 後処理をgoroutineで実行する
		go f.postProcess()
	}
	return nil
}

// postProcess は録画後の処理を実行する
func (f *FFmpegRecorder) postProcess() {
	outputPath := filepath.Join(config.Config.OutputDir, f.filename)
	tempPath := strings.TrimSuffix(outputPath, ".webm") + ".temp.mp4"

	log.Printf("Starting post-processing for %s", f.filename)

	// サムネイルを生成する
	thumbnailPath := strings.TrimSuffix(outputPath, ".webm") + ".jpg"
	if err := f.generateThumbnail(tempPath, thumbnailPath); err != nil {
		log.Printf("Failed to generate thumbnail: %v", err)
		// サムネイル生成に失敗しても続行する
	}

	// WebMに変換する
	if err := f.convertToWebM(tempPath, outputPath); err != nil {
		log.Printf("Failed to convert to WebM: %v", err)
		return
	}

	// 一時ファイルを削除する
	if err := os.Remove(tempPath); err != nil {
		log.Printf("Failed to remove temp file: %v", err)
	}

	log.Printf("Post-processing completed for %s", f.filename)
}

// convertToWebM はMP4ファイルをWebMに変換する
func (f *FFmpegRecorder) convertToWebM(inputPath, outputPath string) error {
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
func (f *FFmpegRecorder) generateThumbnail(inputPath, outputPath string) error {
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
