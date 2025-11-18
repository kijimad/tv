import { describe, expect, test, vi, afterEach } from "vitest";

vi.mock("../hooks/useVideos");
vi.mock("../hooks/useThumbnail", () => ({
  useThumbnail: () => "http://localhost:8080/api/v1/videos/1/thumbnail",
}));

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "../test/render";
import Timeline from "./Timeline";
import * as useVideosModule from "../hooks/useVideos";
import type { VideoPage } from "../oapi";

describe("Timeline", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("読み込み中を表示できる", () => {
    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("エラー時はエラーメッセージを表示できる", () => {
    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("テストエラー"),
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });

  test("今日の動画を表示できる", () => {
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 1,
      },
      data: [
        {
          id: 1,
          filename: "video1.mp4",
          title: "今日の動画",
          startedAt: today.toISOString(),
          finishedAt: new Date(today.getTime() + 3600000).toISOString(),
          createdAt: today.toISOString(),
          updatedAt: today.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    expect(screen.getByText("今日の動画")).toBeInTheDocument();
  });

  test("デフォルトでは今日の動画のみ表示する", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 1,
      },
      data: [
        {
          id: 1,
          filename: "video1.mp4",
          title: "昨日の動画",
          startedAt: yesterday.toISOString(),
          finishedAt: new Date(yesterday.getTime() + 3600000).toISOString(),
          createdAt: yesterday.toISOString(),
          updatedAt: yesterday.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    // 昨日の動画は表示されない
    expect(screen.queryByText("昨日の動画")).not.toBeInTheDocument();
  });

  test("タイムゾーンを跨ぐ境界ケース時は正しく判定する", () => {
    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const justBeforeMidnight = new Date(todayMidnight.getTime() - 1000);
    const justAfterMidnight = new Date(todayMidnight.getTime() + 1000);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 2,
      },
      data: [
        {
          id: 1,
          filename: "yesterday.mp4",
          title: "昨日23:59:59",
          startedAt: justBeforeMidnight.toISOString(),
          finishedAt: new Date(
            justBeforeMidnight.getTime() + 3600000,
          ).toISOString(),
          createdAt: justBeforeMidnight.toISOString(),
          updatedAt: justBeforeMidnight.toISOString(),
        },
        {
          id: 2,
          filename: "today.mp4",
          title: "今日00:00:01",
          startedAt: justAfterMidnight.toISOString(),
          finishedAt: new Date(
            justAfterMidnight.getTime() + 3600000,
          ).toISOString(),
          createdAt: justAfterMidnight.toISOString(),
          updatedAt: justAfterMidnight.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    expect(screen.queryByText("昨日23:59:59")).not.toBeInTheDocument();
    expect(screen.getByText("今日00:00:01")).toBeInTheDocument();
  });

  test("←ボタンで前日に移動できる", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 1,
      },
      data: [
        {
          id: 1,
          filename: "video1.mp4",
          title: "昨日の動画",
          startedAt: yesterday.toISOString(),
          finishedAt: new Date(yesterday.getTime() + 3600000).toISOString(),
          createdAt: yesterday.toISOString(),
          updatedAt: yesterday.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    const prevButton = screen.getByRole("button", { name: "前の日" });
    const { user } = render(<Timeline />);
    await user.click(prevButton);

    expect(screen.getByText("昨日の動画")).toBeInTheDocument();
  });

  test("→ボタンで翌日に移動できる", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 1,
      },
      data: [
        {
          id: 1,
          filename: "video1.mp4",
          title: "明日の動画",
          startedAt: tomorrow.toISOString(),
          finishedAt: new Date(tomorrow.getTime() + 3600000).toISOString(),
          createdAt: tomorrow.toISOString(),
          updatedAt: tomorrow.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    const nextButton = screen.getByRole("button", { name: "次の日" });
    const { user } = render(<Timeline />);
    await user.click(nextButton);

    expect(screen.getByText("明日の動画")).toBeInTheDocument();
  });

  test("今日ボタンで今日に戻れる", async () => {
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 2,
      },
      data: [
        {
          id: 1,
          filename: "today.mp4",
          title: "今日の動画",
          startedAt: today.toISOString(),
          finishedAt: new Date(today.getTime() + 3600000).toISOString(),
          createdAt: today.toISOString(),
          updatedAt: today.toISOString(),
        },
        {
          id: 2,
          filename: "tomorrow.mp4",
          title: "明日の動画",
          startedAt: tomorrow.toISOString(),
          finishedAt: new Date(tomorrow.getTime() + 3600000).toISOString(),
          createdAt: tomorrow.toISOString(),
          updatedAt: tomorrow.toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    const { user } = render(<Timeline />);

    const nextButton = screen.getByRole("button", { name: "次の日" });
    await user.click(nextButton);
    expect(screen.getByText("明日の動画")).toBeInTheDocument();
    expect(screen.queryByText("今日の動画")).not.toBeInTheDocument();

    const todayButton = screen.getByRole("button", { name: "今日" });
    await user.click(todayButton);
    expect(screen.getByText("今日の動画")).toBeInTheDocument();
    expect(screen.queryByText("明日の動画")).not.toBeInTheDocument();
  });

  test("今日の場合は今日ボタンが無効化される", () => {
    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 100,
        totalCount: 0,
      },
      data: [],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useVideosModule.useVideos>);

    render(<Timeline />);

    const todayButton = screen.getByRole("button", { name: "今日" });
    expect(todayButton).toBeDisabled();
  });
});
