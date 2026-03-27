"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { useRef } from "react";

interface Props {
  /** True once the loading curtain has fully exited — triggers hero text reveal. */
  loaded: boolean;
}

export default function Overlay({ loaded }: Props) {

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoother spring — reduced stiffness + higher damping prevents motion-sickness skew
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(scrollVelocity, { stiffness: 120, damping: 60, mass: 0.5 });
  // Tighter clamp so the effect is a whisper, not a shout
  const skewY = useTransform(skewVelocity, [-3000, 3000], [-1.2, 1.2]);

  // ── Section 1: Centre (0–30%) ──────────────────────────────────────────────
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3],   [1, 1, 1, 0]);
  const y1       = useTransform(scrollYProgress, [0, 0.3],               [0, -80]);

  // ── Section 2: Left (30–60%) ───────────────────────────────────────────────
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const x2       = useTransform(scrollYProgress, [0.3, 0.6],             [-40, 0]);

  // ── Section 3: Right (60–95%) ──────────────────────────────────────────────
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const x3       = useTransform(scrollYProgress, [0.6, 0.9],               [40, 0]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10 h-[500vh]">

      {/* ── Section 1 ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          style={{ opacity: opacity1, y: y1, skewY }}
          className="text-center px-6 sm:px-12"
        >
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={loaded ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            ARUN ALUR.
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/65 mt-4 uppercase tracking-[0.25em]"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={loaded ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Software Engineer · Backend &amp; Cloud-Native Systems
          </motion.p>
        </motion.div>
      </div>

      {/* ── Section 2 ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-start px-8 sm:px-16 md:px-24 lg:px-32">
        <motion.div
          style={{ opacity: opacity2, x: x2, skewY }}
          className="max-w-lg lg:max-w-xl"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/40 mb-4">
            What I do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            I build resilient backend systems.
          </h2>
          <div className="mt-4 h-px w-12 bg-white/20 rounded-full" />
          <p className="text-white/60 mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
            From CI orchestration at Amazon to fault-tolerant microservices at Accenture, I focus on reliability, observability, and cloud-native architectures teams can trust.
          </p>
        </motion.div>
      </div>

      {/* ── Section 3 ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-end px-8 sm:px-16 md:px-24 lg:px-32">
        <motion.div
          style={{ opacity: opacity3, x: x3, skewY }}
          className="max-w-lg lg:max-w-xl text-right"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/40 mb-4">
            What I explore
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Bridging AI tooling and distributed systems.
          </h2>
          <div className="mt-4 h-px w-12 bg-white/20 rounded-full ml-auto" />
          <p className="text-white/60 mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
            From AST-powered developer tools to LLM-integrated pipelines, turning complex infrastructure into calm, composable platforms.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
