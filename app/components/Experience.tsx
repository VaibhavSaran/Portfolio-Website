"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="experience" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">A timeline of research, mentoring, and engineering practice.</h2>
          <p className="section-copy">
            The first roles carry the strongest signal for current AI/ML work, with earlier roles preserved as context
            instead of being inflated.
          </p>
        </motion.div>

        <div className="relative border-l border-border pl-5 md:pl-8">
          {resumeData.experience.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.role}-${exp.dates}`}
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.35) }}
              className="relative pb-8 last:pb-0"
            >
              <span className="absolute -left-[1.72rem] top-1.5 h-3 w-3 border-2 border-background bg-primary md:-left-[2.22rem]" />
              <div className="quiet-card p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
                    <p className="mt-1 font-semibold text-primary">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground md:justify-end">
                    <span className="inline-flex items-center gap-1 border border-border bg-background/60 px-2.5 py-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.dates}
                    </span>
                    <span className="inline-flex items-center gap-1 border border-border bg-background/60 px-2.5 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 grid gap-3">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[14px_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
