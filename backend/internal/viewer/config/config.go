// Package config はアプリケーション設定を管理する
package config

import (
	"fmt"
	"log"

	"github.com/caarlos0/env/v11"
)

// Config はアプリケーションの設定を保持する
var Config struct {
	Host            string `env:"TV_HOST" envDefault:"0.0.0.0"`
	Port            int    `env:"TV_PORT" envDefault:"8080"`
	Address         string `env:"TV_ADDRESS,expand" envDefault:"$TV_HOST:$TV_PORT"`
	AppEnv          string `env:"TV_APP_ENV" envDefault:"development"`
	DBDriver        string `env:"TV_DB_DRIVER" envDefault:"postgres"`
	DBConnectionStr string `env:"TV_DATABASE_URL" envDefault:"postgres://root:root@localhost:5432/tv?sslmode=disable"`
	VideoDir        string `env:"TV_VIDEO_DIR" envDefault:"./outputs"`
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
	if Config.Port <= 0 || Config.Port > 65535 {
		return fmt.Errorf("invalid port number: %d", Config.Port)
	}
	if Config.DBConnectionStr == "" {
		return fmt.Errorf("database connection string is required")
	}
	if Config.VideoDir == "" {
		return fmt.Errorf("video directory is required")
	}
	return nil
}
