"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import anime from "animejs";

// ─── Types ──────────────────────────────────────────────────────────────────
type StepId     = "engine" | "assets" | "interface" | "ready";
type StepStatus = "pending" | "active" | "done";

const STEPS: { id: StepId; label: string; tag: string }[] = [
  { id: "engine",    label: "Rendering engine",   tag: "0.1s" },
  { id: "assets",    label: "Loading assets",      tag: "~3s"  },
  { id: "interface", label: "Hydrating interface", tag: "0.5s" },
  { id: "ready",     label: "Experience ready",    tag: "0.1s" },
];

interface Props {
  frameProgress: { loaded: number; total: number };
  onComplete: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoadingScreen({ frameProgress, onComplete }: Props) {
  const overlayRef      = useRef<HTMLDivElement>(null);
  const exitStartedRef  = useRef(false);
  const onCompleteRef   = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const [statuses, setStatuses] = useState<Record<StepId, StepStatus>>({
    engine:    "active",
    assets:    "pending",
    interface: "pending",
    ready:     "pending",
  });

  // Rolling log — keep last 5 lines
  const [log, setLog] = useState<string[]>(["› starting rendering engine..."]);
  const pushLog = useCallback((msg: string) => {
    setLog(prev => [...prev.slice(-4), msg]);
  }, []);

  // Helper: advance from → to
  const advance = useCallback((from: StepId, to: StepId) => {
    setStatuses(prev => ({ ...prev, [from]: "done", [to]: "active" }));
  }, []);
  const finish = useCallback((id: StepId) => {
    setStatuses(prev => ({ ...prev, [id]: "done" }));
  }, []);

  // ── Trigger the curtain-up exit via anime.js ─────────────────────────────
  const triggerExit = useCallback(() => {
    if (exitStartedRef.current || !overlayRef.current) return;
    exitStartedRef.current = true;
    anime({
      targets:    overlayRef.current,
      translateY: "-100%",
      duration:   700,
      easing:     "easeInExpo",
      complete:   () => onCompleteRef.current(),
    });
  }, []);

  // ── Step 0 → 1: engine done after 350 ms ────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      advance("engine", "assets");
      pushLog("✓ engine ready");
      pushLog("› preloading frame sequence (100 frames)...");
    }, 350);
    return () => clearTimeout(t);
  }, [advance, pushLog]);

  // ── Step 1 → 2: assets done when all frames loaded ──────────────────────
  useEffect(() => {
    if (statuses.assets !== "active") return;
    if (frameProgress.total > 0 && frameProgress.loaded >= frameProgress.total) {
      advance("assets", "interface");
      pushLog("✓ all assets cached");
      pushLog("› hydrating component tree...");
    }
  }, [frameProgress, statuses.assets, advance, pushLog]);

  // Safety timeout so loader never stalls if frames fail to load
  useEffect(() => {
    if (statuses.assets !== "active") return;
    const t = setTimeout(() => {
      if (statuses.assets === "active") {
        advance("assets", "interface");
        pushLog("› continuing (timeout)...");
      }
    }, 12000);
    return () => clearTimeout(t);
  }, [statuses.assets, advance, pushLog]);

  // ── Step 2 → 3: interface done after 500 ms ─────────────────────────────
  useEffect(() => {
    if (statuses.interface !== "active") return;
    const t = setTimeout(() => {
      advance("interface", "ready");
      pushLog("✓ interface hydrated");
    }, 500);
    return () => clearTimeout(t);
  }, [statuses.interface, advance, pushLog]);

  // ── Step 3: ready → exit after 350 ms ───────────────────────────────────
  useEffect(() => {
    if (statuses.ready !== "active") return;
    const t = setTimeout(() => {
      finish("ready");
      pushLog("✓ experience ready");
      triggerExit();
    }, 350);
    return () => clearTimeout(t);
  }, [statuses.ready, finish, pushLog, triggerExit]);

  // ── Rolling log: one line every 10 frames during asset loading ───────────
  useEffect(() => {
    if (statuses.assets !== "active") return;
    if (frameProgress.loaded > 0 && frameProgress.loaded % 10 === 0) {
      pushLog(`› frame_${String(frameProgress.loaded).padStart(2, "0")} / ${frameProgress.total} cached`);
    }
  }, [frameProgress.loaded, statuses.assets, pushLog, frameProgress.total]);

  // ── Derived progress % ───────────────────────────────────────────────────
  const pct = frameProgress.total > 0
    ? Math.min(100, Math.round((frameProgress.loaded / frameProgress.total) * 100))
    : 0;

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Inject spin keyframe once */}
      <style>{`@keyframes ls-spin { to { transform: rotate(360deg); } }`}</style>

      <div
        ref={overlayRef}
        role="status"
        aria-label="Loading portfolio"
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9999,
          backgroundColor: "#000000",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          willChange:      "transform",
          fontFamily:      "ui-monospace, 'SF Mono', 'Fira Code', Menlo, monospace",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", color: "rgba(255,255,255,0.28)", marginBottom: 6, textTransform: "uppercase" }}>
            Initializing
          </div>
          <div style={{ fontSize: 13, letterSpacing: "0.3em", color: "rgba(255,255,255,0.70)", fontWeight: 600, textTransform: "uppercase" }}>
            Arun Alur
          </div>
        </div>

        {/* ── Steps card ─────────────────────────────────────────────── */}
        <div style={{
          width:           "min(480px, calc(100vw - 40px))",
          border:          "1px solid rgba(255,255,255,0.07)",
          borderRadius:    12,
          padding:         "22px 24px",
          backgroundColor: "rgba(255,255,255,0.018)",
        }}>
          {STEPS.map((step, i) => {
            const status  = statuses[step.id];
            const isLast  = i === STEPS.length - 1;
            const isAsset = step.id === "assets";

            return (
              <div key={step.id}>
                {/* Row */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

                  {/* Status icon */}
                  <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {status === "done" ? (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7" stroke="rgba(255,255,255,0.35)" />
                        <path d="M4.5 7.5l2 2 4-4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : status === "active" ? (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                        style={{ animation: "ls-spin 1.1s linear infinite" }}>
                        <circle cx="7.5" cy="7.5" r="7" stroke="rgba(255,255,255,0.10)" strokeWidth="1.4" />
                        <path d="M7.5 0.5A7 7 0 0 1 14.5 7.5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="7.5" cy="7.5" r="7" stroke="rgba(255,255,255,0.10)" />
                      </svg>
                    )}
                  </div>

                  {/* Label + live count */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize:      12,
                      letterSpacing: "0.06em",
                      color: status === "pending" ? "rgba(255,255,255,0.18)"
                           : status === "active"  ? "rgba(255,255,255,0.85)"
                           :                        "rgba(255,255,255,0.40)",
                      transition: "color 0.3s ease",
                    }}>
                      {step.label}
                    </span>
                    {isAsset && status === "active" && frameProgress.total > 0 && (
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 10 }}>
                        {frameProgress.loaded} / {frameProgress.total}
                      </span>
                    )}
                  </div>

                  {/* Tag badge */}
                  <div style={{
                    fontSize:        10,
                    letterSpacing:   "0.04em",
                    color:           "rgba(255,255,255,0.16)",
                    border:          "1px solid rgba(255,255,255,0.07)",
                    borderRadius:    4,
                    padding:         "2px 8px",
                    flexShrink:      0,
                  }}>
                    {step.tag}
                  </div>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div style={{
                    width:           1,
                    height:          22,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    marginLeft:      7,
                    marginTop:       5,
                    marginBottom:    5,
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Progress ───────────────────────────────────────────────── */}
        <div style={{ width: "min(480px, calc(100vw - 40px))", marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
              Progress
            </span>
            <span style={{ fontSize: 9, letterSpacing: "0.08em", color: "rgba(255,255,255,0.32)", fontVariantNumeric: "tabular-nums" }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height:          "100%",
              width:           `${pct}%`,
              backgroundColor: "rgba(255,255,255,0.50)",
              borderRadius:    999,
              transition:      "width 0.25s ease",
            }} />
          </div>
        </div>

        {/* ── Live log ───────────────────────────────────────────────── */}
        <div style={{
          width:           "min(480px, calc(100vw - 40px))",
          marginTop:       14,
          border:          "1px solid rgba(255,255,255,0.05)",
          borderRadius:    8,
          padding:         "12px 16px",
          backgroundColor: "rgba(255,255,255,0.012)",
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "rgba(255,255,255,0.18)", marginBottom: 9, textTransform: "uppercase" }}>
            Live Log
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {log.map((line, i) => (
              <div key={`${i}-${line}`} style={{
                fontSize:      10,
                letterSpacing: "0.04em",
                color: i === log.length - 1
                  ? "rgba(255,255,255,0.50)"
                  : "rgba(255,255,255,0.20)",
                transition: "color 0.2s ease",
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
