package handler_test

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/oapi"
	"github.com/kijimaD/tv/internal/viewer/clock"
	"github.com/kijimaD/tv/internal/viewer/config"
	"github.com/kijimaD/tv/internal/viewer/db"
	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
	"github.com/kijimaD/tv/internal/viewer/handler"
	"github.com/kijimaD/tv/internal/viewer/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupVideoHandler(t *testing.T) (*handler.VideoHandler, *sqlc.Queries, func()) {
	t.Helper()
	testDB, cleanup := db.SetupTestDB(t)
	queries := sqlc.New(testDB)
	cfg := config.AppConfig{
		VideoDir: "/tmp/test_videos",
	}
	clk := &clock.MockClock{FixedTime: time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC)}
	svc := service.NewVideoService(queries, cfg, clk)
	h := handler.NewVideoHandler(svc)
	return h, queries, cleanup
}

func TestVideoHandler_VideosList(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ一覧を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 3件のビデオを作成する
		_, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)
		_, err = factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)
		_, err = factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 一覧を取得する
		page := int32(1)
		size := int32(10)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page: &page,
				Size: &size,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 3)
		assert.Equal(t, int32(3), listResp.Pager.TotalCount)
		assert.Equal(t, int32(1), listResp.Pager.Page)
		assert.Equal(t, int32(10), listResp.Pager.Size)
	})

	t.Run("ページネーションパラメータを指定できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 5件のビデオを作成する
		for i := 0; i < 5; i++ {
			_, err := factory.NewVideo().Create(ctx, queries)
			require.NoError(t, err)
		}

		// page=2, size=2で取得する
		page := int32(2)
		size := int32(2)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page: &page,
				Size: &size,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 2)
		assert.Equal(t, int32(5), listResp.Pager.TotalCount)
	})

	t.Run("ビデオが0件の時は空配列を返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		page := int32(1)
		size := int32(10)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page: &page,
				Size: &size,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 0)
		assert.Equal(t, int32(0), listResp.Pager.TotalCount)
	})

	t.Run("日付範囲でフィルタリングできる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 異なる日付のビデオを作成する
		baseTime := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)

		// 2026-01-01のビデオ
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "1月1日のビデオ"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(30 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 2026-01-02のビデオ
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "1月2日のビデオ"
			vf.StartedAt = baseTime.Add(24 * time.Hour)
			vf.FinishedAt = baseTime.Add(24*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 2026-01-03のビデオ
		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "1月3日のビデオ"
			vf.StartedAt = baseTime.Add(48 * time.Hour)
			vf.FinishedAt = baseTime.Add(48*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 1月1日から1月2日の範囲で取得する（1月3日は除外）
		page := int32(1)
		size := int32(10)
		from := baseTime
		to := baseTime.Add(47 * time.Hour) // 1月1日 00:00から1月2日 23:00まで
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page:          &page,
				Size:          &size,
				StartedAtFrom: &from,
				StartedAtTo:   &to,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する（新しい順に返される）
		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 2)
		assert.Equal(t, int32(2), listResp.Pager.TotalCount)
		// IDの降順（新しい順）で返される
		assert.Equal(t, "1月2日のビデオ", listResp.Data[0].Title)
		assert.Equal(t, "1月1日のビデオ", listResp.Data[1].Title)
	})

	t.Run("startedAtFromのみ指定できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		baseTime := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)

		// 2件のビデオを作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "古いビデオ"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(30 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "新しいビデオ"
			vf.StartedAt = baseTime.Add(24 * time.Hour)
			vf.FinishedAt = baseTime.Add(24*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 1月2日以降のビデオを取得する
		page := int32(1)
		size := int32(10)
		from := baseTime.Add(24 * time.Hour)
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page:          &page,
				Size:          &size,
				StartedAtFrom: &from,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 1)
		assert.Equal(t, "新しいビデオ", listResp.Data[0].Title)
	})

	t.Run("startedAtToのみ指定できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		baseTime := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)

		// 2件のビデオを作成する
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "古いビデオ"
			vf.StartedAt = baseTime
			vf.FinishedAt = baseTime.Add(30 * time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		_, err = factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "新しいビデオ"
			vf.StartedAt = baseTime.Add(24 * time.Hour)
			vf.FinishedAt = baseTime.Add(24*time.Hour + 30*time.Minute)
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 1月2日より前のビデオを取得する
		page := int32(1)
		size := int32(10)
		to := baseTime.Add(23 * time.Hour) // 1月1日 23:00まで
		req := oapi.VideosListRequestObject{
			Params: oapi.VideosListParams{
				Page:        &page,
				Size:        &size,
				StartedAtTo: &to,
			},
		}
		resp, err := h.VideosList(ctx, req)
		require.NoError(t, err)

		listResp, ok := resp.(oapi.VideosList200JSONResponse)
		require.True(t, ok)
		assert.Len(t, listResp.Data, 1)
		assert.Equal(t, "古いビデオ", listResp.Data[0].Title)
	})
}

func TestVideoHandler_VideosGet(t *testing.T) {
	t.Parallel()

	t.Run("ビデオ詳細を取得できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 詳細を取得する
		req := oapi.VideosGetRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosGet(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		getResp, ok := resp.(oapi.VideosGet200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "Test Video", getResp.Title)
		assert.Equal(t, created.ID, *getResp.Id)
	})

	t.Run("存在しないIDの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 存在しないIDで取得する
		req := oapi.VideosGetRequestObject{
			Id: 99999,
		}
		resp, err := h.VideosGet(ctx, req)
		require.NoError(t, err)

		// エラーレスポンスを確認する
		_, ok := resp.(oapi.VideosGetdefaultJSONResponse)
		require.True(t, ok)
	})
}

func TestVideoHandler_VideosCreate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを作成できる", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		startedAt := time.Now().UTC()
		finishedAt := startedAt.Add(25 * time.Minute)
		req := oapi.VideosCreateRequestObject{
			Body: &oapi.VideoCreate{
				Title:              "New Video",
				Filename:           "new.webm",
				StartedAt:          startedAt,
				FinishedAt:         finishedAt,
				AudioActivityRatio: 75.5,
			},
		}
		resp, err := h.VideosCreate(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		createResp, ok := resp.(oapi.VideosCreate201JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "New Video", createResp.Title)
		assert.Equal(t, "new.webm", createResp.Filename)
		assert.WithinDuration(t, startedAt, createResp.StartedAt, time.Second)
		assert.WithinDuration(t, finishedAt, createResp.FinishedAt, time.Second)
		assert.Equal(t, 75.5, createResp.AudioActivityRatio)
	})

	t.Run("AudioActivityRatioが0の時も作成できる", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		startedAt := time.Now().UTC()
		finishedAt := startedAt.Add(25 * time.Minute)
		req := oapi.VideosCreateRequestObject{
			Body: &oapi.VideoCreate{
				Title:              "Silent Video",
				Filename:           "silent.webm",
				StartedAt:          startedAt,
				FinishedAt:         finishedAt,
				AudioActivityRatio: 0,
			},
		}
		resp, err := h.VideosCreate(ctx, req)
		require.NoError(t, err)

		createResp, ok := resp.(oapi.VideosCreate201JSONResponse)
		require.True(t, ok)
		assert.Equal(t, float64(0), createResp.AudioActivityRatio)
	})

	t.Run("重複したファイル名の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// 最初のビデオを作成する
		existingFilename := "duplicate_test.webm"
		_, err := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Filename = sql.NullString{String: existingFilename, Valid: true}
		}).Create(ctx, queries)
		require.NoError(t, err)

		// 同じファイル名で2つ目のビデオを作成しようとする
		startedAt := time.Now().UTC()
		finishedAt := startedAt.Add(25 * time.Minute)
		req := oapi.VideosCreateRequestObject{
			Body: &oapi.VideoCreate{
				Title:              "Duplicate Video",
				Filename:           existingFilename,
				StartedAt:          startedAt,
				FinishedAt:         finishedAt,
				AudioActivityRatio: 50.0,
			},
		}
		resp, err := h.VideosCreate(ctx, req)
		require.NoError(t, err)

		_, ok := resp.(oapi.VideosCreatedefaultJSONResponse)
		require.True(t, ok)
	})
}

func TestVideoHandler_VideosUpdate(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを更新できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 更新する
		newTitle := "Updated Title"
		req := oapi.VideosUpdateRequestObject{
			Id: created.ID,
			Body: &oapi.VideoUpdate{
				Title: &newTitle,
			},
		}
		resp, err := h.VideosUpdate(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		updateResp, ok := resp.(oapi.VideosUpdate200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "Updated Title", updateResp.Title)
	})

	t.Run("複数フィールドを同時に更新できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		newTitle := "Multi Update"
		newFilename := "multi.webm"
		newRatio := 90.5
		req := oapi.VideosUpdateRequestObject{
			Id: created.ID,
			Body: &oapi.VideoUpdate{
				Title:              &newTitle,
				Filename:           &newFilename,
				AudioActivityRatio: &newRatio,
			},
		}
		resp, err := h.VideosUpdate(ctx, req)
		require.NoError(t, err)

		updateResp, ok := resp.(oapi.VideosUpdate200JSONResponse)
		require.True(t, ok)
		assert.Equal(t, "Multi Update", updateResp.Title)
		assert.Equal(t, "multi.webm", updateResp.Filename)
		assert.Equal(t, 90.5, updateResp.AudioActivityRatio)
	})

	t.Run("存在しないIDの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		newTitle := "Should Fail"
		req := oapi.VideosUpdateRequestObject{
			Id: 99999,
			Body: &oapi.VideoUpdate{
				Title: &newTitle,
			},
		}
		resp, err := h.VideosUpdate(ctx, req)
		require.NoError(t, err)

		_, ok := resp.(oapi.VideosUpdatedefaultJSONResponse)
		require.True(t, ok)
	})

	t.Run("startedAtがfinishedAtより後の時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// startedAt > finishedAt となるように設定する
		newStartedAt := time.Date(2025, 1, 1, 12, 0, 0, 0, time.UTC)
		newFinishedAt := time.Date(2025, 1, 1, 10, 0, 0, 0, time.UTC)
		req := oapi.VideosUpdateRequestObject{
			Id: created.ID,
			Body: &oapi.VideoUpdate{
				StartedAt:  &newStartedAt,
				FinishedAt: &newFinishedAt,
			},
		}
		resp, err := h.VideosUpdate(ctx, req)
		require.NoError(t, err)

		errResp, ok := resp.(oapi.VideosUpdatedefaultJSONResponse)
		require.True(t, ok)
		assert.Equal(t, 400, errResp.StatusCode)
	})
}

func TestVideoHandler_VideosDelete(t *testing.T) {
	t.Parallel()

	t.Run("ビデオを削除できる", func(t *testing.T) {
		t.Parallel()
		h, queries, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		// ビデオを作成する
		created, err := factory.NewVideo().Create(ctx, queries)
		require.NoError(t, err)

		// 削除する
		req := oapi.VideosDeleteRequestObject{
			Id: created.ID,
		}
		resp, err := h.VideosDelete(ctx, req)
		require.NoError(t, err)

		// レスポンスを確認する
		_, ok := resp.(oapi.VideosDelete204Response)
		require.True(t, ok)

		// 削除されたことを確認する
		_, err = queries.GetVideo(ctx, created.ID)
		assert.Error(t, err)
	})

	t.Run("存在しないIDの時はエラーを返す", func(t *testing.T) {
		t.Parallel()
		h, _, cleanup := setupVideoHandler(t)
		defer cleanup()
		ctx := context.Background()

		req := oapi.VideosDeleteRequestObject{
			Id: 99999,
		}
		resp, err := h.VideosDelete(ctx, req)
		require.NoError(t, err)

		_, ok := resp.(oapi.VideosDeletedefaultJSONResponse)
		require.True(t, ok)
	})
}
