package recorder

import (
	"os/exec"
	"strings"
)

// EmacsChecker checks if org-pomodoro is active via emacsclient
type EmacsChecker struct{}

// NewEmacsChecker creates a new EmacsChecker
func NewEmacsChecker() *EmacsChecker {
	return &EmacsChecker{}
}

// IsActive returns true if org-pomodoro is currently active
func (e *EmacsChecker) IsActive() (bool, error) {
	out, err := exec.Command("emacsclient", "-e", "(org-pomodoro-active-p)").Output()
	if err != nil {
		return false, err
	}
	return strings.TrimSpace(string(out)) == "t", nil
}
