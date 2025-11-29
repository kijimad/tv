-- sessions関連テーブルを削除する
DROP TABLE IF EXISTS video_sessions;
DROP TABLE IF EXISTS sessions;

-- videosテーブルにprocessing_statusを追加する
ALTER TABLE videos ADD COLUMN processing_status VARCHAR(20) NOT NULL DEFAULT 'ready';

-- finished_atをNULL許可に変更する（録画中は終了時刻がない）
ALTER TABLE videos ALTER COLUMN finished_at DROP NOT NULL;

-- インデックスを追加する
CREATE INDEX idx_videos_processing_status ON videos(processing_status);

-- video_recordings: 録画中の情報を保持する
CREATE TABLE video_recordings (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    temp_file_path VARCHAR(500) NOT NULL,
    recorder_pid INT,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(video_id)
);

-- video_processings: 変換待ち・変換中・失敗の情報を保持する
CREATE TABLE video_processings (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL,
    temp_file_path VARCHAR(500) NOT NULL,
    output_file_path VARCHAR(500) NOT NULL,
    thumbnail_path VARCHAR(500),
    progress INT DEFAULT 0,
    retry_count INT DEFAULT 0,
    last_error TEXT,
    started_at TIMESTAMP,
    ready_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(video_id)
);

CREATE INDEX idx_video_processings_status ON video_processings(status);
CREATE INDEX idx_video_processings_created_at ON video_processings(created_at);

-- video_completions: 完了した動画の情報を保持する
CREATE TABLE video_completions (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    duration_seconds INT NOT NULL,
    thumbnail_path VARCHAR(500),
    video_codec VARCHAR(50),
    audio_codec VARCHAR(50),
    resolution VARCHAR(20),
    ready_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(video_id)
);

-- video_failures: 失敗履歴を保持する
CREATE TABLE video_failures (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    processing_id BIGINT REFERENCES video_processings(id) ON DELETE SET NULL,
    error_message TEXT NOT NULL,
    error_type VARCHAR(50),
    retry_count INT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_video_failures_video_id ON video_failures(video_id);

-- video_archives: アーカイブ済み動画の情報を保持する（ファイルは削除済み）
CREATE TABLE video_archives (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    file_size BIGINT NOT NULL,
    duration_seconds INT NOT NULL,
    video_codec VARCHAR(50),
    audio_codec VARCHAR(50),
    resolution VARCHAR(20),
    archived_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(video_id)
);
