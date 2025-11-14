package cmd

import (
	"context"

	"github.com/urfave/cli/v3"
)

// NewMainApp creates the main CLI application
func NewMainApp() *cli.Command {
	app := &cli.Command{
		Name:        "tv",
		Usage:       "tv [subcommand] [args]",
		Description: "Pomodoro recorder and video viewer",
		Version:     "0.1.0",
		Commands: []*cli.Command{
			CmdRecorder,
			CmdViewer,
			CmdMigrate,
		},
	}

	return app
}

// RunMainApp runs the CLI application
func RunMainApp(app *cli.Command, args []string) error {
	return app.Run(context.Background(), args)
}
