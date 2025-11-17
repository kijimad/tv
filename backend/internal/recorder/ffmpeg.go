package recorder

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"syscall"

	"github.com/kijimaD/tv/internal/recorder/config"
)

// FFmpegRecorder はffmpegスクリプトを使用して画面録画を行う
type FFmpegRecorder struct {
	cmd *exec.Cmd
}

// NewFFmpegRecorder は新しいFFmpegRecorderを作成する
func NewFFmpegRecorder() *FFmpegRecorder {
	return &FFmpegRecorder{}
}

// Start は画面録画を開始する
func (f *FFmpegRecorder) Start(filename string) error {
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
		return syscall.Kill(-pgid, syscall.SIGTERM)
	}
	return nil
}
