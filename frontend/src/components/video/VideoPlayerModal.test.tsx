import { describe, expect, test, vi, beforeEach } from "vitest";

vi.mock("../../hooks/useVideoFile", () => ({
  useVideoFile: () => "http://localhost:8080/api/v1/videos/1/file",
}));

const mockMutate = vi.fn();
const mockDeleteMutate = vi.fn();

vi.mock("../../hooks/useVideoMutations", () => ({
  useUpdateVideo: () => ({
    mutate: mockMutate,
  }),
  useDeleteVideo: () => ({
    mutate: mockDeleteMutate,
  }),
}));

import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import VideoPlayerModal from "./VideoPlayerModal";
import type { Video } from "../../oapi";

describe("VideoPlayerModal", () => {
  const mockVideo: Video = {
    id: 1,
    filename: "test-video.webm",
    title: "テスト動画",
    startedAt: "2025-11-17T10:00:00Z",
    finishedAt: "2025-11-17T11:00:00Z",
    createdAt: "2025-11-17T10:00:00Z",
    updatedAt: "2025-11-17T10:00:00Z",
    processingStatus: "ready",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("モーダルが開いているときに動画タイトルを表示できる", () => {
    const handleClose = vi.fn();
    render(
      <VideoPlayerModal
        video={mockVideo}
        isOpen={true}
        onClose={handleClose}
      />,
    );

    expect(screen.getByText("テスト動画")).toBeInTheDocument();
  });

  test("削除ボタンを表示できる", () => {
    const handleClose = vi.fn();
    render(
      <VideoPlayerModal
        video={mockVideo}
        isOpen={true}
        onClose={handleClose}
      />,
    );

    expect(screen.getByText("削除")).toBeInTheDocument();
  });

  test("削除ボタンをクリックすると確認ダイアログが表示される", () => {
    const handleClose = vi.fn();
    const originalConfirm = window.confirm;
    window.confirm = vi.fn().mockReturnValue(false);

    render(
      <VideoPlayerModal
        video={mockVideo}
        isOpen={true}
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByText("削除"));
    expect(window.confirm).toHaveBeenCalledWith("この動画を削除しますか？");
    expect(mockDeleteMutate).not.toHaveBeenCalled();

    window.confirm = originalConfirm;
  });

  test("削除確認でOKを押すとdeleteVideo.mutateを呼び出す", () => {
    const handleClose = vi.fn();
    const originalConfirm = window.confirm;
    window.confirm = vi.fn().mockReturnValue(true);

    render(
      <VideoPlayerModal
        video={mockVideo}
        isOpen={true}
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByText("削除"));
    expect(mockDeleteMutate).toHaveBeenCalledWith(1, expect.any(Object));

    window.confirm = originalConfirm;
  });

  test("編集ボタンを表示できる", () => {
    const handleClose = vi.fn();
    render(
      <VideoPlayerModal
        video={mockVideo}
        isOpen={true}
        onClose={handleClose}
      />,
    );

    expect(screen.getByLabelText("編集")).toBeInTheDocument();
  });
});
