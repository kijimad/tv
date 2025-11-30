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

  /** タイトル */
  @minLength(1)
  @maxLength(255)
  title: string;

  /** ファイル名 */
  @minLength(1)
  @maxLength(255)
  filename: string;

  /** 録画開始時刻(UTC) */
  startedAt: utcDateTime;

  /** 録画終了時刻(UTC) */
  finishedAt?: utcDateTime;

  /** 音声アクティビティ率(%) */
  audioActivityRatio: float64;

  /** 作成日時 */
  @visibility("read")
  createdAt: utcDateTime;

  /** 更新日時 */
  @visibility("read")
  updatedAt: utcDateTime;
}

/** ビデオ作成リクエスト */
model VideoCreate {
  @minLength(1)
  @maxLength(255)
  title: string;

  @minLength(1)
  @maxLength(255)
  filename: string;

  startedAt: utcDateTime;
  finishedAt: utcDateTime;

  /** 音声アクティビティ率(%) */
  audioActivityRatio: float64;
}

/** ビデオ更新リクエスト */
model VideoUpdate {
  @minLength(1)
  @maxLength(255)
  title?: string;

  @minLength(1)
  @maxLength(255)
  filename?: string;

  startedAt?: utcDateTime;
  finishedAt?: utcDateTime;

  /** 音声アクティビティ率(%) */
  audioActivityRatio?: float64;
}

/**
 * レスポンスのページネーション情報。
 * ページに含まれる対象の数は以下で求められる。
 *
 * ```
 * min(size, totalCount - size * (page - 1))
 * ```
 */
model Pager {
  /** ページ番号 */
  @minValue(1)
  page: int32;

  /** 1ページあたりの最大取得件数 */
  @minValue(0)
  @maxValue(100)
  size: int32;

  /** ページに含まれているものも含まれていないものも合わせた対象の全数 */
  @minValue(0)
  totalCount: int32;
}

/** ビデオページレスポンス */
model VideoPage {
  pager: Pager;
  data: Video[];
}

/** エラーレスポンス */
@error
model Error {
  message: string;
}

@route("/api/v1/videos")
interface Videos {
  /** ビデオ一覧取得 */
  @get
  list(
    /** ページ番号 */
    @query @minValue(1) page?: int32 = 1,
    /** 1ページあたりの最大取得件数 */
    @query @minValue(1) @maxValue(100) size?: int32 = 30,
  ): VideoPage | Error;

  /** ビデオ詳細取得 */
  @get
  @route("/{id}")
  get(@path id: int64): Video | Error;

  /** ビデオ作成 */
  @post
  create(@body video: VideoCreate): {
    @statusCode statusCode: 201;
    @body body: Video;
  } | Error;

  /** ビデオ更新 */
  @patch
  @route("/{id}")
  update(@path id: int64, @body video: VideoUpdate): Video | Error;

  /** ビデオ削除 */
  @delete
  @route("/{id}")
  delete(@path id: int64): void | Error;

  /** ビデオファイル配信 */
  @get
  @route("/{id}/file")
  file(@path id: int64): {
    @statusCode statusCode: 200;
    @header contentType: "video/webm";
    @body body: bytes;
  } | {
    @statusCode statusCode: 404;
    @body body: Error;
  } | Error;

  /** サムネイル画像取得 */
  @get
  @route("/{id}/thumbnail")
  thumbnail(@path id: int64): {
    @statusCode statusCode: 200;
    @header contentType: "image/jpeg";
    @body body: bytes;
  } | {
    @statusCode statusCode: 404;
    @body body: Error;
  } | Error;
}
