package factory_test

import (
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/stretchr/testify/assert"
)

func TestNewVideo(t *testing.T) {
	t.Parallel()

	t.Run("デフォルト値でVideoFactoryを作成", func(t *testing.T) {
		t.Parallel()
		f := factory.NewVideo()

		assert.NotEmpty(t, f.Title, "Title should not be empty")
		assert.NotEmpty(t, f.Filename, "Filename should not be empty")
		assert.False(t, f.StartedAt.IsZero(), "StartedAt should not be zero")
		assert.False(t, f.FinishedAt.IsZero(), "FinishedAt should not be zero")
	})

	t.Run("オーバーライドでカスタム値を設定", func(t *testing.T) {
		t.Parallel()
		customTitle := "Custom Title"
		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = customTitle
		})

		assert.Equal(t, customTitle, f.Title)
	})

	t.Run("複数のオーバーライドを適用", func(t *testing.T) {
		t.Parallel()
		startTime := time.Date(2024, 1, 1, 10, 0, 0, 0, time.UTC)

		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
			vf.Filename = "test.mp4"
			vf.StartedAt = startTime
			vf.FinishedAt = startTime.Add(2 * time.Hour)
		})

		assert.Equal(t, "Test Video", f.Title)
		assert.Equal(t, "test.mp4", f.Filename)
		assert.True(t, f.StartedAt.Equal(startTime))
		assert.True(t, f.FinishedAt.Equal(startTime.Add(2*time.Hour)))
	})
}

func TestVideoFactory_Build(t *testing.T) {
	t.Parallel()

	t.Run("CreateVideoParamsを生成", func(t *testing.T) {
		t.Parallel()
		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
			vf.Filename = "test.mp4"
		})

		params := f.Build()

		assert.Equal(t, "Test Video", params.Title)
		assert.Equal(t, "test.mp4", params.Filename)
	})

	t.Run("ランダムな値でパラメータを生成", func(t *testing.T) {
		t.Parallel()
		params1 := factory.NewVideo().Build()
		params2 := factory.NewVideo().Build()

		// ランダム生成なので異なる値になるはず（Titleは同じ可能性もある）
		assert.NotEqual(t, params1.Filename, params2.Filename, "Filenames should be different (UUID-based)")
	})
}
