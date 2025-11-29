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

/** 処理ステータス */
alias ProcessingStatus = "recording" | "pending" | "processing" | "ready" | "archived" | "failed" | "cancelled";

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

  /** 処理ステータス */
  processingStatus: ProcessingStatus;

  /** 作成日時 */
  @visibility("read")
  createdAt: utcDateTime;

  /** 更新日時 */
  @visibility("read")
  updatedAt: utcDateTime;
}

/** 録画中情報 */
model VideoRecording {
  /** ID */
  @visibility("read")
  id: int64;

  /** ビデオID */
  videoId: int64;

  /** 一時ファイルパス */
  tempFilePath: string;

  /** recorderプロセスPID */
  recorderPid?: int32;

  /** 開始時刻 */
  startedAt: utcDateTime;
}

/** 変換処理情報 */
model VideoProcessing {
  /** ID */
  @visibility("read")
  id: int64;

  /** ビデオID */
  videoId: int64;

  /** ジョブステータス */
  jobStatus: "pending" | "processing" | "failed";

  /** 一時ファイルパス */
  tempFilePath: string;

  /** 出力ファイルパス */
  outputFilePath: string;

  /** サムネイルパス */
  thumbnailPath?: string;

  /** 進捗 (0-100) */
  @minValue(0)
  @maxValue(100)
  progress: int32;

  /** 再試行回数 */
  retryCount: int32;

  /** 最後のエラー */
  lastError?: string;
}

/** 完了情報 */
model VideoCompletion {
  /** ID */
  @visibility("read")
  id: int64;

  /** ビデオID */
  videoId: int64;

  /** ファイルパス */
  filePath: string;

  /** ファイルサイズ(バイト) */
  fileSize: int64;

  /** 長さ(秒) */
  durationSeconds: int32;

  /** サムネイルパス */
  thumbnailPath?: string;

  /** 動画コーデック */
  videoCodec?: string;

  /** 音声コーデック */
  audioCodec?: string;

  /** 解像度 */
  resolution?: string;

  /** 完了時刻 */
  readyAt: utcDateTime;
}

/** ビデオ作成リクエスト（録画開始） */
model VideoCreate {
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

/** 録画停止リクエスト */
model VideoStopRequest {
  /** 正常終了かどうか */
  success: boolean;

  /** 終了時刻（successがtrueの場合に必須） */
  finishedAt?: utcDateTime;
}

/** 変換完了リクエスト */
model VideoCompleteRequest {
  /** ファイルサイズ(バイト) */
  fileSize: int64;

  /** 長さ(秒) */
  durationSeconds: int32;

  /** 動画コーデック */
  videoCodec?: string;

  /** 音声コーデック */
  audioCodec?: string;

  /** 解像度 */
  resolution?: string;
}

/** 変換失敗リクエスト */
model VideoFailRequest {
  /** エラーメッセージ */
  errorMessage: string;

  /** エラー種別 */
  errorType?: "conversion_failed" | "thumbnail_failed" | "file_not_found" | "invalid_file" | "disk_full" | "timeout";
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

/** 録画ステータスレスポンス */
model RecordingStatus {
  /** 録画中かどうか */
  recording: boolean;

  /** 現在録画中のビデオ */
  currentVideo?: Video;
}

/** エラーレスポンス */
@error
model Error {
  message: string;
}

/** 状態遷移エラーレスポンス */
@error
model InvalidStateTransitionError {
  error: "invalid_state_transition";
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
    /** ステータスで絞り込み */
    @query status?: ProcessingStatus,
  ): VideoPage | Error;

  /** ビデオ詳細取得 */
  @get
  @route("/{id}")
  get(@path id: int64): Video | Error;

  /** ビデオ作成（録画開始） */
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

  /** 録画停止（recording → pending） */
  @post
  @route("/{id}/stop")
  stop(@path id: int64): Video | InvalidStateTransitionError | Error;

  /** 変換開始（pending → processing） */
  @post
  @route("/{id}/process")
  process(@path id: int64): Video | InvalidStateTransitionError | Error;

  /** 変換完了（processing → ready） */
  @post
  @route("/{id}/complete")
  complete(@path id: int64): Video | InvalidStateTransitionError | Error;

  /** 変換失敗（processing → failed） */
  @post
  @route("/{id}/fail")
  fail(@path id: int64): Video | InvalidStateTransitionError | Error;

  /** 再試行（failed → pending） */
  @post
  @route("/{id}/retry")
  retry(@path id: int64): Video | InvalidStateTransitionError | Error;
}

@route("/api/v1/status")
interface Status {
  /** 現在の録画状態取得 */
  @get
  get(): RecordingStatus | Error;
}
