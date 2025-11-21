// Package config はアプリケーション設定を管理する
package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

// AppConfig はアプリケーションの設定を保持する
type AppConfig struct {
	APIEndpoint  string `env:"TV_API_ENDPOINT" envDefault:"http://localhost:8080"`
	PollInterval int    `env:"TV_POLL_INTERVAL" envDefault:"2"`
	OutputDir    string `env:"TV_OUTPUT_DIR" envDefault:"./outputs"`
}

// Load は環境変数から設定を読み込む
func Load() (AppConfig, error) {
	var cfg AppConfig
	if err := env.Parse(&cfg); err != nil {
		return AppConfig{}, fmt.Errorf("failed to parse config: %w", err)
	}

	if err := validate(cfg); err != nil {
		return AppConfig{}, err
	}

	return cfg, nil
}

// validate は設定の妥当性を検証する
func validate(cfg AppConfig) error {
	if cfg.PollInterval <= 0 {
		return fmt.Errorf("invalid poll interval: %d", cfg.PollInterval)
	}
	if cfg.APIEndpoint == "" {
		return fmt.Errorf("API endpoint is required")
	}
	if cfg.OutputDir == "" {
		return fmt.Errorf("output directory is required")
	}
	return nil
}
