"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";

// ── Above-the-fold: eagerly imported ────────────────────────────────────────
import ScrollyCanvas  from "@/components/ScrollyCanvas";
import Overlay        from "@/components/Overlay";
import { Logo }       from "@/components/Logo";
import { NavBarDemo } from "@/components/NavBarDemo";
import LoadingScreen  from "@/components/LoadingScreen";
import BackToTop      from "@/components/BackToTop";

// ── Below-the-fold: code-split so they don't inflate the initial bundle ─────
const About        = dynamic(() => import("@/components/About").then(m => ({ default: m.About })));
const TimelineDemo = dynamic(() => import("@/components/TimelineDemo").then(m => ({ default: m.TimelineDemo })));
const Projects     = dynamic(() => import("@/components/Projects"));
const TechMarquee  = dynamic(() => import("@/components/TechMarquee"));
const Skills       = dynamic(() => import("@/components/Skills").then(m => ({ default: m.Skills })));
const Contact      = dynamic(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer       = dynamic(() => import("@/components/Footer"));

export default function Home() {
  // false = loading in progress; true = loader has exited
  const [loaded, setLoaded] = useState(false);

  // Frame progress fed from ScrollyCanvas → LoadingScreen.
  // Throttled to ~20 updates (every 5 frames) inside ScrollyCanvas.
  const [frameProgress, setFrameProgress] = useState({ loaded: 0, total: 100 });

  const handleProgress = useCallback((l: number, t: number) => {
    setFrameProgress({ loaded: l, total: t });
  }, []);

  return (
    <>
      {/* ── Loading curtain ─────────────────────────────────────────────────
          Rendered outside `main` so it is never affected by the visibility
          toggle below. z-index 9999, pure black, covers absolutely everything.
          Unmounts only after the anime.js exit animation fires onComplete.   */}
      {!loaded && (
        <LoadingScreen
          frameProgress={frameProgress}
          onComplete={() => setLoaded(true)}
        />
      )}

      {/* ── Portfolio content ────────────────────────────────────────────────
          visibility:hidden  → layout computed, components mounted & preloading,
                               but NOTHING is painted until loaded = true.
          pointer-events:none → no accidental interaction while hidden.
          transition          → smooth fade-in after the curtain lifts.        */}
      <main
        className="relative min-h-screen bg-pure-black"
        style={{
          visibility:     loaded ? "visible" : "hidden",
          pointerEvents:  loaded ? "auto"    : "none",
          opacity:        loaded ? 1         : 0,
          transition:     loaded ? "opacity 0.35s ease" : "none",
        }}
      >
        <Logo />
        <NavBarDemo />
        <BackToTop />

        {/* Hero — ScrollyCanvas starts preloading frames during the loader */}
        <div className="relative" id="hero">
          <ScrollyCanvas onProgress={handleProgress} />
          <Overlay />
        </div>

        {/* Below-fold sections */}
        <div className="relative z-20">
          <div id="about">
            <About />
          </div>
          <TimelineDemo />
          <Projects />
          <TechMarquee />
          <Skills />
          <Contact />
        </div>

        <Footer />
      </main>
    </>
  );
}
