/**
 * Gemeinsame visuelle Bausteine für App.jsx und ToolTracks.jsx.
 * Roadmap.jsx trägt ihr eigenes Panel/Styling weiterhin inline, damit die
 * Datei byte-identisch mit dem Claude-Artefakt bleibt — hier bewusst
 * dupliziert statt aus Roadmap.jsx exportiert.
 */
export const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
export const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const CSS = `
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  .bx:hover { filter: brightness(1.5); }
  .lk:hover { color: #22d3ee !important; }
  .sh:hover { opacity: .78; }
  .nv:hover { color: #c8dae2 !important; }
  textarea:focus, button:focus-visible { outline: 1px solid #22d3ee; outline-offset: 2px; }
  ::selection { background: #22d3ee44; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;

export const S = {
  page: { minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #071319 0%, #050708 55%)", color: "#c8dae2", fontFamily: SANS },
  inner: { padding: "14px 12px 44px", maxWidth: 720, margin: "0 auto" },

  nav: { position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: 4, padding: "10px 12px", background: "rgba(5,7,8,.92)", backdropFilter: "blur(6px)", borderBottom: "1px solid #0e2129" },
  navInner: { display: "flex", alignItems: "center", gap: 4, maxWidth: 720, margin: "0 auto", width: "100%" },
  navLogo: { fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: "#e8f4f8", marginRight: 10, display: "flex", alignItems: "center", gap: 7 },
  navDot: { width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" },
  navTabs: { display: "flex", gap: 2, flex: 1 },
  navTab: (active) => ({
    fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", padding: "7px 11px",
    background: active ? "rgba(34,211,238,.08)" : "transparent",
    border: "1px solid", borderColor: active ? "rgba(34,211,238,.35)" : "transparent",
    borderRadius: 2, color: active ? "#22d3ee" : "#4e7a8a", cursor: "pointer", transition: "all .15s",
  }),

  panel: { position: "relative", background: "linear-gradient(180deg, rgba(9,20,26,.85), rgba(6,12,15,.85))", border: "1px solid #0e2129", borderRadius: 3, marginBottom: 10 },
  corner: { position: "absolute", width: 9, height: 9, borderStyle: "solid", borderColor: "#22d3ee", opacity: 0.5, pointerEvents: "none" },
  panelHead: { display: "flex", alignItems: "center", gap: 7, padding: "9px 13px", borderBottom: "1px solid #0c1c23" },
  panelDot: { width: 6, height: 6, background: "#1a4a58", borderRadius: 1 },
  panelLbl: { fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.2em", color: "#4e7a8a", flex: 1 },
  panelRight: { fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.14em", color: "#2a4652" },
  panelBody: { padding: 13 },

  cardLede: { fontSize: 11.5, lineHeight: 1.55, color: "#456876", marginBottom: 11 },
  alert: { display: "flex", alignItems: "center", gap: 9, background: "rgba(240,180,41,.06)", border: "1px solid rgba(240,180,41,.22)", borderRadius: 3, padding: "10px 13px", fontSize: 12, lineHeight: 1.5, color: "#d4b877", marginBottom: 10 },
  alertTag: { fontFamily: MONO, fontSize: 8, letterSpacing: "0.18em", color: "#f0b429", border: "1px solid rgba(240,180,41,.35)", borderRadius: 2, padding: "2px 5px", whiteSpace: "nowrap" },

  foot: { display: "flex", alignItems: "center", gap: 12, fontFamily: MONO, fontSize: 9.5, color: "#2a4652", textAlign: "center", marginTop: 22, lineHeight: 1.6, letterSpacing: "0.04em" },
  footLine: { flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #12222a, transparent)" },
};

export function Panel({ label, right, children }) {
  return (
    <section style={S.panel}>
      <span style={{ ...S.corner, top: -1, left: -1, borderWidth: "1px 0 0 1px" }} />
      <span style={{ ...S.corner, top: -1, right: -1, borderWidth: "1px 1px 0 0" }} />
      <span style={{ ...S.corner, bottom: -1, left: -1, borderWidth: "0 0 1px 1px" }} />
      <span style={{ ...S.corner, bottom: -1, right: -1, borderWidth: "0 1px 1px 0" }} />
      <div style={S.panelHead}>
        <span style={S.panelDot} />
        <span style={S.panelLbl}>// {label}</span>
        {right && <span style={S.panelRight}>{right}</span>}
      </div>
      <div style={S.panelBody}>{children}</div>
    </section>
  );
}
