import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { queryClient } from "./api/queries";
import { system } from "./theme";
import App from "./App";

describe("App", () => {
  test("レンダリングできる", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>,
    );
    const heading = screen.getByRole("heading", { name: /TV/i });
    expect(heading).toBeInTheDocument();
  });
});
