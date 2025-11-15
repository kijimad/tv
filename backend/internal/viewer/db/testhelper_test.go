package db

import (
	"context"
	"testing"

	"github.com/kijimaD/tv/internal/viewer/db/factory"
	dbgen "github.com/kijimaD/tv/internal/viewer/db/gen"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSetupTestDB(t *testing.T) {
	t.Parallel()
	t.Run("異なるインスタンスを得られる", func(t *testing.T) {
		t.Parallel()
		queries1, cleanup1 := SetupTestDB(t)
		defer cleanup1()

		queries2, cleanup2 := SetupTestDB(t)
		defer cleanup2()

		// 両方のqueriesが取得できることを確認
		require.NotNil(t, queries1)
		require.NotNil(t, queries2)

		// 異なるインスタンスであることを確認
		assert.NotEqual(t, queries1, queries2)
	})

	t.Run("テーブル構造が正しくコピーされる", func(t *testing.T) {
		t.Parallel()
		queries, cleanup := SetupTestDB(t)
		defer cleanup()

		// テーブルが存在することを確認するため、簡単なクエリを実行
		ctx := context.Background()
		videos, err := queries.ListVideos(ctx, dbgen.ListVideosParams{
			Limit:  10,
			Offset: 0,
		})
		require.NoError(t, err, "ListVideosクエリが失敗しました")
		assert.Empty(t, videos, "初期状態では動画が存在しないはず")
	})

	t.Run("スキーマが独立している", func(t *testing.T) {
		t.Run("parallel1", func(t *testing.T) {
			t.Parallel()
			queries, cleanup := SetupTestDB(t)
			defer cleanup()

			ctx := context.Background()
			// 1件作成
			params := factory.NewVideo().Build()
			_, err := queries.CreateVideo(ctx, params)
			require.NoError(t, err)

			// 1件のみ取得できるはず
			videos, err := queries.ListVideos(ctx, dbgen.ListVideosParams{
				Limit:  10,
				Offset: 0,
			})
			require.NoError(t, err)
			assert.Len(t, videos, 1)
		})

		t.Run("parallel2", func(t *testing.T) {
			t.Parallel()
			queries, cleanup := SetupTestDB(t)
			defer cleanup()

			ctx := context.Background()
			// 2件作成
			params1 := factory.NewVideo().Build()
			_, err := queries.CreateVideo(ctx, params1)
			require.NoError(t, err)
			params2 := factory.NewVideo().Build()
			_, err = queries.CreateVideo(ctx, params2)
			require.NoError(t, err)

			// 2件取得できるはず
			videos, err := queries.ListVideos(ctx, dbgen.ListVideosParams{
				Limit:  10,
				Offset: 0,
			})
			require.NoError(t, err)
			assert.Len(t, videos, 2)
		})
	})

	t.Run("cleanup実行後はDB接続がクローズされる", func(t *testing.T) {
		t.Parallel()
		queries, cleanup := SetupTestDB(t)

		// クローズ前はクエリが正常に実行できる
		ctx := context.Background()
		videos, err := queries.ListVideos(ctx, dbgen.ListVideosParams{
			Limit:  10,
			Offset: 0,
		})
		require.NoError(t, err)
		assert.Empty(t, videos)

		// cleanupを実行
		cleanup()

		// cleanup後はDB接続がクローズされているため、クエリは失敗するはず
		_, err = queries.ListVideos(ctx, dbgen.ListVideosParams{
			Limit:  10,
			Offset: 0,
		})
		assert.Error(t, err, "cleanup後はクエリが失敗するはず")
	})
}
