import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { render } from "../../test/render";
import Header from "./Header";

describe("Header", () => {
  test("タイトルを表示できる", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText("TV")).toBeInTheDocument();
  });

  test("ナビゲーションリンクを表示できる", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText("一覧")).toBeInTheDocument();
    expect(screen.getByText("タイムライン")).toBeInTheDocument();
  });

  test("リンクは正しいhrefを持つ", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const dashboardLink = screen.getByText("一覧").closest("a");
    const timelineLink = screen.getByText("タイムライン").closest("a");

    expect(dashboardLink).toHaveAttribute("href", "/");
    expect(timelineLink).toHaveAttribute("href", "/timeline");
  });
});
