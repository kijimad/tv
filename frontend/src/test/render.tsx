import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as originalRender,
  renderHook as originalRenderHook,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { system } from "../theme";
import type { RenderHookOptions, RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

export const render = (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper"> = {},
) => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  const renderResult = originalRender(ui, {
    ...options,
    wrapper: (props) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system} {...props} />
      </QueryClientProvider>
    ),
  });

  return { ...renderResult, user };
};

export const renderHook = <Result, Props>(
  hook: (initialProps: Props) => Result,
  options: Omit<RenderHookOptions<Props>, "wrapper"> = {},
) => {
  const queryClient = new QueryClient();

  return originalRenderHook(hook, {
    ...options,
    wrapper: (props) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system} {...props} />
      </QueryClientProvider>
    ),
  });
};
