"use client";

import { motion } from "framer-motion";
import { GlowingEffectDemo } from "./ui/glowing-effect-demo";

export default function Projects() {
  return (
    <section
      className="relative z-20 bg-pure-black pt-24 pb-32 sm:pt-28 sm:pb-36 px-6 sm:px-8 lg:px-12"
      id="projects"
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <span className="section-label">Recent Builds</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tools &amp; systems I&apos;ve built
          </h2>
          <div className="mt-5 section-rule" />
          <p className="mt-5 max-w-2xl text-sm sm:text-[15px] text-white/50 leading-relaxed">
            Developer tools, microservices platforms, data pipelines, and real-time stream processors — built to solve real problems at scale.
          </p>
        </motion.div>

        <GlowingEffectDemo />
      </div>
    </section>
  );
}
