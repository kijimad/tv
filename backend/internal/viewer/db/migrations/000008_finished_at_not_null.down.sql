-- finished_at を NULL 許可に戻す
ALTER TABLE videos ALTER COLUMN finished_at DROP NOT NULL;
