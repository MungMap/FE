import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
    }),
  ],
  resolve: {
    alias: {
      "slick-carousel/slick/slick.css": path.resolve(
        __dirname,
        "node_modules/slick-carousel/slick/slick.css"
      ),
      "slick-carousel/slick/slick-theme.css": path.resolve(
        __dirname,
        "node_modules/slick-carousel/slick/slick-theme.css"
      ),
    },
  },
  server: {
    port: 3000,
  },
});
