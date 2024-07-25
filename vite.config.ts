import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
    }),
  ],
  server: {
    port: 3000,
  },
});
