import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import react from "@vitejs/plugin-react-swc";
import path from "path";
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
    nodePolyfills({ protocolImports: true, globals: { Buffer: true, process: true } })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
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
