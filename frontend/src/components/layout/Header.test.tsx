import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../theme";
import Header from "./Header";

describe("Header", () => {
  test("タイトルを表示できる", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={system}>
          <Header />
        </ChakraProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText("TV")).toBeInTheDocument();
  });

  test("ナビゲーションリンクを表示できる", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={system}>
          <Header />
        </ChakraProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText("一覧")).toBeInTheDocument();
    expect(screen.getByText("タイムライン")).toBeInTheDocument();
  });

  test("リンクは正しいhrefを持つ", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={system}>
          <Header />
        </ChakraProvider>
      </BrowserRouter>,
    );

    const dashboardLink = screen.getByText("一覧").closest("a");
    const timelineLink = screen.getByText("タイムライン").closest("a");

    expect(dashboardLink).toHaveAttribute("href", "/");
    expect(timelineLink).toHaveAttribute("href", "/timeline");
  });
});
