"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Award, Code2, FileText, GitPullRequest, Star, TrendingUp, Trophy } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

const iconMap: Record<string, typeof Award> = {
  award: Award,
  publication: Trophy,
  metric: TrendingUp,
  leadership: Star,
  opensource: GitPullRequest,
  project: Code2,
  research: FileText,
};

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="achievements" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr]"
        >
          <div>
            <p className="section-kicker">Proof archive</p>
            <h2 className="section-title">Recognition, output, and measurable impact.</h2>
          </div>
          <p className="section-copy lg:mt-8">
            Kept factual and compact: awards, publications, mentoring outcomes, research artifacts, and deployed
            project evidence pulled from the existing data file.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {resumeData.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.type] ?? Award;
            const href = achievement.github ?? achievement.liveDemo ?? achievement.link;
            return (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className={`quiet-card relative p-5 ${index < 2 ? "lg:col-span-2" : ""}`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  {achievement.value && (
                    <span className="text-3xl font-semibold tracking-tight text-primary">
                      {achievement.value}
                      {achievement.title.includes("%") ? "%" : "+"}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{achievement.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{achievement.context}</p>
                {achievement.date && <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{achievement.date}</p>}
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                  >
                    View proof
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
