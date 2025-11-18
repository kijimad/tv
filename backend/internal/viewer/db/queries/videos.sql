-- name: GetVideo :one
SELECT * FROM videos
WHERE id = $1 LIMIT 1;

-- name: ListVideos :many
SELECT * FROM videos
ORDER BY started_at DESC
LIMIT $1 OFFSET $2;

-- name: CountVideos :one
SELECT COUNT(*) FROM videos;

-- name: CreateVideo :one
INSERT INTO videos (
    started_at, finished_at, title, filename
) VALUES (
    $1, $2, $3, $4
)
RETURNING *;

-- name: CreateVideoFromSession :one
INSERT INTO videos (filename, title, started_at, finished_at)
SELECT filename, title, started_at, COALESCE(finished_at, NOW())
FROM sessions
WHERE sessions.id = $1
  AND finished_at IS NOT NULL
RETURNING *;

-- name: UpdateVideo :one
UPDATE videos
SET
    title = COALESCE(sqlc.narg('title'), title),
    filename = COALESCE(sqlc.narg('filename'), filename),
    started_at = COALESCE(sqlc.narg('started_at'), started_at),
    finished_at = COALESCE(sqlc.narg('finished_at'), finished_at),
    updated_at = CURRENT_TIMESTAMP
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteVideo :exec
DELETE FROM videos
WHERE id = $1;
