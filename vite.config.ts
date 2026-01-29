/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
  resolve: {
    alias: [
      { find: "@app", replacement: path.resolve(__dirname, "src/app") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@widgets", replacement: path.resolve(__dirname, "src/widgets") },
      { find: "@features", replacement: path.resolve(__dirname, "src/features") },
      { find: "@entities", replacement: path.resolve(__dirname, "src/entities") },
      { find: "@shared", replacement: path.resolve(__dirname, "src/shared") },
    ],
  },
});
