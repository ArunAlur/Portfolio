"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { Award, Zap } from "lucide-react";

export function TimelineDemo() {
  const data = [
    {
      title: "Amazon",
      content: (
        <div className="space-y-4">
          <div className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray">
            <h4 className="text-accent-white text-lg font-semibold">Software Developer Intern · Amazon</h4>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gray/80 mt-1 mb-3">
              May 2025 – August 2025 · Seattle, USA
            </p>
            <p className="text-accent-gray text-sm leading-relaxed mb-4">
              Engineered multi-pipeline CI orchestration within AWS CodePipeline, enabling deterministic failure handling
              across 200+ pipelines and improving large-scale CI reliability by 7%. Implemented backward-compatible invoke
              actions supporting distributed cross-service validation for 15 engineering teams.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent-white" aria-hidden="true" />
                <span className="text-accent-white font-medium">Theme: CI orchestration at scale</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent-white" aria-hidden="true" />
                <span className="text-accent-white font-medium">
                  Focus: AI-powered PR assistant reducing triage time by 38%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray/30 rounded-lg p-4 border border-medium-gray">
            <h5 className="text-accent-white font-medium mb-3">Skills &amp; Technologies</h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Java</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Spring Boot</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">AWS CodePipeline</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">JUnit/Mockito</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">CI/CD</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">AI Tooling</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Accenture",
      content: (
        <div className="space-y-4">
          <div className="bg-dark-gray/50 rounded-xl p-6 border border-medium-gray">
            <h4 className="text-accent-white text-lg font-semibold">Software Engineer · Accenture</h4>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gray/80 mt-1 mb-3">
              September 2022 – July 2024 · Bangalore, India
            </p>
            <p className="text-accent-gray text-sm leading-relaxed mb-4">
              Designed and operated fault-tolerant Java/Spring Boot microservices handling 50K daily production requests
              with 99.5% uptime. Built a full-stack Python/Flask application with LangChain and vector databases for
              document analysis, and instrumented backend observability using Prometheus.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent-white" aria-hidden="true" />
                <span className="text-accent-white font-medium">Theme: fault-tolerant microservices at scale</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent-white" aria-hidden="true" />
                <span className="text-accent-white font-medium">
                  Focus: LangChain, vector databases, and system observability
                </span>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray/30 rounded-lg p-4 border border-medium-gray">
            <h5 className="text-accent-white font-medium mb-3">Skills &amp; Technologies</h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Java</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Spring Boot</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Python/Flask</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">LangChain</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">Prometheus</span>
              <span className="px-3 py-1 bg-accent-white/10 text-accent-white text-xs rounded-full">React</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-pure-black py-24 sm:py-32" id="experience">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <span className="section-label">Career</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Experience
          </h2>
          <div className="mt-5 section-rule" />
          <p className="mt-5 max-w-2xl text-sm sm:text-[15px] text-white/50 leading-relaxed">
            Roles that shaped my systems thinking — from CI orchestration at Amazon to fault-tolerant microservices at Accenture.
          </p>
        </motion.div>
        <div className="mx-auto max-w-6xl">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
}
