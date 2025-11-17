// Package config はアプリケーション設定を管理する
package config

import (
	"fmt"
	"log"

	"github.com/caarlos0/env/v11"
)

// Config はアプリケーションの設定を保持する
var Config struct {
	APIEndpoint  string `env:"TV_API_ENDPOINT" envDefault:"http://localhost:8080"`
	PollInterval int    `env:"TV_POLL_INTERVAL" envDefault:"2"`
	OutputDir    string `env:"TV_OUTPUT_DIR" envDefault:"./outputs"`
}

func init() {
	if err := env.Parse(&Config); err != nil {
		log.Fatal(err)
	}

	if err := validate(); err != nil {
		log.Fatal(err)
	}
}

// validate は設定の妥当性を検証する
func validate() error {
	if Config.PollInterval <= 0 {
		return fmt.Errorf("invalid poll interval: %d", Config.PollInterval)
	}
	if Config.APIEndpoint == "" {
		return fmt.Errorf("API endpoint is required")
	}
	if Config.OutputDir == "" {
		return fmt.Errorf("output directory is required")
	}
	return nil
}
