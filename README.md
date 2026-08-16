# sop_dashboard — Verwaltungswerkzeug für security-operations-platform

Kein Projektinhalt — ein Fortschritts- und Übersichts-Dashboard für das
Projekt in [security-operations-platform](https://github.com/f5yct67kcv-source/-security-operations-platform-).
Siehe dort `CLAUDE.md` (Ablagestruktur, Eintrag `dashboard/`) und
`START-HIER.md` für die formale Einordnung dieses separaten Repositories.

## Starten

```bash
npm install
npm run dev
```

Läuft dann auf http://localhost:5173

## Zwei Ansichten

- **Projektverlauf** — die Gate-Roadmap (`src/Roadmap.jsx`): fünf Phasen,
  einzelne Schritte, Abbruchkriterien, offene GAV-Auslegungen.
- **Werkzeug-Spuren** — (`src/ToolTracks.jsx`), seit ENT-006: statt einer
  Gesamtplattform werden einzelne, unabhängige Werkzeuge entwickelt und im
  eigenen Betrieb pilotiert. Diese Ansicht ist von der Gate-Struktur getrennt
  und zeigt den Fortschritt je Werkzeug (aktuell: das Rapport-Tool).

`src/App.jsx` schaltet zwischen beiden um, `src/main.jsx` ist der
Einstiegspunkt.

## Stand übertragen

Der Fortschritt wandert nicht automatisch zwischen Artefakt und lokaler
Version. Im Panel „Stand sichern" der Projektverlauf-Ansicht:

1. In der einen Umgebung **Exportieren** — erzeugt eine JSON-Datei
2. In der anderen **Einlesen**

Die Werkzeug-Spuren-Ansicht speichert ihren eigenen Fortschritt separat
(eigener Storage-Key) und hat noch kein eigenes Export/Import — bislang nur
eine Spur, kein akuter Bedarf.

## Struktur

```
index.html
vite.config.js
src/
  main.jsx        Einstiegspunkt, rendert App
  App.jsx          Navigation zwischen den beiden Ansichten
  Roadmap.jsx      Gate-Roadmap — byte-identisch mit dem Claude-Artefakt,
                    bewusst NICHT verändert für den Werkzeug-Spuren-Ausbau
  ToolTracks.jsx   Werkzeug-Spuren-Ansicht
  ui.jsx           gemeinsame Bausteine (Panel, Farben, Schriften) für
                    App.jsx und ToolTracks.jsx
  store.js         Speicher-Abstraktion (window.storage bzw. localStorage),
                    gleiche Logik wie in Roadmap.jsx, dort bewusst dupliziert
                    statt exportiert
```

## Wichtig: `Roadmap.jsx` ist die kanonische Quelle

`src/Roadmap.jsx` muss byte-identisch mit dem im Claude-Artefakt laufenden
Code bleiben. Änderungen am Design fliessen von dort hierher, nicht
umgekehrt — kein Parallelstand. Neue Ansichten (wie `ToolTracks.jsx`) werden
deshalb als eigene Dateien daneben gebaut, nicht durch Umbau von
`Roadmap.jsx` selbst.
