import React, { useState, useEffect } from "react";
import { store } from "./store.js";
import { Panel, S as BASE, MONO } from "./ui.jsx";

/**
 * Werkzeug-Spuren — zweite Ansicht neben der Gate-Roadmap, seit ENT-006
 * (security-operations-platform, 00-projekt/entscheidungsprotokoll.md):
 * Statt einer Gesamtplattform werden einzelne, unabhängige Werkzeuge
 * entwickelt und im eigenen Betrieb pilotiert, mit eigener Validierung
 * pro Werkzeug statt einer einmaligen fürs Gesamtprojekt.
 *
 * Alle hier festgehaltenen Fakten stammen aus dem Hauptrepository:
 * 00-projekt/offene-punkte.md, entscheidungsprotokoll.md (ENT-003, ENT-006,
 * ENT-007), 01-gate1-problem-markt/rapport-tool-kernfrage.md,
 * 01-gate1-problem-markt/werkzeug-vision.md,
 * 99-recherche/wettbewerb/secplannet-analyse.md.
 * Nichts hier ist erfunden — nur nachgezogen. Bei Widerspruch zwischen
 * dieser Ansicht und dem Repository gilt immer das Repository.
 */
const TOOLS = [
  {
    id: "rapport-tool",
    num: "T1",
    name: "RAPPORT-TOOL",
    sub: "Veranstaltungs- und Verkehrsdienste",
    color: "#f472b6",
    context:
      "Ausgangspunkt: Die im eigenen Betrieb eingesetzte Software SecPlanNet bietet keine API oder " +
      "CSV-Import für extern erfasste Arbeitszeiten — bestätigt durch eine direkte Support-Anfrage " +
      "(siehe 99-recherche/wettbewerb/secplannet-analyse.md). Ob das eine echte strukturelle Lücke " +
      "oder eher eine UX-Frage ist, ist die zentrale offene Frage dieser Spur. Ist-Zustand: jeder " +
      "physische Rapport wird manuell ins System erfasst — erheblicher Aufwand. Vision: " +
      "Mitarbeiterstunden direkt mit Details aus dem digitalen Rapport erfassen und daraus im " +
      "Admin-Bereich automatisiert die Rechnung erstellen (siehe werkzeug-vision.md, V1).",
    stages: [
      {
        id: "t1-1",
        t: "Prototyp gebaut und intern getestet",
        d: "Google Sheets, ein Monat, ein Mitarbeiter. Erfolgreich im eigenen Betrieb — das ist n=1, kein Marktsignal.",
        ref: "ENT-006",
      },
      {
        id: "t1-2",
        t: "Testauswertung abgeschlossen",
        d: "Was wurde erfasst, wo hakte es — inklusive der drei Kontrollfragen aus der Kernfrage-Datei.",
        ref: "OP-11",
      },
      {
        id: "t1-3",
        t: "Kernfrage beantwortet",
        d: "Warum wird SecPlanNets integrierte Zeiterfassung nicht genutzt? Die Antwort entscheidet über die Art des Produkts — strukturelle Lücke, UX-Frage oder Gewohnheit.",
        ref: "OP-10 · rapport-tool-kernfrage.md",
      },
      {
        id: "t1-4",
        t: "GAV-Rolle für dieses Werkzeug entschieden",
        d: "Pro Werkzeug-Spur einzeln zu prüfen, nicht einmalig fürs Gesamtprojekt.",
        ref: "ENT-003 · ENT-006",
      },
      {
        id: "t1-5",
        t: "Extern validiert",
        d: "Durch Interviews bestätigt, dass die Lücke kein Einzelfall des eigenen Betriebs ist.",
        ref: "AB-04 · secplannet-analyse.md",
      },
      {
        id: "t1-6",
        t: "Mindest-Datenmodell berücksichtigt",
        d: "Gemeinsame Begriffe (Kunde, Objekt, Mitarbeiter, Einsatz) mit künftigen Werkzeug-Spuren abgestimmt, damit eine spätere Zusammenführung nicht verbaut wird.",
        ref: "OP-12",
      },
    ],
  },
];

/**
 * Grobe Vision weiterer künftiger Werkzeuge — Antwort auf OP-13, siehe
 * 01-gate1-problem-markt/werkzeug-vision.md. Ausdrücklich noch nicht in
 * Etappen aufgegliedert (keine Checkboxen), da noch nicht im Detail
 * ausgearbeitet — jeder Punkt wird laut Projektinhaber separat
 * aufgegriffen, wenn er dran ist.
 */
const VISION = [
  {
    id: "v2",
    num: "V2",
    name: "EINSATZPLANUNG: DIKTIER-TOOL",
    color: "#22d3ee",
    ist: "Die Einsatzplanung wird aktuell manuell vom Chef in eine Excel-Datei geschrieben und per Chat verschickt.",
    vision: "Diktier-Funktion innerhalb der Planungsseite, sodass Spracheingabe optional zusätzlich zur Tastatur möglich ist.",
  },
  {
    id: "v3",
    num: "V3",
    name: "REVIERDIENST-TOOL",
    color: "#a78bfa",
    ist: null,
    vision: "Ein abgespeckter Bereich, angelehnt an eine Funktion von COREDINATE — definierte Rundgänge mit GPS-Punkten anlegen können.",
  },
  {
    id: "v4",
    num: "V4",
    name: "ZENTRALISIERUNGSZIEL",
    color: "#f0b429",
    ist: "Aktuell verteilt auf SecPlanNet (SynComNet), COREDINATE und AbaNinja (Rechnungsstellung).",
    vision: "Diese Funktionen sollen langfristig zentral an einem Ort zusammenlaufen. Direkt relevant für OP-12 (Mindest-Datenmodell) — ohne gemeinsames Datenmodell zwischen den Werkzeugen bleibt das Ziel unerreichbar.",
  },
];

const KEY = "sop-tooltracks-v1";

export default function ToolTracks() {
  const [done, setDone] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await store.get(KEY);
        if (raw) setDone(JSON.parse(raw).done || {});
      } catch (e) { /* noch nichts gespeichert */ }
      setLoaded(true);
    })();
  }, []);

  const toggle = async (id) => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    try {
      await store.set(KEY, JSON.stringify({ done: next }));
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch (e) { /* Zustand bleibt im Speicher */ }
  };

  if (!loaded) {
    return <div style={{ padding: 40, textAlign: "center", fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: "#3d5a6b" }}>INITIALISIERE …</div>;
  }

  return (
    <div>
      <Panel label="WERKZEUG-SPUREN" right={`${TOOLS.length} SPUR${TOOLS.length === 1 ? "" : "EN"}`}>
        <div style={BASE.cardLede}>
          Seit ENT-006: statt einer Gesamtplattform einzelne, unabhängige Werkzeuge — entwickelt,
          im eigenen Betrieb pilotiert und je für sich extern validiert. Diese Ansicht ist von der
          Gate-Struktur getrennt; ein Werkzeug kann weit fortgeschritten sein, während Gate 1 für
          das Gesamtprojekt noch offen ist.
        </div>
      </Panel>

      <div style={BASE.alert}>
        <span style={BASE.alertTag}>N=1</span>
        Ein erfolgreicher interner Test ist keine Marktvalidierung. Diese Warnung gilt für jede
        Werkzeug-Spur einzeln, nicht nur einmal fürs Gesamtprojekt.
      </div>

      {TOOLS.map((tool) => {
        const d = tool.stages.filter((s) => done[s.id]).length;
        const pct = Math.round((d / tool.stages.length) * 100);
        return (
          <Panel key={tool.id} label={`${tool.num} · ${tool.name}`} right={`${d}/${tool.stages.length}`}>
            <div style={{ fontSize: 12, fontWeight: 600, color: tool.color, letterSpacing: "0.03em", marginBottom: 4 }}>
              {tool.sub}
            </div>
            <div style={BASE.cardLede}>{tool.context}</div>

            <div style={{ height: 3, background: "#0e2129", borderRadius: 1.5, overflow: "hidden", marginBottom: 14 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: tool.color, boxShadow: d ? `0 0 6px ${tool.color}` : "none", transition: "width .45s cubic-bezier(.4,0,.2,1)" }} />
            </div>

            {tool.stages.map((s, i) => {
              const on = !!done[s.id];
              return (
                <div key={s.id} style={{ display: "flex", gap: 11, padding: "10px 0", borderBottom: i === tool.stages.length - 1 ? "none" : "1px solid #0b171d" }}>
                  <button
                    onClick={() => toggle(s.id)}
                    className="bx"
                    aria-label={on ? "Als offen markieren" : "Als erledigt markieren"}
                    style={{ width: 16, height: 16, minWidth: 16, marginTop: 2, borderRadius: 2, border: "1px solid", borderColor: on ? tool.color : "#1e3a44", background: on ? tool.color + "22" : "transparent", cursor: "pointer", display: "grid", placeItems: "center", padding: 0, transition: "all .15s" }}
                  >
                    {on && <span style={{ fontSize: 10, lineHeight: 1, color: tool.color }}>✓</span>}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.35, color: on ? "#3d5a6b" : "#d5e5ec", textDecoration: on ? "line-through" : "none" }}>
                      {s.t}
                    </div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#456876", marginTop: 3 }}>{s.d}</div>
                    <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em", color: "#2a4652", marginTop: 4 }}>{s.ref}</div>
                  </div>
                </div>
              );
            })}
          </Panel>
        );
      })}

      <Panel label="VISION — WEITERE WERKZEUGE" right={`${VISION.length} PUNKTE · GROB`}>
        <div style={BASE.cardLede}>
          Antwort auf OP-13, siehe <code>01-gate1-problem-markt/werkzeug-vision.md</code> im
          Hauptrepository. Ausdrücklich eine grobe Fassung — noch nicht in Etappen aufgegliedert.
          Jeder Punkt wird separat aufgegriffen, wenn er dran ist.
        </div>
        {VISION.map((v, i) => (
          <div key={v.id} style={{ padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid #0b171d" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, color: v.color, letterSpacing: "0.08em" }}>{v.num}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#d5e5ec", letterSpacing: "0.02em" }}>{v.name}</span>
            </div>
            {v.ist && (
              <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#456876", marginBottom: 4 }}>
                <span style={{ color: "#2a4652" }}>Ist: </span>{v.ist}
              </div>
            )}
            <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#8fb0bd" }}>
              <span style={{ color: "#2a4652" }}>Vision: </span>{v.vision}
            </div>
          </div>
        ))}
      </Panel>

      <Panel label="STATUS" right={saved ? "GESPEICHERT" : "SYNC · BEREIT"}>
        <div style={{ ...BASE.cardLede, marginBottom: 0 }}>
          Die grobe Vision steht (siehe oben), die Reihenfolge und Detailausarbeitung der
          künftigen Werkzeuge sind laut ENT-006/ENT-007 noch offen. Kein Präzedenzfall: eine neue
          Spur mit eigenen Etappen entsteht erst durch eine eigene Entscheidung, keinen
          Automatismus.
        </div>
      </Panel>
    </div>
  );
}
