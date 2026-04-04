"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { resumeData } from "../data/resume";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Extract metrics from bullets
  const extractMetrics = (bullets: string[]) => {
    const metrics: string[] = [];
    bullets.forEach((bullet) => {
      const numbers = bullet.match(/\d+(\.\d+)?[%+]?/g);
      if (numbers && numbers.length > 0) {
        metrics.push(bullet);
      }
    });
    return metrics.slice(0, 2);
  };

  return (
    <section id="experience" ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            2+ years of experience in AI Engineering, Production ML, and Research
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-30" />

          {/* Experience items — only show substantive roles (Research Assistant + Data Scientist) */}
          <div className="space-y-8">
            {resumeData.experience.slice(0, 2).map((exp, index) => {
              const isExpanded = expandedIndex === index;
              const metrics = extractMetrics(exp.bullets);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute top-8 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-purple-500/50"
                    style={{
                      [isLeft ? 'right' : 'left']: '-2.25rem'
                    }}
                  />

                  {/* Card */}
                  <div
                    onClick={() => toggleExpand(index)}
                    className="glass-card rounded-xl p-6 cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-gradient transition-all">
                          {exp.role}
                        </h3>
                        <p className="text-indigo-400 font-semibold mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.dates}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Metrics badges */}
                    {metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {metrics.map((metric, i) => {
                          const number = metric.match(/\d+(\.\d+)?[%+]?/)?.[0];
                          return (
                            <span
                              key={i}
                              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
                            >
                              {number}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10">
                            <ul className="space-y-3">
                              {exp.bullets.map((bullet, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex gap-3 text-sm text-muted-foreground"
                                >
                                  <span className="text-indigo-500 mt-1">▸</span>
                                  <span>{bullet}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
