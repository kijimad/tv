// Package clock は時刻取得のインターフェースを提供する
package clock

import "time"

// Clock は現在時刻を取得するインターフェース
type Clock interface {
	Now() time.Time
}

// RealClock は実際の時刻を返す実装
type RealClock struct{}

// Now は現在時刻を返す
func (RealClock) Now() time.Time {
	return time.Now()
}

// MockClock はテスト用の固定時刻を返す実装
type MockClock struct {
	FixedTime time.Time
}

// Now は固定時刻を返す
func (m *MockClock) Now() time.Time {
	return m.FixedTime
}
