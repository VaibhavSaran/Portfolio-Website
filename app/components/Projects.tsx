"use client";

import { motion, useInView } from "framer-motion";
import { Code2, ExternalLink, Github, Play, Database, FileText, Linkedin } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

const linkIcons: { [key: string]: any } = {
  liveDemo: ExternalLink,
  github: Github,
  demoVideo: Play,
  kaggleDataset: Database,
  paperPdf: FileText,
};

const linkLabels: { [key: string]: string } = {
  liveDemo: "Live Demo",
  github: "GitHub",
  demoVideo: "Demo Video",
  kaggleDataset: "Kaggle Dataset",
  paperPdf: "Research Paper",
};

// Row 1: StockPilot[0] + F1 Primus[1] (side-by-side, Featured badges)
// Row 2: Job Search[2] (full-width, no Featured badge)
// Row 3: Sepsis RL[3] + Laptrack[4]

type Project = (typeof resumeData.projects)[number];

function ProjectCard({
  project,
  index,
  isInView,
  isFeatured = false,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  isFeatured?: boolean;
}) {
  const isLaptrack = project.title.startsWith("Laptrack");
  const isJobSearch = project.title.startsWith("Job Search");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group relative glass-card rounded-xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-2xl ${isLaptrack ? "opacity-[0.82]" : ""}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg flex-shrink-0">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            {isFeatured && (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold" style={{ fontSize: "11px" }}>
                  Featured
                </span>
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{project.dates}</span>
              {project.associated && (
                <>
                  <span>•</span>
                  <span>{project.associated}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {isLaptrack && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary/60 border border-white/20 text-muted-foreground">
              Data Engineering Project
            </span>
          </div>
        )}

        {(project.award || project.publication) && (
          <div className="mb-6 space-y-2">
            {project.award && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-sm font-semibold">
                <span className="text-yellow-500">🏆</span>
                {project.award}
              </div>
            )}
            {project.publication && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-sm font-semibold">
                <span className="text-indigo-500">📄</span>
                {project.publication}
              </div>
            )}
          </div>
        )}

        <ul className="space-y-3 mb-6">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-indigo-500 mt-1 flex-shrink-0">▸</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/50 hover:bg-secondary transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {!isJobSearch && Object.keys(project.links).length > 0 && (
          <div className="flex flex-wrap gap-3">
            {Object.entries(project.links).map(([key, url]) => {
              const Icon = linkIcons[key];
              const label = linkLabels[key];
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {Icon && <Icon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />}
                  <span className="text-sm font-semibold">{label}</span>
                </a>
              );
            })}
          </div>
        )}

        {project.contributors && project.contributors.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-muted-foreground font-semibold mb-3">Contributors:</p>
            <div className="flex flex-wrap gap-4">
              {project.contributors.map((contributor, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{contributor.name}</span>
                  <div className="flex gap-1">
                    {contributor.github && (
                      <a href={contributor.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-indigo-500/20 transition-colors" aria-label={`${contributor.name} GitHub`}>
                        <Github className="w-3.5 h-3.5 text-muted-foreground hover:text-indigo-400" />
                      </a>
                    )}
                    {contributor.linkedin && (
                      <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-blue-500/20 transition-colors" aria-label={`${contributor.name} LinkedIn`}>
                        <Linkedin className="w-3.5 h-3.5 text-muted-foreground hover:text-blue-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = resumeData.projects;
  // Row 1: StockPilot[0] + F1 Primus[1]
  // Row 2: Job Search[2] (full-width)
  // Row 3: Sepsis RL[3] + Laptrack[4]

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Production-grade AI systems from research to deployment
          </p>
        </motion.div>

        {/* Row 1 — StockPilot + F1 Primus (both Featured) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProjectCard project={projects[0]} index={0} isInView={isInView} isFeatured={true} />
          <ProjectCard project={projects[1]} index={1} isInView={isInView} isFeatured={true} />
        </div>

        {/* Row 2 — Job Search (full-width, no Featured badge) */}
        <div className="mb-8">
          <ProjectCard project={projects[2]} index={2} isInView={isInView} isFeatured={false} />
        </div>

        {/* Row 3 — Sepsis RL + Laptrack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectCard project={projects[3]} index={3} isInView={isInView} />
          <ProjectCard project={projects[4]} index={4} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
