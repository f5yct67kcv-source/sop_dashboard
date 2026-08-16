import React, { useState, useEffect } from "react";
import Roadmap from "./Roadmap.jsx";
import ToolTracks from "./ToolTracks.jsx";
import { store } from "./store.js";
import { S, CSS, MONO } from "./ui.jsx";

const VIEWS = [
  { id: "roadmap", label: "PROJEKTVERLAUF" },
  { id: "tools", label: "WERKZEUG-SPUREN" },
];
const KEY = "sop-view-v1";

export default function App() {
  const [view, setView] = useState("roadmap");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await store.get(KEY);
        if (raw === "roadmap" || raw === "tools") setView(raw);
      } catch (e) { /* Standardansicht bleibt */ }
      setLoaded(true);
    })();
  }, []);

  const select = (id) => {
    setView(id);
    store.set(KEY, id).catch(() => {});
  };

  if (!loaded) {
    return <div style={{ minHeight: "100vh", background: "#050708", color: "#3d5a6b", display: "grid", placeItems: "center", fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em" }}>INITIALISIERE …</div>;
  }

  return (
    <div style={S.page}>
      <style>{CSS}</style>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <span style={S.navLogo}>
            <span style={S.navDot} />
            SOP
          </span>
          <div style={S.navTabs}>
            {VIEWS.map((v) => (
              <button key={v.id} className="nv" onClick={() => select(v.id)} style={S.navTab(view === v.id)}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {view === "roadmap" ? <Roadmap /> : (
        <div style={S.inner}>
          <ToolTracks />
        </div>
      )}
    </div>
  );
}
