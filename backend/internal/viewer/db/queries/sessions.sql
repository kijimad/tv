-- name: CreateSession :one
INSERT INTO sessions (filename, title)
VALUES ($1, $2)
RETURNING *;

-- name: UpdateSessionStatus :one
UPDATE sessions
SET status = $2,
    finished_at = CASE WHEN $2::VARCHAR = 'completed' OR $2::VARCHAR = 'failed' THEN NOW() ELSE finished_at END,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: GetCurrentRecordingSession :one
SELECT * FROM sessions
WHERE status = 'recording'
ORDER BY started_at DESC
LIMIT 1;
