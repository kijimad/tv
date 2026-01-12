import { render } from "../test/render";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Timeline from "./Timeline";
import { describe, test, expect, vi, beforeEach } from "vitest";
import * as useVideosModule from "../hooks/useVideos";
import type { VideoPage } from "../oapi";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Timeline", () => {
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
          audioActivityRatio: 85.0,
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

  test("今日の場合は今日ボタンが無効化される", () => {
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    const mockData: VideoPage = {
      pager: {
        page: 1,
        size: 1000,
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
          audioActivityRatio: 85.0,
        },
      ],
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
