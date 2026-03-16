"use client";

import { motion, useInView } from "framer-motion";
import { Info, Github } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

export default function Additional() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!resumeData.extra || resumeData.extra.length === 0) return null;

  return (
    <section ref={ref} className="py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Additional Highlights</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.extra.map((item, index) => {
            const isLinkItem = typeof item === "object" && item.text && item.link;
            const text = isLinkItem ? item.text : item;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-lg p-4 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{text}</p>
                    {isLinkItem && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/50 transition-all text-xs font-semibold"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
