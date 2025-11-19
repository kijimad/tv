import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "#ffffff" },
          subtle: { value: "#f8fafc" },
          muted: { value: "#f1f5f9" },
        },
        fg: {
          DEFAULT: { value: "#0f172a" },
          muted: { value: "#64748b" },
          subtle: { value: "#94a3b8" },
        },
        border: {
          DEFAULT: { value: "#e2e8f0" },
          muted: { value: "#f1f5f9" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg",
      color: "fg",
    },
  },
});
