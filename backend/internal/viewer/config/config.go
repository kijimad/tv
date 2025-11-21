// Package config はアプリケーション設定を管理する
package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

// AppConfig はアプリケーションの設定を保持する
type AppConfig struct {
	Host            string `env:"TV_HOST" envDefault:"0.0.0.0"`
	Port            int    `env:"TV_PORT" envDefault:"8080"`
	Address         string `env:"TV_ADDRESS,expand" envDefault:"$TV_HOST:$TV_PORT"`
	AppEnv          string `env:"TV_APP_ENV" envDefault:"development"`
	DBDriver        string `env:"TV_DB_DRIVER" envDefault:"postgres"`
	DBConnectionStr string `env:"TV_DATABASE_URL" envDefault:"postgres://root:root@localhost:5432/tv?sslmode=disable"`
	VideoDir        string `env:"TV_VIDEO_DIR" envDefault:"./outputs"`
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
	if cfg.Port <= 0 || cfg.Port > 65535 {
		return fmt.Errorf("invalid port number: %d", cfg.Port)
	}
	if cfg.DBConnectionStr == "" {
		return fmt.Errorf("database connection string is required")
	}
	if cfg.VideoDir == "" {
		return fmt.Errorf("video directory is required")
	}
	return nil
}
