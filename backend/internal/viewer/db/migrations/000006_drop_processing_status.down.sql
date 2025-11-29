-- processing_status カラムを復元する
ALTER TABLE videos ADD COLUMN processing_status VARCHAR(50) NOT NULL DEFAULT 'ready';
