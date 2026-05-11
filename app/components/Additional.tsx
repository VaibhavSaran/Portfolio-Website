"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Info } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

export default function Additional() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (!resumeData.extra?.length) return null;

  return (
    <section ref={ref} className="py-16">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="noise-panel border border-border p-6 md:p-8"
        >
          <p className="section-kicker">More context</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {resumeData.extra.map((item, index) => {
              const isLinkItem = typeof item === "object" && "text" in item && "link" in item;
              const text = isLinkItem ? item.text : item;
              return (
                <div key={index} className="flex gap-3 border border-border bg-background/56 p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                    {isLinkItem && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                      >
                        Open repository
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
