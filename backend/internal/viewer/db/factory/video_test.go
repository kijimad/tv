package factory_test

import (
	"database/sql"
	"testing"
	"time"

	"github.com/kijimaD/tv/internal/viewer/db/factory"
	"github.com/stretchr/testify/assert"
)

func TestNewVideo(t *testing.T) {
	t.Parallel()

	t.Run("デフォルト値でVideoFactoryを作成できる", func(t *testing.T) {
		t.Parallel()
		f := factory.NewVideo()

		assert.NotEmpty(t, f.Title)
		assert.NotEmpty(t, f.Filename)
		assert.False(t, f.StartedAt.IsZero())
	})

	t.Run("オーバーライドでカスタム値を設定できる", func(t *testing.T) {
		t.Parallel()
		customTitle := "Custom Title"
		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = customTitle
		})

		assert.Equal(t, customTitle, f.Title)
	})

	t.Run("複数のオーバーライドを適用できる", func(t *testing.T) {
		t.Parallel()
		startTime := time.Date(2024, 1, 1, 10, 0, 0, 0, time.UTC)

		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
			vf.Filename = sql.NullString{String: "test.webm", Valid: true}
			vf.StartedAt = startTime
		})

		assert.Equal(t, "Test Video", f.Title)
		assert.Equal(t, "test.webm", f.Filename.String)
		assert.True(t, f.Filename.Valid)
		assert.True(t, f.StartedAt.Equal(startTime))
	})
}

func TestVideoFactory_Build(t *testing.T) {
	t.Parallel()

	t.Run("CreateVideoParamsを生成できる", func(t *testing.T) {
		t.Parallel()
		f := factory.NewVideo(func(vf *factory.VideoFactory) {
			vf.Title = "Test Video"
			vf.Filename = sql.NullString{String: "test.webm", Valid: true}
		})

		params := f.Build()

		assert.Equal(t, "Test Video", params.Title)
		assert.Equal(t, "test.webm", params.Filename.String)
		assert.True(t, params.Filename.Valid)
	})

	t.Run("ランダムな値でパラメータを生成できる", func(t *testing.T) {
		t.Parallel()
		params1 := factory.NewVideo().Build()
		params2 := factory.NewVideo().Build()

		assert.NotEqual(t, params1.Filename.String, params2.Filename.String)
	})
}
