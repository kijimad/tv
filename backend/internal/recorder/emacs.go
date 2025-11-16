// Package recorder はポモドーロタイマーと連動した画面録画機能を提供する
package recorder

import (
	"os/exec"
	"strings"
)

// EmacsChecker はemacsclient経由でEmacsから情報を取得する
type EmacsChecker struct{}

// NewEmacsChecker は新しいEmacsCheckerを作成する
func NewEmacsChecker() *EmacsChecker {
	return &EmacsChecker{}
}

// IsActive はorg-pomodoroが現在アクティブな場合trueを返す
func (e *EmacsChecker) IsActive() (bool, error) {
	out, err := exec.Command("emacsclient", "-e", "(org-pomodoro-active-p)").Output()
	if err != nil {
		return false, err
	}
	return strings.TrimSpace(string(out)) == "t", nil
}

// GetTitle は現在のorg-modeクロック見出しを返す
func (e *EmacsChecker) GetTitle() (string, error) {
	out, err := exec.Command("emacsclient", "-e", "(org-clock-heading)").Output()
	if err != nil {
		return "", err
	}
	// Emacsは "\"Task Name\"" のような引用符付き文字列を返す
	result := strings.TrimSpace(string(out))
	// 外側の引用符を削除
	result = strings.Trim(result, "\"")
	return result, nil
}
