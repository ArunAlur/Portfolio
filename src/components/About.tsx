"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedDownload } from './ui/animated-download';
import { Button } from './ui/button';
import HyperTextParagraph from './ui/hyper-text-with-decryption';
import { motion, useInView } from 'framer-motion';

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = 16;
    const increment = to / (1000 / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

export function About() {
  const [isDownloading, setIsDownloading] = useState(false);

  const aboutSegments = [
    'This portfolio is the map of a builder who thrives on turning complex backend problems into clean, composable solutions. I chase the signal inside the noise, whether that means orchestrating CI pipelines or designing fault-tolerant microservices that teams can depend on.',
    'I grew up in India, studied at KLE Technological University, then moved to Arizona State University for my Masters in IT. That journey pulled my curiosity into distributed systems, cloud-native architectures, and AI-driven tooling.',
    "At Amazon, I engineered multi-pipeline CI orchestration and prototyped AI-powered developer tooling. At Accenture, I designed fault-tolerant Spring Boot microservices handling 50K daily requests and built full-stack applications with LangChain and vector databases.",
    'Away from production systems, I build open source tools like git-context that compress entire codebases into LLM-ready context files. The story is still being written.'
  ];

  const highlightMap: Record<number, string[]> = {
    0: ["builder", "backend", "composable", "microservices", "teams"],
    1: ["India", "KLE", "Arizona", "distributed", "systems", "cloud-native", "AI-driven"],
    2: ["Amazon", "Accenture", "microservices", "Spring", "LangChain", "vector"],
    3: ["open", "source", "git-context", "LLM-ready", "engineering"],
  };

  const handleStartDownload = useCallback(() => {
    if (isDownloading) return;
    setIsDownloading(true);
  }, [isDownloading]);

  const handleAnimationComplete = useCallback(() => {
    setIsDownloading(false);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const resumeUrl = `${basePath}/Resume.pdf`.replace(/\/\/+/g, '/');
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Arun_Alur_Resume.pdf';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return (
    <section className="relative bg-pure-black py-24 sm:py-32" id="about">
      {/* Subtle top separator with gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={FADE_UP}
        >
          <span className="section-label">About</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How I build reliable<br className="hidden sm:block" /> backend systems
          </h2>
          <div className="mt-5 section-rule" />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 xl:gap-20">

          {/* Left: bio copy */}
          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div variants={FADE_UP} custom={0}>
              <HyperTextParagraph
                text="Backend-focused engineer building cloud-native services, CI orchestration, and AI-powered tooling with Java, Spring Boot, and AWS."
                highlightWords={["backend", "cloud-native", "CI", "AI-powered", "AWS"]}
                className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/45 font-medium leading-relaxed"
              />
            </motion.div>

            {aboutSegments.map((segment, index) => (
              <motion.div key={index} variants={FADE_UP} custom={index + 1} className="py-1">
                <HyperTextParagraph
                  text={segment}
                  highlightWords={highlightMap[index] ?? []}
                  className="text-sm sm:text-[15px] leading-[1.75] text-white/55 font-normal"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right: stats + resume card */}
          <motion.div
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5"
              variants={FADE_UP}
              custom={1}
            >
              {[
                { value: 2, suffix: "+", label: "Years experience" },
                { value: 4, suffix: "+", label: "Projects shipped" },
                { value: 2, suffix: "",  label: "Companies" },
              ].map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="gradient-border p-4 lg:p-5 flex flex-col gap-1"
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white tabular-nums">
                    <Counter to={value} suffix={suffix} />
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/45">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Resume card */}
            <motion.div
              className="gradient-border p-5 sm:p-6 space-y-4"
              variants={FADE_UP}
              custom={2}
            >
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                  Resume
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  Full backstory available. Trigger the animation and grab the latest PDF.
                </p>
              </div>
              <Button
                onClick={handleStartDownload}
                disabled={isDownloading}
                aria-label={isDownloading ? "Preparing download" : "Download Resume PDF"}
                className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:border-white/25 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black"
                variant="outline"
              >
                {isDownloading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {isDownloading ? 'Preparing…' : 'Download Resume'}
              </Button>
              <AnimatedDownload
                className="w-full"
                width="100%"
                isAnimating={isDownloading}
                onAnimationComplete={handleAnimationComplete}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
