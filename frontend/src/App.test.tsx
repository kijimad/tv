import { describe, expect, test, vi } from "vitest";

vi.mock("./hooks/useVideos", () => ({
  useVideos: () => ({
    data: { pager: { page: 1, size: 30, totalCount: 0 }, data: [] },
    isLoading: false,
    error: null,
  }),
}));

vi.mock("./hooks/useThumbnail", () => ({
  useThumbnail: () => "http://localhost:8080/api/v1/videos/1/thumbnail",
}));

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "./test/render";
import App from "./App";

describe("App", () => {
  test("レンダリングできる", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /TV/i });
    expect(heading).toBeInTheDocument();
  });
});
