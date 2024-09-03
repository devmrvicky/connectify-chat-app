import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "generateSW",
      // when using strategies 'injectManifest' you need to provide the srcDir
      // srcDir: 'src',
      // when using strategies 'injectManifest' use claims-sw.js or prompt-sw.js
      // filename: 'prompt-sw.js',
      registerType: "prompt",
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
        htmlPreset: "2023",
        overrideManifestIcons: true,
      },
      manifest: {
        name: "connectify - chat app",
        short_name: "connectify - chat app",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "android-chrome-192x192-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-192x192-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        id: "connectify",
        description:
          "Connectify is a real-time chat app for seamless communication. Share text and files and stay connected across all your devices.",
        dir: "ltr",
        orientation: "natural",
        display_override: ["window-controls-overlay", "standalone"],
        categories: ["social"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,svg,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,svg,ico}"],
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
      },
    }),
  ],
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
