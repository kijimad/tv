package service

import "errors"

var (
	// ErrInvalidTimeRange は時刻の範囲が不正なエラー
	ErrInvalidTimeRange = errors.New("started_at must be before finished_at")
	// ErrInvalidStateTransition は不正な状態遷移のエラー
	ErrInvalidStateTransition = errors.New("invalid state transition")
)
