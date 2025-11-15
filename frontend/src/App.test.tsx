import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
  test("renders title", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /TV/i });
    expect(heading).toBeInTheDocument();
  });
});
