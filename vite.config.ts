import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow configurable hosts via env, fallback to TEMPO flag for development
    // @ts-expect-error -- allowedHosts expects string[] | string
    allowedHosts:
      process.env.ALLOWED_HOSTS?.split(',').map((h) => h.trim()).filter(Boolean) ||
      (process.env.TEMPO === "true" ? "all" : undefined),
  },
  plugins: [
    react(),
    tempo(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
