"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Keep mutable refs for values used inside the RAF loop so we never have
  // stale-closure bugs from the dependency array.
  const visibleRef = useRef(false);
  const clickingRef = useRef(false);
  const hoveringRef = useRef(false);

  // React state only drives the re-render of the JSX opacity/size props.
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices — not touch.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Dot snaps instantly — no state batching needed
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const animateRing = () => {
      // Pause when tab is hidden to save CPU/battery
      if (!document.hidden) {
        ringX = lerp(ringX, targetX, 0.12);
        ringY = lerp(ringY, targetY, 0.12);
        glowX = lerp(glowX, targetX, 0.04);
        glowY = lerp(glowY, targetY, 0.04);

        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        }
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
        }
      }
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    const onLeave  = () => { visibleRef.current = false; setVisible(false); };
    const onEnter  = () => { visibleRef.current = true;  setVisible(true);  };
    const onDown   = () => { clickingRef.current = true;  setClicking(true);  };
    const onUp     = () => { clickingRef.current = false; setClicking(false); };

    const HOVER_SELECTOR = "a, button, [role='button'], [data-cursor-hover]";
    const onHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        hoveringRef.current = true;
        setHovering(true);
      }
    };
    const onHoverEnd = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        hoveringRef.current = false;
        setHovering(false);
      }
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onHoverStart);
    document.addEventListener("mouseout",   onHoverEnd);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onHoverStart);
      document.removeEventListener("mouseout",   onHoverEnd);
    };
  }, []); // no deps — all live values are in refs

  return (
    <>
      {/* Ambient glow — drifts lazily (z-75) */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{ zIndex: 75, opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
      >
        <div
          style={{
            width: "480px",
            height: "480px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.006) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Ring — lags with lerp (z-80) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{ zIndex: 80, opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          style={{
            width:  hovering ? "44px" : clicking ? "24px" : "32px",
            height: hovering ? "44px" : clicking ? "24px" : "32px",
            borderRadius: "999px",
            border: `1.5px solid rgba(255,255,255,${hovering ? 0.7 : 0.25})`,
            backgroundColor: hovering ? "rgba(255,255,255,0.04)" : "transparent",
            transition:
              "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, background-color 0.25s ease",
          }}
        />
      </div>

      {/* Dot — snaps to cursor exactly (z-85) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
        style={{ zIndex: 85, opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          style={{
            width:  clicking ? "5px" : "6px",
            height: clicking ? "5px" : "6px",
            borderRadius: "999px",
            backgroundColor: hovering ? "transparent" : "rgba(255,255,255,0.95)",
            border: hovering ? "1.5px solid rgba(255,255,255,0.9)" : "none",
            transition:
              "width 0.15s ease, height 0.15s ease, background-color 0.2s ease",
          }}
        />
      </div>
    </>
  );
}
