import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: GitHub Pages liefert dieses Projekt unter dem Repository-Namen, nicht
// an der Domain-Wurzel. Ohne das laden die gebauten Assets von "/" und 404en.
//
// Am 22.08.2026 von /sop_dashboard/ auf /sop-dashboard/ umgestellt, weil das
// Repository umbenannt wurde (ENT-078). Wer den Namen erneut aendert, muss
// diese Zeile mitziehen -- sonst bleibt die Seite weiss, ohne Fehlermeldung.
export default defineConfig({
  base: "/sop-dashboard/",
  plugins: [react()],
  server: { port: 5173, host: true },
});
