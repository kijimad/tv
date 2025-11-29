// Package factory はテストデータ作成用のファクトリ関数を提供する
package factory

import (
	"context"
	"fmt"
	"time"

	"github.com/go-faker/faker/v4"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// VideoFactory はVideoのテストデータを作成するファクトリ
type VideoFactory struct {
	Title     string
	Filename  string
	StartedAt time.Time
}

// NewVideo はデフォルト値でVideoFactoryを作成する
func NewVideo(overrides ...func(*VideoFactory)) *VideoFactory {
	now := time.Now()
	f := &VideoFactory{
		Title:     faker.Sentence(),
		Filename:  fmt.Sprintf("%s.webm", faker.UUIDHyphenated()),
		StartedAt: now,
	}
	for _, override := range overrides {
		override(f)
	}
	return f
}

// Build はCreateVideoParamsを生成する
func (f *VideoFactory) Build() sqlc.CreateVideoParams {
	return sqlc.CreateVideoParams{
		Title:     f.Title,
		Filename:  f.Filename,
		StartedAt: f.StartedAt,
	}
}

// Create はDBにVideoレコードを作成する
func (f *VideoFactory) Create(ctx context.Context, q *sqlc.Queries) (sqlc.Video, error) {
	return q.CreateVideo(ctx, f.Build())
}
