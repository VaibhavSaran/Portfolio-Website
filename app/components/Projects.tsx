"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Database, ExternalLink, FileText, Github, Play, Workflow } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

const linkIcons: Record<string, typeof ExternalLink> = {
  liveDemo: ExternalLink,
  github: Github,
  demoVideo: Play,
  kaggleDataset: Database,
  paperPdf: FileText,
};

const linkLabels: Record<string, string> = {
  liveDemo: "Live",
  github: "Code",
  demoVideo: "Demo",
  kaggleDataset: "Dataset",
  paperPdf: "Paper",
};

type Project = (typeof resumeData.projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const links = Object.entries(project.links).filter(([, url]) => Boolean(url));

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24) }}
      className={`group quiet-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-primary ${
        index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-[hsl(var(--brand-3))] opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-secondary text-primary">
          <Workflow className="h-6 w-6" />
        </div>
        <p className="text-right text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {project.dates}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h3>
        {project.associated && <p className="mt-2 text-sm font-semibold text-primary">{project.associated}</p>}
      </div>

      {(project.award || project.publication) && (
        <div className="mt-5 grid gap-2">
          {project.award && (
            <p className="border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground">
              {project.award}
            </p>
          )}
          {project.publication && (
            <p className="border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground">
              {project.publication}
            </p>
          )}
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="grid grid-cols-[14px_1fr] gap-3 text-sm leading-6 text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span key={skill} className="border border-border bg-background/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {links.map(([key, url]) => {
          const Icon = linkIcons[key] ?? ArrowUpRight;
          return (
            <a
              key={key}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-bold transition hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
              {linkLabels[key] ?? key}
            </a>
          );
        })}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr]"
        >
          <div>
            <p className="section-kicker">Selected systems</p>
            <h2 className="section-title">Projects that show how I build.</h2>
          </div>
          <p className="section-copy lg:mt-8">
            These are not placeholder case studies. They cover agent routing, RAG, data pipelines, deployment,
            research translation, and product-facing interfaces using the exact project data already in the codebase.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-12">
          {resumeData.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
