import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { queryClient } from "../api/queries";
import { system } from "../theme";
import Timeline from "./Timeline";
import * as useVideosModule from "../hooks/useVideos";
import type { VideosResponse } from "../oapi";

vi.mock("../hooks/useVideos");

describe("Timeline", () => {
  test("読み込み中を表示できる", () => {
    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <Timeline />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  test("エラー時はエラーメッセージを表示できる", () => {
    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("テストエラー"),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <Timeline />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });

  test("今日の動画を表示できる", () => {
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    const mockData: VideosResponse = {
      videos: [
        {
          id: "1",
          filename: "video1.mp4",
          title: "今日の動画",
          startedAt: today.toISOString(),
          finishedAt: new Date(today.getTime() + 3600000).toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <Timeline />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("今日の動画")).toBeInTheDocument();
  });

  test("昨日の動画は表示しない", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(10, 0, 0, 0);

    const mockData: VideosResponse = {
      videos: [
        {
          id: "1",
          filename: "video1.mp4",
          title: "昨日の動画",
          startedAt: yesterday.toISOString(),
          finishedAt: new Date(yesterday.getTime() + 3600000).toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <Timeline />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.queryByText("昨日の動画")).not.toBeInTheDocument();
  });

  test("タイムゾーンを跨ぐ境界ケース時は正しく判定する", () => {
    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const justBeforeMidnight = new Date(todayMidnight.getTime() - 1000);
    const justAfterMidnight = new Date(todayMidnight.getTime() + 1000);

    const mockData: VideosResponse = {
      videos: [
        {
          id: "1",
          filename: "yesterday.mp4",
          title: "昨日23:59:59",
          startedAt: justBeforeMidnight.toISOString(),
          finishedAt: new Date(
            justBeforeMidnight.getTime() + 3600000,
          ).toISOString(),
        },
        {
          id: "2",
          filename: "today.mp4",
          title: "今日00:00:01",
          startedAt: justAfterMidnight.toISOString(),
          finishedAt: new Date(
            justAfterMidnight.getTime() + 3600000,
          ).toISOString(),
        },
      ],
    };

    vi.spyOn(useVideosModule, "useVideos").mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <Timeline />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.queryByText("昨日23:59:59")).not.toBeInTheDocument();
    expect(screen.getByText("今日00:00:01")).toBeInTheDocument();
  });
});
