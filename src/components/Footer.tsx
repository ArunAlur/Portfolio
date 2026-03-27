"use client";

import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-pure-black py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright — WCAG AA contrast: white/55 on black ≈ 6.8:1 */}
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/55 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Arun Alur
          </p>

          {/* Built-with — centre on all viewports */}
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 order-3 sm:order-2">
            Built with Next.js &middot; Framer Motion
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3 order-1 sm:order-3">
            <a
              href="https://www.linkedin.com/in/arun-basavaraj-alur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-200 hover:border-white/40 hover:text-white hover:bg-white/[0.06]"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/ArunAlur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-200 hover:border-white/40 hover:text-white hover:bg-white/[0.06]"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
