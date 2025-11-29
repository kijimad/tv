package cmd

import (
	"context"
	"fmt"
	"log"
	"net/http"
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
	cfg, err := recorderConfig.Load()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

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
	viewerClient := recorder.NewViewerClient(cfg)
	processor := recorder.NewVideoProcessor(cfg, viewerClient)
	ffmpegRecorder := recorder.NewFFmpegRecorder(cfg)
	monitor := recorder.NewMonitor(ffmpegRecorder, emacsStatusProvider, viewerClient, processor)

	// HTTPステータスサーバーを起動する
	statusHandler := recorder.NewStatusHandler(monitor.Session())
	mux := http.NewServeMux()
	mux.HandleFunc("/status", statusHandler.GetRecordingStatus)

	statusServer := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.StatusPort),
		Handler: mux,
	}

	go func() {
		log.Printf("Starting status server on port %d", cfg.StatusPort)
		if err := statusServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Printf("Status server error: %v", err)
		}
	}()

	defer func() {
		shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer shutdownCancel()
		if err := statusServer.Shutdown(shutdownCtx); err != nil {
			log.Printf("Status server shutdown error: %v", err)
		}
	}()

	states := make(chan bool)
	pollInterval := time.Duration(cfg.PollInterval) * time.Second
	go recorder.PollChecker(ctx, emacsStatusProvider, pollInterval, states)

	monitor.Run(ctx, states)
	log.Println("Shutdown complete")

	return nil
}
