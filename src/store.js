/**
 * Speicher-Abstraktion, geteilt von App.jsx und ToolTracks.jsx.
 * Im Claude-Artefakt: window.storage (persistiert über Sitzungen).
 * In einem eigenen Vite/React-Projekt: localStorage.
 * Ohne beides: nur im Arbeitsspeicher, Stand geht beim Neuladen verloren.
 *
 * Roadmap.jsx trägt dieselbe Logik weiterhin inline, damit die Datei
 * byte-identisch mit dem Claude-Artefakt bleibt (siehe dortiger Kommentar).
 */
export const store = {
  async get(key) {
    if (typeof window !== "undefined" && window.storage?.get) {
      const r = await window.storage.get(key);
      return r?.value ?? null;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  async set(key, value) {
    if (typeof window !== "undefined" && window.storage?.set) {
      await window.storage.set(key, value);
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  mode() {
    if (typeof window === "undefined") return "kein Speicher";
    if (window.storage?.get) return "Artefakt";
    if (window.localStorage) return "lokal";
    return "kein Speicher";
  },
};
