package recorder

// Checker checks if pomodoro is active
type Checker interface {
	IsActive() (bool, error)
}

// Recorder manages screen recording
type Recorder interface {
	Start() error
	Stop() error
}
