import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { tempo } from "tempo-devtools/dist/vite"; // tempo-devtools removed
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/ruyaa-ai-capital-flow/' : '/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  plugins: [
    react(), 
    nodePolyfills({ protocolImports: true, globals: { Buffer: true, process: true } }), 
    // process.env.VITE_TEMPO === "true" ? tempo() : undefined // tempo-devtools removed
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // ...(process.env.VITE_TEMPO === "true" // tempo-devtools removed
      //   ? {}
      //   : { "tempo-routes": path.resolve(__dirname, "./src/empty-tempo-routes.ts") }),
      // Always use empty-tempo-routes if tempo is removed
      "tempo-routes": path.resolve(__dirname, "./src/empty-tempo-routes.ts"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true }), 
        NodeModulesPolyfillPlugin()
      ],
    },
  },
}));
