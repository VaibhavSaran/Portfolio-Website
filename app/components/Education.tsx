"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="education" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">Education</p>
          <h2 className="section-title">Academic foundation behind the applied work.</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeData.education.map((edu, index) => (
            <motion.article
              key={edu.institution}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="quiet-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <GraduationCap className="h-6 w-6" />
                </span>
                {edu.gpa && (
                  <div className="border border-border bg-background/60 px-3 py-2 text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">GPA</p>
                    <p className="text-2xl font-semibold">{edu.gpa}</p>
                  </div>
                )}
              </div>

              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{edu.institution}</h3>
              <p className="mt-2 font-semibold text-primary">{edu.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">{edu.dates}</p>

              <ul className="mt-5 space-y-3">
                {edu.highlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[14px_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
