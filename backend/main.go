// Package main はtvアプリケーションのエントリーポイント
package main

import (
	"log"
	"os"

	"github.com/kijimaD/tv/internal/cmd"
)

func main() {
	app := cmd.NewMainApp()
	err := cmd.RunMainApp(app, os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
