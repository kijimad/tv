-- name: GetVideo :one
SELECT * FROM videos
WHERE id = $1 LIMIT 1;

-- name: GetVideoByFilename :one
SELECT * FROM videos
WHERE filename = $1 LIMIT 1;

-- name: ListVideos :many
SELECT * FROM videos
ORDER BY started_at DESC;

-- name: CreateVideo :one
INSERT INTO videos (
    started_at, finished_at, title, filename
) VALUES (
    $1, $2, $3, $4
)
RETURNING *;

-- name: UpdateVideo :one
UPDATE videos
SET
    started_at = $1,
    finished_at = $2,
    title = $3,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $4
RETURNING *;

-- name: DeleteVideo :exec
DELETE FROM videos
WHERE id = $1;
