-- video_archivesテーブルからファイル関連のフィールドを削除する
ALTER TABLE video_archives DROP COLUMN file_size;
ALTER TABLE video_archives DROP COLUMN duration_seconds;
ALTER TABLE video_archives DROP COLUMN video_codec;
ALTER TABLE video_archives DROP COLUMN audio_codec;
ALTER TABLE video_archives DROP COLUMN resolution;
