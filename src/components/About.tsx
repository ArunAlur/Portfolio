"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatedDownload } from './ui/animated-download';
import { Button } from './ui/button';
import HyperTextParagraph from './ui/hyper-text-with-decryption';
import { useInView } from 'framer-motion';

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

export function About() {
  const [isDownloading, setIsDownloading] = useState(false);

  const aboutSegments = [
    'This portfolio is the map of a builder who thrives on turning complex backend problems into clean, composable solutions. I chase the signal inside the noise, whether that means orchestrating CI pipelines or designing fault-tolerant microservices that teams can depend on.',
    'I grew up in India, studied at KLE Technological University, then moved to Arizona State University for my Masters in IT. That journey pulled my curiosity into distributed systems, cloud-native architectures, and AI-driven tooling. Each project here is a chapter from that move across continents and disciplines.',
    "At Amazon, I engineered multi-pipeline CI orchestration and prototyped AI-powered developer tooling. At Accenture, I designed fault-tolerant Spring Boot microservices handling 50K daily requests and built full-stack applications with LangChain and vector databases.",
    'Away from production systems, I build open source tools like git-context that compress entire codebases into LLM-ready context files. The story is still being written, and I am always searching for the next frontier where thoughtful engineering can create calm for the people who rely on it.'
  ];

  const handleStartDownload = useCallback(() => {
    if (isDownloading) return;
    setIsDownloading(true);
  }, [isDownloading]);

  const handleAnimationComplete = useCallback(() => {
    setIsDownloading(false);

    // Direct anchor-click — most reliable on GitHub Pages static exports.
    // fetch→blob fails silently when GitHub Pages sets odd headers; a plain
    // <a download> always triggers the browser's native save dialog.
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
    <section className="section py-24 bg-pure-black" id="about">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-4xl pl-6 sm:pl-8 md:pl-12 lg:pl-16">
          <span className="text-sm uppercase tracking-[0.4em] text-accent-gray">About</span>
          <h2 className="mt-4 text-4xl font-bold text-accent-white sm:text-5xl">
            How I build reliable backend systems
          </h2>
          <div className="mt-4 max-w-2xl">
            <HyperTextParagraph
              text="Backend-focused engineer building cloud-native services, CI orchestration, and AI-powered tooling with Java, Spring Boot, and AWS."
              highlightWords={["backend", "cloud-native", "CI", "AI-powered", "AWS"]}
              className="text-accent-gray text-xs md:text-sm"
            />
          </div>

          {/* Stats counters */}
          <div className="mt-10 flex flex-wrap gap-8 pl-0">
            {[
              { value: 2, suffix: "+", label: "Years experience" },
              { value: 4, suffix: "+", label: "Projects shipped" },
              { value: 2, suffix: "", label: "Companies" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-3xl font-bold tracking-tight text-accent-white sm:text-4xl">
                  <Counter to={value} suffix={suffix} />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-accent-gray">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-0 md:px-4 lg:px-6">
          <div className="space-y-6">
            {aboutSegments.map((segment, index) => {
              // First segment gets the hyper-text treatment with key technical terms
              if (index === 0) {
                return (
                  <div key={index} className="pt-2 pb-2">
                    <HyperTextParagraph
                      text={segment}
                      highlightWords={["builder", "backend", "composable", "microservices", "teams"]}
                      className="text-sm md:text-base leading-relaxed text-accent-gray font-normal"
                    />
                  </div>
                );
              }
              // Second segment highlights location and technical terms
              if (index === 1) {
                return (
                  <div key={index} className="pt-2 pb-2">
                    <HyperTextParagraph
                      text={segment}
                      highlightWords={["India", "KLE", "Arizona", "distributed", "systems", "cloud-native", "AI-driven"]}
                      className="text-sm md:text-base leading-relaxed text-accent-gray font-normal"
                    />
                  </div>
                );
              }
              // Third segment highlights company and work terms
              if (index === 2) {
                return (
                  <div key={index} className="pt-2 pb-2">
                    <HyperTextParagraph
                      text={segment}
                      highlightWords={["Amazon", "Accenture", "microservices", "Spring", "LangChain", "vector"]}
                      className="text-sm md:text-base leading-relaxed text-accent-gray font-normal"
                    />
                  </div>
                );
              }
              // Fourth segment highlights activities
              if (index === 3) {
                return (
                  <div key={index} className="pt-2 pb-2">
                    <HyperTextParagraph
                      text={segment}
                      highlightWords={["open", "source", "git-context", "LLM-ready", "engineering"]}
                      className="text-sm md:text-base leading-relaxed text-accent-gray font-normal"
                    />
                  </div>
                );
              }
              // Fallback to regular text
              return (
                <p key={index} className="text-sm md:text-base leading-relaxed text-accent-gray font-normal pt-2 pb-2">
                  {segment}
                </p>
              );
            })}
          </div>

          <div className="mt-8 w-full max-w-xl space-y-5 rounded-2xl border border-border/60 bg-background/40 p-5 sm:p-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-accent-gray">Resume</h3>
              <p className="text-sm text-accent-gray">
                Want the full backstory? Trigger the download animation and grab the latest resume to dive deeper.
              </p>
            </div>
            <Button
              onClick={handleStartDownload}
              disabled={isDownloading}
              className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-5 py-3 text-sm font-medium text-accent-white transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:border-accent-white/40 focus:outline-none focus:ring-2 focus:ring-accent-white/50 focus:ring-offset-2 focus:ring-offset-pure-black"
              variant="outline"
            >
              {isDownloading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {isDownloading ? 'Preparing download…' : 'Download Resume'}
            </Button>
            <AnimatedDownload
              className="w-full"
              width="100%"
              isAnimating={isDownloading}
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
