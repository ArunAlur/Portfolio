"use client";

const techs = [
  "Java", "Python", "TypeScript", "Spring Boot", "Node.js", "React",
  "AWS", "Kubernetes", "Docker", "Kafka", "PostgreSQL", "DynamoDB",
  "LangChain", "FastAPI", "Flask", "GraphQL", "Hibernate", "Spark",
];

export default function TechMarquee() {
  // Triple-duplicate for a seamless loop with no visible gap
  const items = [...techs, ...techs, ...techs];

  return (
    <div
      className="relative overflow-hidden py-5"
      aria-label="Technology stack"
      role="marquee"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pure-black via-white/[0.015] to-pure-black pointer-events-none" />

      {/* Left/right fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10"
        style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
        style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
      />

      <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
        {items.map((tech, i) => (
          <span
            key={i}
            className="mx-5 inline-flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55"
          >
            {tech}
            <span className="h-1 w-1 rounded-full bg-white/20 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
