package cmd

import (
	"context"
	"fmt"
	"log"
	"path/filepath"

	"github.com/kijimaD/tv/internal/recorder"
	"github.com/urfave/cli/v3"
)

// CmdAnalyzeAudio is the analyze-audio subcommand
var CmdAnalyzeAudio = &cli.Command{
	Name:  "analyze-audio",
	Usage: "Analyze audio activity ratio of video files",
	Action: func(_ context.Context, cmd *cli.Command) error {
		args := cmd.Args()
		if args.Len() == 0 {
			return fmt.Errorf("video file path required")
		}

		analyzer := recorder.NewAudioAnalyzer()

		for i := 0; i < args.Len(); i++ {
			videoPath := args.Get(i)
			absPath, err := filepath.Abs(videoPath)
			if err != nil {
				log.Printf("Failed to get absolute path for %s: %v", videoPath, err)
				continue
			}

			fmt.Printf("\n=== Analyzing: %s ===\n", filepath.Base(absPath))

			result, err := analyzer.Analyze(absPath)
			if err != nil {
				log.Printf("Failed to analyze %s: %v", videoPath, err)
				continue
			}

			fmt.Printf("Total Frames:      %d\n", result.TotalFrames)
			fmt.Printf("Active Frames:     %d\n", result.ActiveFrames)
			fmt.Printf("Threshold (P25):   %.2f dB\n", result.ChangeRate)
			fmt.Printf("Activity Ratio:    %.2f%%\n", result.ActivityRatio)
		}

		return nil
	},
}
