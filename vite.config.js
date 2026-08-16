import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: GitHub Pages liefert dieses Projekt unter /sop_dashboard/, nicht an
// der Domain-Wurzel. Ohne das laden die gebauten Assets von "/" und 404en.
export default defineConfig({
  base: "/sop_dashboard/",
  plugins: [react()],
  server: { port: 5173, host: true },
});
