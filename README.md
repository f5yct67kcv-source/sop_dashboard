# SOP Roadmap — eigenständige Version

Dieselbe Datei wie das Claude-Artefakt. Der Speicher erkennt die Umgebung selbst:
im Artefakt `window.storage`, hier `localStorage`.

## Starten

```bash
npm install
npm run dev
```

Läuft dann auf http://localhost:5173

## Stand übertragen

Der Fortschritt wandert nicht automatisch zwischen Artefakt und lokaler Version.
Im Panel „Stand sichern" unten:

1. In der einen Umgebung **Exportieren** — erzeugt eine JSON-Datei
2. In der anderen **Einlesen**

## Struktur

```
index.html
vite.config.js
src/
  main.jsx        Einstiegspunkt
  Roadmap.jsx     die eigentliche Komponente (identisch mit dem Artefakt)
```

Änderungen an `Roadmap.jsx` funktionieren in beiden Umgebungen, solange
`window.storage` nicht direkt aufgerufen wird — dafür ist die `store`-Abstraktion
oben in der Datei zuständig.
