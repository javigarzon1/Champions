import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import componentTagger from "vite-plugin-component-tagger";
// https://vitejs.dev/config/
  export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
});
