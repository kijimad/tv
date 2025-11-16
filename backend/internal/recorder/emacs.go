// Package recorder はポモドーロタイマーと連動した画面録画機能を提供する
package recorder

import (
	"fmt"
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
	out, err := exec.Command("emacsclient", "-e", "(org-pomodoro-active-p)").CombinedOutput()
	if err != nil {
		return false, fmt.Errorf("emacsclient error: %w, output: %s", err, string(out))
	}
	return strings.TrimSpace(string(out)) == "t", nil
}

// GetTitle は現在のorg-modeクロック見出しを返す
func (e *EmacsChecker) GetTitle() (string, error) {
	out, err := exec.Command("emacsclient", "-e", "org-clock-heading").CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("emacsclient error: %w, output: %s", err, string(out))
	}

	result := strings.TrimSpace(string(out))

	// nilの場合(タイマーがオフのとき)は空文字を返す
	if result == "nil" {
		return "", nil
	}

	// Emacsは "#(\"Task Name\")" のような形式で返す
	// 最初のダブルクォートから次のダブルクォートまでを抽出
	start := strings.Index(result, "\"")
	if start == -1 {
		return "", nil
	}
	end := strings.Index(result[start+1:], "\"")
	if end == -1 {
		return "", nil
	}

	return result[start+1 : start+1+end], nil
}
