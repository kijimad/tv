-- name: CreateVideoSession :one
INSERT INTO video_sessions (video_id, session_id)
VALUES ($1, $2)
RETURNING *;
