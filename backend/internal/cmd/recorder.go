package cmd

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/kijimaD/tv/internal/recorder"
	recorderConfig "github.com/kijimaD/tv/internal/recorder/config"
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

	emacsStatusProvider := recorder.NewEmacsStatusProvider()
	ffmpegRecorder := recorder.NewFFmpegRecorder()
	viewerClient := recorder.NewViewerClient(recorderConfig.Config.APIEndpoint)
	monitor := recorder.NewMonitor(ffmpegRecorder, emacsStatusProvider, viewerClient)

	states := make(chan bool)
	pollInterval := time.Duration(recorderConfig.Config.PollInterval) * time.Second
	go recorder.PollChecker(ctx, emacsStatusProvider, pollInterval, states)

	monitor.Run(ctx, states)
	log.Println("Shutdown complete")

	return nil
}
