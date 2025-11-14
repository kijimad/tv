package cmd

import (
	"context"

	"github.com/urfave/cli/v3"
)

// CmdViewer is the viewer subcommand
var CmdViewer = &cli.Command{
	Name:  "viewer",
	Usage: "Start the video viewer backend server",
	Action: func(ctx context.Context, cmd *cli.Command) error {
		return nil
	},
}
