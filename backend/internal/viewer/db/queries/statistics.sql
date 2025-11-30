-- name: GetPeriodStatistics :many
SELECT
  title,
  SUM(EXTRACT(EPOCH FROM (finished_at - started_at)))::bigint as duration
FROM videos
WHERE started_at >= sqlc.arg(period_start) AND started_at < sqlc.arg(period_end)
GROUP BY title
ORDER BY duration DESC;
