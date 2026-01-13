-- name: GetPeriodStatistics :many
SELECT
  title,
  SUM(EXTRACT(EPOCH FROM (finished_at - started_at)))::bigint as duration
FROM videos
WHERE
  (sqlc.narg('period_start')::timestamp IS NULL OR started_at >= sqlc.narg('period_start')::timestamp)
  AND (sqlc.narg('period_end')::timestamp IS NULL OR started_at < sqlc.narg('period_end')::timestamp)
GROUP BY title
ORDER BY duration DESC
LIMIT sqlc.arg(limit_count);
