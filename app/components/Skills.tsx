"use client";

import { motion, useInView } from "framer-motion";
import { Brain, Cloud, Code2, Database, Layers, Workflow, Zap } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

const categoryIcons: Record<string, typeof Code2> = {
  "AI & ML Frameworks": Brain,
  "AI & ML Ops": Workflow,
  "Agentic AI & Tools": Layers,
  "Cloud & Infrastructure": Cloud,
  "Databases & Vector Stores": Database,
  "Data Engineering": Zap,
  "Deep Learning": Brain,
  "Programming Languages": Code2,
  "Frontend UI": Code2,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="skills" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.7fr_1fr]"
        >
          <div>
            <p className="section-kicker">Tooling</p>
            <h2 className="section-title">A stack tuned for agentic AI and production ML.</h2>
          </div>
          <div>
            <p className="section-copy lg:mt-8">
              The emphasis is intentionally practical: model orchestration, evaluation-adjacent workflows, cloud
              deployment, data movement, and the UI layers needed to make systems usable.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {resumeData.topSkills.map((skill) => (
                <span key={skill} className="bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(resumeData.skills).map(([category, skills], index) => {
            const Icon = categoryIcons[category] ?? Code2;
            return (
              <motion.article
                key={category}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className="quiet-card p-5 transition hover:-translate-y-1 hover:border-primary"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold tracking-tight">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="border border-border bg-background/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
