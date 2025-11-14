package cmd

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/kijimaD/tv/internal/recorder"
	"github.com/urfave/cli/v3"
)

// CmdRecorder is the recorder subcommand
var CmdRecorder = &cli.Command{
	Name:  "recorder",
	Usage: "Start the pomodoro recorder job server",
	Action: func(ctx context.Context, _ *cli.Command) error {
		return runRecorder(ctx)
	},
}

func runRecorder(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		sig := <-sigChan
		log.Printf("Received signal: %v, shutting down...", sig)
		cancel()
	}()

	ffmpegRecorder := recorder.NewFFmpegRecorder()
	monitor := recorder.NewMonitor(ffmpegRecorder)

	states := make(chan bool)
	checker := recorder.NewEmacsChecker()
	go recorder.PollChecker(ctx, checker, 2*time.Second, states)

	monitor.Run(ctx, states)
	log.Println("Shutdown complete")

	return nil
}
