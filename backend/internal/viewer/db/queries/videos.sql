-- name: GetVideo :one
SELECT * FROM videos
WHERE id = $1 LIMIT 1;

-- name: ListVideos :many
SELECT * FROM videos
ORDER BY started_at DESC
LIMIT $1 OFFSET $2;

-- name: ListVideosByStatus :many
SELECT * FROM videos
WHERE processing_status = $1
ORDER BY started_at DESC
LIMIT $2 OFFSET $3;

-- name: CountVideos :one
SELECT COUNT(*) FROM videos;

-- name: CountVideosByStatus :one
SELECT COUNT(*) FROM videos
WHERE processing_status = $1;

-- name: CreateVideo :one
INSERT INTO videos (
    title, filename, started_at, processing_status
) VALUES (
    $1, $2, $3, $4
)
RETURNING *;

-- name: UpdateVideo :one
UPDATE videos
SET
    title = COALESCE(sqlc.narg('title'), title),
    filename = COALESCE(sqlc.narg('filename'), filename),
    started_at = COALESCE(sqlc.narg('started_at'), started_at),
    finished_at = COALESCE(sqlc.narg('finished_at'), finished_at),
    processing_status = COALESCE(sqlc.narg('processing_status'), processing_status),
    updated_at = CURRENT_TIMESTAMP
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: UpdateVideoStatus :one
UPDATE videos
SET
    processing_status = $2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: UpdateVideoStatusWithFinishedAt :one
UPDATE videos
SET
    processing_status = $2,
    finished_at = $3,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteVideo :exec
DELETE FROM videos
WHERE id = $1;

-- name: GetRecordingVideo :one
SELECT * FROM videos
WHERE processing_status = 'recording'
LIMIT 1;
