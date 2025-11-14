package config

import (
	"fmt"
	"log"

	"github.com/caarlos0/env/v11"
)

// Config はアプリケーションの設定を保持する
var Config struct {
	Host            string `env:"HOST" envDefault:"0.0.0.0"`
	Port            int    `env:"PORT" envDefault:"8080"`
	Address         string `env:"ADDRESS" envDefault:"0.0.0.0:8080"`
	AppEnv          string `env:"APP_ENV" envDefault:"development"`
	DBDriver        string `env:"DB_DRIVER" envDefault:"postgres"`
	DBConnectionStr string `env:"DATABASE_URL" envDefault:"postgres://root:root@localhost:5432/tv?sslmode=disable"`
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
	return nil
}
