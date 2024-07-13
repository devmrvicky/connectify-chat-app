import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["@radix-ui/themes"],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/socket.io": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/socket.io/, ""),
      },
    },
  },
});
