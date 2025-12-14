-- filenameをNOT NULLに戻す（NULLの行がある場合は失敗する）
ALTER TABLE videos ALTER COLUMN filename SET NOT NULL;
