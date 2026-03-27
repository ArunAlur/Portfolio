"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface Props {
  onComplete: () => void;
}

const NAME = "ARUN ALUR";

export default function LoadingScreen({ onComplete }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const diamondRef  = useRef<SVGPathElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Stable ref so the effect never needs onComplete in its deps
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (!overlayRef.current) return;

    // ── Initialise diamond stroke-dasharray before animating ──────────────
    if (diamondRef.current) {
      const len = diamondRef.current.getTotalLength();
      diamondRef.current.style.strokeDasharray  = `${len}`;
      diamondRef.current.style.strokeDashoffset = `${len}`;
    }

    // ── Counter uses an intermediate object so we can control padding ─────
    const counter = { value: 0 };

    // ── Main timeline ─────────────────────────────────────────────────────
    const tl = anime.timeline({ autoplay: true });

    // 1. Diamond draws in (0 → 700 ms)
    tl.add({
      targets: diamondRef.current,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 700,
      easing: "easeInOutSine",
    });

    // 2. Name chars stagger up (starts at 400 ms)
    tl.add({
      targets: ".ls-char",
      opacity:    [0, 1],
      translateY: [10, 0],
      duration:   350,
      easing:     "easeOutExpo",
      delay:      anime.stagger(45),
    }, 400);

    // 3. Counter 000 → 100 (starts at 400 ms)
    tl.add({
      targets:  counter,
      value:    100,
      duration: 1050,
      round:    1,
      easing:   "easeInOutExpo",
      update: () => {
        if (counterRef.current) {
          counterRef.current.textContent =
            String(Math.round(counter.value)).padStart(3, "0");
        }
      },
    }, 400);

    // 4. Progress bar fills (starts at 400 ms, same timing as counter)
    tl.add({
      targets:  progressRef.current,
      scaleX:   [0, 1],
      duration: 1050,
      easing:   "easeInOutExpo",
    }, 400);

    // 5. Curtain slides UP (starts at 1 900 ms)
    tl.add({
      targets:     overlayRef.current,
      translateY:  "-100%",
      duration:    650,
      easing:      "easeInExpo",
      complete: () => onCompleteRef.current(),
    }, 1900);

    return () => tl.pause();
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-label="Loading"
      role="status"
      className="fixed inset-0 flex flex-col items-center justify-center bg-black"
      style={{ zIndex: 200, willChange: "transform" }}
    >
      {/* ── Diamond mark ─────────────────────────────────────────────── */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden="true"
        className="mb-10"
      >
        {/* Inner fill hint */}
        <rect
          x="26" y="13"
          width="18" height="18"
          rx="1.5"
          transform="rotate(45 26 26)"
          fill="rgba(255,255,255,0.05)"
        />
        {/* Animated outline */}
        <path
          ref={diamondRef}
          d="M26 3 L49 26 L26 49 L3 26 Z"
          stroke="rgba(255,255,255,0.80)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* ── Name with per-character stagger ──────────────────────────── */}
      <div
        className="mb-8 flex"
        aria-label={NAME}
        style={{
          letterSpacing: "0.38em",
          fontWeight: 600,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.75)",
        }}
      >
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            className="ls-char inline-block"
            aria-hidden="true"
            style={{ opacity: 0, whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* ── Counter ──────────────────────────────────────────────────── */}
      <div
        className="mb-3 font-mono"
        style={{
          fontSize: "10px",
          letterSpacing: "0.45em",
          color: "rgba(255,255,255,0.22)",
        }}
      >
        <span ref={counterRef}>000</span>
        <span>%</span>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div
        className="overflow-hidden"
        style={{ width: "96px", height: "1px", background: "rgba(255,255,255,0.08)" }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(255,255,255,0.55)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
