-- name: GetVideo :one
SELECT * FROM videos
WHERE id = ? LIMIT 1;

-- name: GetVideoByFilename :one
SELECT * FROM videos
WHERE filename = ? LIMIT 1;

-- name: ListVideos :many
SELECT * FROM videos
ORDER BY started_at DESC;

-- name: CreateVideo :one
INSERT INTO videos (
    started_at, finished_at, title, filename
) VALUES (
    ?, ?, ?, ?
)
RETURNING *;

-- name: UpdateVideo :one
UPDATE videos
SET
    started_at = ?,
    finished_at = ?,
    title = ?,
    updated_at = CURRENT_TIMESTAMP
WHERE id = ?
RETURNING *;

-- name: DeleteVideo :exec
DELETE FROM videos
WHERE id = ?;
