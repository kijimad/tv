package recorder

import (
	"os/exec"
	"syscall"
)

// FFmpegRecorder records screen using ffmpeg script
type FFmpegRecorder struct {
	cmd *exec.Cmd
}

// NewFFmpegRecorder creates a new FFmpegRecorder
func NewFFmpegRecorder() *FFmpegRecorder {
	return &FFmpegRecorder{}
}

// Start begins screen recording
func (f *FFmpegRecorder) Start() error {
	f.cmd = exec.Command("./record_screen.sh")
	f.cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	return f.cmd.Start()
}

// Stop stops screen recording
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
