-- 子テーブルを削除する
DROP TABLE IF EXISTS video_archives;
DROP TABLE IF EXISTS video_failures;
DROP TABLE IF EXISTS video_completions;
DROP TABLE IF EXISTS video_processings;
DROP TABLE IF EXISTS video_recordings;

-- インデックスを削除する
DROP INDEX IF EXISTS idx_videos_processing_status;

-- videosテーブルからprocessing_statusを削除する
ALTER TABLE videos DROP COLUMN IF EXISTS processing_status;

-- finished_atをNOT NULLに戻す
ALTER TABLE videos ALTER COLUMN finished_at SET NOT NULL;

-- sessions関連テーブルを復元する
CREATE TABLE sessions (
    id BIGSERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'recording',
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE video_sessions (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    session_id BIGINT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(video_id, session_id)
);

CREATE INDEX idx_video_sessions_video_id ON video_sessions(video_id);
CREATE INDEX idx_video_sessions_session_id ON video_sessions(session_id);
