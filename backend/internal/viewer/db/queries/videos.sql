-- name: GetVideo :one
SELECT * FROM videos
WHERE id = $1 LIMIT 1;

-- name: ListVideos :many
SELECT * FROM videos
WHERE
    (sqlc.narg('started_at_from')::timestamp IS NULL OR started_at >= sqlc.narg('started_at_from')::timestamp)
    AND (sqlc.narg('started_at_to')::timestamp IS NULL OR started_at <= sqlc.narg('started_at_to')::timestamp)
ORDER BY started_at DESC
LIMIT sqlc.arg('limit') OFFSET sqlc.arg('offset');

-- name: CountVideos :one
SELECT COUNT(*) FROM videos
WHERE
    (sqlc.narg('started_at_from')::timestamp IS NULL OR started_at >= sqlc.narg('started_at_from')::timestamp)
    AND (sqlc.narg('started_at_to')::timestamp IS NULL OR started_at <= sqlc.narg('started_at_to')::timestamp);

-- name: CreateVideo :one
INSERT INTO videos (
    title, filename, started_at, finished_at, audio_activity_ratio
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING *;

-- name: UpdateVideo :one
UPDATE videos
SET
    title = COALESCE(sqlc.narg('title'), title),
    filename = COALESCE(sqlc.narg('filename'), filename),
    started_at = COALESCE(sqlc.narg('started_at'), started_at),
    finished_at = COALESCE(sqlc.narg('finished_at'), finished_at),
    audio_activity_ratio = COALESCE(sqlc.narg('audio_activity_ratio'), audio_activity_ratio),
    updated_at = CURRENT_TIMESTAMP
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteVideo :exec
DELETE FROM videos
WHERE id = $1;

-- name: ListVideosOlderThan :many
SELECT * FROM videos
WHERE started_at < $1
ORDER BY started_at ASC;
