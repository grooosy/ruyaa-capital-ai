import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { tempo } from "tempo-devtools/dist/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  plugins: [react(), nodePolyfills({ protocolImports: true, globals: { Buffer: true, process: true } }), process.env.VITE_TEMPO === "true" ? tempo() : undefined].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(process.env.VITE_TEMPO === "true"
        ? {}
        : { "tempo-routes": path.resolve(__dirname, "./src/empty-tempo-routes.ts") }),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },

}));
