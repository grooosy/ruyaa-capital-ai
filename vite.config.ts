import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // @ts-expect-error -- allowedHosts is not typed in vite types
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  plugins: [react(), process.env.VITE_TEMPO === "true" ? tempo() : undefined].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(process.env.VITE_TEMPO === "true"
        ? {}
        : { "tempo-routes": path.resolve(__dirname, "./src/empty-tempo-routes.ts") }),
    },
  },
}));
