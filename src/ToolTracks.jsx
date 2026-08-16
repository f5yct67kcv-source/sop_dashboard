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
 * 00-projekt/offene-punkte.md, entscheidungsprotokoll.md (ENT-003, ENT-006),
 * 01-gate1-problem-markt/rapport-tool-kernfrage.md,
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
      "oder eher eine UX-Frage ist, ist die zentrale offene Frage dieser Spur.",
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

      <Panel label="STATUS" right={saved ? "GESPEICHERT" : "SYNC · BEREIT"}>
        <div style={{ ...BASE.cardLede, marginBottom: 0 }}>
          Weitere Werkzeug-Spuren werden ergänzt, sobald sie entschieden sind — die Reihenfolge
          künftiger Werkzeuge ist laut ENT-006 selbst noch offen. Kein Präzedenzfall: eine neue
          Spur braucht eine eigene Entscheidung, keinen Automatismus.
        </div>
      </Panel>
    </div>
  );
}
