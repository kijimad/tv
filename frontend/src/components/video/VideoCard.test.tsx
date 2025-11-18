import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { render } from "../../test/render";
import VideoCard from "./VideoCard";
import type { Video } from "../../oapi";

vi.mock("../../hooks/useThumbnail", () => ({
  useThumbnail: () => "http://localhost:8080/api/v1/videos/1/thumbnail",
}));

describe("VideoCard", () => {
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
    render(<VideoCard video={mockVideo} onClick={handleClick} />);

    expect(screen.getByText("テスト動画")).toBeInTheDocument();
  });

  test("クリック時はonClickを呼び出す", () => {
    const handleClick = vi.fn();
    render(<VideoCard video={mockVideo} onClick={handleClick} />);

    screen.getByText("テスト動画").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
