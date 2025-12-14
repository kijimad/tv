-- filenameをNULLABLEにして、削除されたビデオを表現できるようにする
ALTER TABLE videos ALTER COLUMN filename DROP NOT NULL;
