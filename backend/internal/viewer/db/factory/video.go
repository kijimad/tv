// Package factory はテストデータ作成用のファクトリ関数を提供する
package factory

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/go-faker/faker/v4"
	"github.com/kijimaD/tv/internal/viewer/db/sqlc"
)

// VideoFactory はVideoのテストデータを作成するファクトリ
type VideoFactory struct {
	Title              string
	Filename           sql.NullString
	StartedAt          time.Time
	FinishedAt         time.Time
	AudioActivityRatio float64
}

// NewVideo はデフォルト値でVideoFactoryを作成する
func NewVideo(overrides ...func(*VideoFactory)) *VideoFactory {
	now := time.Now()
	f := &VideoFactory{
		Title:              faker.Sentence(),
		Filename:           sql.NullString{String: fmt.Sprintf("%s.webm", faker.UUIDHyphenated()), Valid: true},
		StartedAt:          now,
		FinishedAt:         now.Add(30 * time.Minute),
		AudioActivityRatio: 85.0,
	}
	for _, override := range overrides {
		override(f)
	}
	return f
}

// Build はCreateVideoParamsを生成する
func (f *VideoFactory) Build() sqlc.CreateVideoParams {
	return sqlc.CreateVideoParams{
		Title:              f.Title,
		Filename:           f.Filename,
		StartedAt:          f.StartedAt,
		FinishedAt:         f.FinishedAt,
		AudioActivityRatio: f.AudioActivityRatio,
	}
}

// Create はDBにVideoレコードを作成する
func (f *VideoFactory) Create(ctx context.Context, q *sqlc.Queries) (sqlc.Video, error) {
	return q.CreateVideo(ctx, f.Build())
}
