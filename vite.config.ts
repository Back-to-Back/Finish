import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
//import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/



export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    react(),
    // Optionally disable componentTagger if needed:
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  root: './', // Ensure the root is set correctly
}));
