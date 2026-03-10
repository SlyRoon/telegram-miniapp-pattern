import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import path from "path"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    // Allow Telegram WebApp previews via ngrok in dev mode
    allowedHosts: [".ngrok-free.dev", ".ngrok.io"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
