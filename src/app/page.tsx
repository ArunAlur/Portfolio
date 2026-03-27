"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// ── Above-the-fold: loaded eagerly (hero is the first thing users see) ────
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay      from "@/components/Overlay";
import { Logo }     from "@/components/Logo";
import { NavBarDemo } from "@/components/NavBarDemo";
import LoadingScreen  from "@/components/LoadingScreen";
import BackToTop      from "@/components/BackToTop";

// ── Below-the-fold: lazy-loaded so they don't block the initial paint ─────
const About        = dynamic(() => import("@/components/About").then(m => ({ default: m.About })));
const TimelineDemo = dynamic(() => import("@/components/TimelineDemo").then(m => ({ default: m.TimelineDemo })));
const Projects     = dynamic(() => import("@/components/Projects"));
const TechMarquee  = dynamic(() => import("@/components/TechMarquee"));
const Skills       = dynamic(() => import("@/components/Skills").then(m => ({ default: m.Skills })));
const Contact      = dynamic(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer       = dynamic(() => import("@/components/Footer"));

export default function Home() {
  // false = loader is visible; true = loader has completed and slid away
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-pure-black">

      {/* ── Full-screen anime.js loading curtain ─────────────────────────
          Always mounted first; slides up on completion and unmounts.    */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* ── Persistent shell (logo, nav, back-to-top) ────────────────────
          These render behind the loader so they're instantly ready on
          reveal — but remain hidden via the loader overlay until it exits. */}
      <Logo />
      <NavBarDemo />
      <BackToTop />

      {/* ── Hero (above-fold, eager) ──────────────────────────────────── */}
      <div className="relative" id="hero">
        {/* ScrollyCanvas starts preloading its 100-frame image sequence
            while the loader is still playing — so frames are cached by
            the time the curtain lifts. */}
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* ── Below-fold sections (lazy, code-split) ───────────────────── */}
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
  );
}
