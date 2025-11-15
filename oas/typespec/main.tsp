import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;

@service({
  title: "TV API",
})
@server("http://localhost:8080", "Development server")
namespace TvApi;

/** 録画ビデオ */
model Video {
  /** ビデオID */
  @visibility("read")
  id: int64;

  /** 録画開始時刻 */
  startedAt: utcDateTime;

  /** 録画終了時刻 */
  finishedAt: utcDateTime;

  /** タイトル */
  @minLength(1)
  @maxLength(255)
  title: string;

  /** ファイル名 */
  @minLength(1)
  @maxLength(255)
  filename: string;

  /** 作成日時 */
  @visibility("read")
  createdAt: utcDateTime;

  /** 更新日時 */
  @visibility("read")
  updatedAt: utcDateTime;
}

/** ビデオ作成リクエスト */
model VideoCreate {
  startedAt: utcDateTime;
  finishedAt: utcDateTime;

  @minLength(1)
  @maxLength(255)
  title: string;

  @minLength(1)
  @maxLength(255)
  filename: string;
}

/** ビデオ更新リクエスト */
model VideoUpdate {
  startedAt?: utcDateTime;
  finishedAt?: utcDateTime;

  @minLength(1)
  @maxLength(255)
  title?: string;

  @minLength(1)
  @maxLength(255)
  filename?: string;
}

/** ビデオ一覧レスポンス */
model VideoList {
  videos: Video[];
  total: int32;
}

/** エラーレスポンス */
@error
model Error {
  code: string;
  message: string;
}

@route("/api/v1/videos")
interface Videos {
  /** ビデオ一覧取得 */
  @get
  list(
    @query @minValue(1) @maxValue(100) limit?: int32 = 20,
    @query @minValue(0) offset?: int32 = 0,
  ): VideoList | Error;

  /** ビデオ詳細取得 */
  @get
  @route("/{id}")
  get(@path id: int64): Video | Error;

  /** ビデオ作成 */
  @post
  create(@body video: VideoCreate): Video | Error;

  /** ビデオ更新 */
  @patch
  @route("/{id}")
  update(@path id: int64, @body video: VideoUpdate): Video | Error;

  /** ビデオ削除 */
  @delete
  @route("/{id}")
  delete(@path id: int64): void | Error;
}
