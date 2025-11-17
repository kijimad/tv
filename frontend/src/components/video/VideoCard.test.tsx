import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { system } from "../../theme";
import VideoCard from "./VideoCard";
import type { Video } from "../../oapi";

describe("VideoCard", () => {
  const queryClient = new QueryClient();
  const mockVideo: Video = {
    id: 1,
    filename: "test-video.mp4",
    title: "テスト動画",
    startedAt: "2025-11-17T10:00:00Z",
    finishedAt: "2025-11-17T11:00:00Z",
    createdAt: "2025-11-17T10:00:00Z",
    updatedAt: "2025-11-17T10:00:00Z",
  };

  test("動画情報を表示できる", () => {
    const handleClick = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <VideoCard video={mockVideo} onClick={handleClick} />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("テスト動画")).toBeInTheDocument();
  });

  test("クリック時はonClickを呼び出す", () => {
    const handleClick = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <VideoCard video={mockVideo} onClick={handleClick} />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    screen.getByText("テスト動画").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
