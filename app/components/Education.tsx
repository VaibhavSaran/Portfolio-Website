"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Academic excellence and continuous learning
          </p>
        </motion.div>

        <div className="space-y-8">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative glass-card rounded-xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left side */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all">
                          {edu.institution}
                        </h3>
                        <p className="text-lg text-indigo-400 font-semibold mb-2">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.dates}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="text-indigo-500 mt-1">▸</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right side - GPA/Grade */}
                  <div className="flex flex-col gap-2">
                    {edu.gpa && (
                      <div className="glass-card rounded-lg p-4 text-center min-w-[120px]">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-indigo-500" />
                          <p className="text-xs text-muted-foreground font-semibold">GPA</p>
                        </div>
                        <p className="text-2xl font-bold text-gradient">{edu.gpa}</p>
                        <p className="text-xs text-muted-foreground">/ 4.0</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
