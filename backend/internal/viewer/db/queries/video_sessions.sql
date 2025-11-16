-- name: CreateVideoSession :one
INSERT INTO video_sessions (video_id, session_id)
VALUES ($1, $2)
RETURNING *;

-- name: GetVideoSessionByVideoID :one
SELECT * FROM video_sessions
WHERE video_id = $1
LIMIT 1;

-- name: GetVideoSessionBySessionID :one
SELECT * FROM video_sessions
WHERE session_id = $1
LIMIT 1;

-- name: DeleteVideoSession :exec
DELETE FROM video_sessions
WHERE id = $1;
