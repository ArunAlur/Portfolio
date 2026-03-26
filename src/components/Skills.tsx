"use client";

import { Brain, Cloud, Code2, Database, Network, Layers } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { motion } from 'framer-motion';

const skillsTimeline = [
  {
    id: 1,
    title: 'Programming Languages',
    date: 'Core Stack',
    content:
      'Fluent across compiled and scripting languages with production experience building backend services, APIs, and developer tooling.',
    category: 'Languages',
    icon: Code2,
    relatedIds: [2, 4, 5],
    status: 'completed' as const,
    energy: 95,
    skills: ['Java', 'Python', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    id: 2,
    title: 'Backend & Distributed Systems',
    date: 'Application Layer',
    content:
      'Build resilient backend services and API layers using proven frameworks, messaging backbones, and modern API paradigms.',
    category: 'Frameworks',
    icon: Layers,
    relatedIds: [1, 3, 5],
    status: 'completed' as const,
    energy: 92,
    skills: [
      'Spring Boot',
      'REST APIs',
      'API Design',
      'Microservices',
      'Distributed Systems',
      'Node.js',
      'Flask',
      'GraphQL',
      'Hibernate',
    ],
  },
  {
    id: 3,
    title: 'Cloud & Infrastructure',
    date: 'Delivery & Operations',
    content:
      'Own the full release pipeline with cloud-native patterns on AWS, automated delivery, and container orchestration tuned for scale.',
    category: 'DevOps',
    icon: Cloud,
    relatedIds: [2, 5],
    status: 'completed' as const,
    energy: 90,
    skills: [
      'AWS (Lambda, S3, DynamoDB, CodePipeline)',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Jenkins',
      'Linux',
    ],
  },
  {
    id: 4,
    title: 'Databases & AI',
    date: 'Data Layer',
    content:
      'Design high-availability storage, streaming pipelines, and AI-powered retrieval systems backed by modern data and ML tooling.',
    category: 'Data & AI',
    icon: Database,
    relatedIds: [1, 2],
    status: 'completed' as const,
    energy: 88,
    skills: [
      'PostgreSQL',
      'DynamoDB',
      'SQL/NoSQL',
      'Vector Databases',
      'OpenAI GPT',
      'LangChain',
      'Apache Kafka',
      'Spark',
      'NLP',
    ],
  },
  {
    id: 5,
    title: 'Testing & Observability',
    date: 'Quality & Reliability',
    content:
      'Ship with confidence using disciplined test practices, observability tooling, and monitoring tuned for production reliability.',
    category: 'Quality',
    icon: Brain,
    relatedIds: [1, 2, 3],
    status: 'completed' as const,
    energy: 90,
    skills: [
      'JUnit',
      'Mockito',
      'Integration Testing',
      'Prometheus',
      'Logging',
      'Monitoring',
    ],
  },
  {
    id: 6,
    title: 'Frontend',
    date: 'UI Layer',
    content:
      'Build interactive, performant user interfaces with modern React tooling and utility-first CSS frameworks.',
    category: 'Frontend',
    icon: Network,
    relatedIds: [1, 2],
    status: 'completed' as const,
    energy: 85,
    skills: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Chart.js',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-dark-gray bg-pure-black py-24 mt-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-12 max-w-6xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm uppercase tracking-[0.4em] text-accent-gray">Skills</span>
          <h2 className="mt-4 text-4xl font-bold text-accent-white sm:text-5xl">Technical Orbit</h2>
          <p className="mt-4 text-accent-gray">
            A backend-first toolkit honed across cloud-native services, CI orchestration, and AI-powered developer tooling.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <RadialOrbitalTimeline timelineData={skillsTimeline} />
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;
