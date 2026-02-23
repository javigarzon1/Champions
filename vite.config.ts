import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import componentTagger from "vite-plugin-component-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  define: {
    __APP_ENV__: JSON.stringify(mode)
  },

  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
}));