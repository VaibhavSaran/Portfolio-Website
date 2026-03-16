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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Production-grade AI systems from research to deployment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative glass-card rounded-xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
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

                {/* Award/Publication badges */}
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

                {/* Description bullets */}
                <ul className="space-y-3 mb-6">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-indigo-500 mt-1">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
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

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {Object.entries(project.links).map(([key, url]) => {
                    const Icon = linkIcons[key];
                    const label = linkLabels[key];

                    return (
                      <a
                        key={key}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Icon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-semibold">{label}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Contributors */}
                {project.contributors && project.contributors.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-muted-foreground font-semibold mb-3">Contributors:</p>
                    <div className="flex flex-wrap gap-4">
                      {project.contributors.map((contributor, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{contributor.name}</span>
                          <div className="flex gap-1">
                            {contributor.github && (
                              <a
                                href={contributor.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md hover:bg-indigo-500/20 transition-colors"
                                aria-label={`${contributor.name} GitHub`}
                              >
                                <Github className="w-3.5 h-3.5 text-muted-foreground hover:text-indigo-400" />
                              </a>
                            )}
                            {contributor.linkedin && (
                              <a
                                href={contributor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md hover:bg-blue-500/20 transition-colors"
                                aria-label={`${contributor.name} LinkedIn`}
                              >
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
          ))}
        </div>
      </div>
    </section>
  );
}
