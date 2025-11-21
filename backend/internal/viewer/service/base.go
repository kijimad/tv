package service

import (
	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
)

// Base は全サービス共通の依存を持つ基底構造体
type Base struct {
	config config.AppConfig
	clock  clock.Clock
}

// NewBase はBaseを作成する
func NewBase(cfg config.AppConfig, clk clock.Clock) Base {
	return Base{
		config: cfg,
		clock:  clk,
	}
}

// GetConfig はAppConfigを返す
func (b *Base) GetConfig() config.AppConfig {
	return b.config
}

// GetClock はClockを返す
func (b *Base) GetClock() clock.Clock {
	return b.clock
}
