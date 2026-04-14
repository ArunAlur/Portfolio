"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import type React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Box, Database, GitBranch, Layers } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { withBasePath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";
// Project images removed — using placeholder gradients instead

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function GlowingEffectDemo() {
  return (
    <motion.ul
      className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <GridItem
        icon={<GitBranch className="h-4 w-4 text-emerald-400" />}
        title="git-context"
        description="A 4-phase AST-powered pipeline that compresses any GitHub repo into a single token-budgeted context file (32k–200k tokens) for LLM ingestion. Supports 5 runtimes, 13 REST API endpoints, and MCP server integration for Claude, GPT-4, and Gemini."
        meta="AST-powered codebase-to-LLM context tool"
        tags={["Python", "FastAPI", "Tree-sitter", "React", "TypeScript", "MCP"]}
        repoUrl="https://github.com/ArunAlur/git-context"
        liveUrl="https://git-context.com"
        imageSrc="/projects/git-context.jpg"
      />
      <GridItem
        icon={<Layers className="h-4 w-4 text-sky-400" />}
        title="Enterprise Perfume Marketplace"
        description="Full-stack monorepo platform with 7 microservices (catalog, offers, search, affiliate, user, ratings, notifications), Python crawlers, Kafka event streaming, and a Next.js PWA frontend — built with DDD and Hexagonal Architecture."
        meta="Production-grade e-commerce microservices platform"
        tags={["TypeScript", "Node.js", "Kafka", "PostgreSQL", "Redis", "Docker"]}
        repoUrl="https://github.com/ArunAlur/app-monorepo"
        imageSrc="/projects/marketplace.jpg"
      />
      <GridItem
        icon={<Database className="h-4 w-4 text-purple-400" />}
        title="NFL & Premier League Data Pipeline"
        description="End-to-end data engineering pipeline extracting live sports + stock data from APIs, orchestrated with Prefect, transformed with dbt in BigQuery, and visualized via a Streamlit dashboard — all provisioned on GCP with Terraform."
        meta="Sports analytics data pipeline on Google Cloud"
        tags={["Python", "dbt", "BigQuery", "Prefect", "Terraform", "GCP"]}
        repoUrl="https://github.com/ArunAlur/NFL-Premier-League-Pipeline"
        imageSrc="/projects/pipeline.jpg"
      />
      <GridItem
        icon={<Box className="h-4 w-4 text-amber-300" />}
        title="Twitter Real-Time Trend Monitor"
        description="Real-time Twitter trend monitoring pipeline using Kafka for ingestion, Apache Spark for stream processing, AWS S3 for storage, and MongoDB Atlas for persistence — with a live Streamlit dashboard for visualization."
        meta="Real-time social media stream processing with Spark"
        tags={["Kafka", "Spark", "Python", "MongoDB", "AWS S3", "Streamlit"]}
        repoUrl="https://github.com/ArunAlur/Twitter-spark"
        imageSrc="/projects/twitter-spark.jpg"
      />
    </motion.ul>
  );
}

interface GridItemProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  meta?: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageSrc?: string | { src: string };
}

const GridItem = ({ icon, title, description, tags, repoUrl, liveUrl, imageSrc }: GridItemProps) => {
  const resolvedImageSrc = typeof imageSrc === "string" ? imageSrc : imageSrc?.src ?? undefined;
  const imagePath = resolvedImageSrc ? withBasePath(resolvedImageSrc) : undefined;

  const cardRef = useRef<HTMLLIElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(x * 14);
    rawRotateX.set(-y * 9);
  };

  const onMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.li
      ref={cardRef}
      variants={cardVariants}
      className={cn("min-h-[20rem] list-none group")}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border-[0.75px] bg-background shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          {/* Image panel — full bleed, gradient fade at bottom */}
          {imagePath ? (
            <div className="relative h-44 w-full overflow-hidden bg-black">
              <img
                src={imagePath}
                alt={title}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              {/* gradient overlay — image bleeds into card */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>
          ) : (
            <div className="h-36 w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_60%)]" />
          )}

          <div className="relative flex flex-1 flex-col justify-between gap-4 px-6 pb-6">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl font-sans font-semibold leading-[1.375rem] tracking-[-0.04em] text-balance text-foreground md:text-2xl md:leading-[1.875rem]">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.25rem] text-muted-foreground md:text-[0.95rem] md:leading-[1.4rem]">
                {description}
              </p>
              {tags && tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-gray"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {(repoUrl || liveUrl) && (
              <div className="mt-2 flex items-center gap-4 border-t border-border/40 pt-4">
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs md:text-sm opacity-60 transition-opacity duration-200 hover:opacity-100 text-accent-white font-medium"
                  >
                    <span>Repository</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs md:text-sm opacity-60 transition-opacity duration-200 hover:opacity-100 text-emerald-400 font-medium"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
};
