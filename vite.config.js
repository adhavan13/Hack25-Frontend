import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: true, // You can set to false if you prefer to disable the error overlay
    },
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
