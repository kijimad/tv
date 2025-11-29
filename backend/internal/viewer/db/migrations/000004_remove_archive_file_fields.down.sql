-- video_archivesテーブルにファイル関連のフィールドを追加する
ALTER TABLE video_archives ADD COLUMN file_size BIGINT NOT NULL DEFAULT 0;
ALTER TABLE video_archives ADD COLUMN duration_seconds INT NOT NULL DEFAULT 0;
ALTER TABLE video_archives ADD COLUMN video_codec VARCHAR(50);
ALTER TABLE video_archives ADD COLUMN audio_codec VARCHAR(50);
ALTER TABLE video_archives ADD COLUMN resolution VARCHAR(20);
