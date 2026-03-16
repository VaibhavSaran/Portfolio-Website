"use client";

import { motion, useInView } from "framer-motion";
import { Brain, Code, Cloud, Database, Workflow, Zap } from "lucide-react";
import { useRef } from "react";
import { resumeData } from "../data/resume";

const categoryIcons: { [key: string]: any } = {
  "AI & ML Frameworks": Brain,
  "ML Engineering": Workflow,
  "Cloud & Infrastructure": Cloud,
  "Databases & Vector Stores": Database,
  "Data Engineering": Zap,
  "Deep Learning": Brain,
  "Web Development": Code,
  "Programming Languages": Code,
  "Agentic AI": Brain,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Full-stack AI development from research to production
          </p>
        </motion.div>

        {/* Top Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4 font-semibold">TOP SKILLS</p>
          <div className="flex flex-wrap justify-center gap-3">
            {resumeData.topSkills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-110 transition-transform"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(resumeData.skills).map(([category, skills], index) => {
            const Icon = categoryIcons[category] || Code;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group glass-card rounded-xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{category}</h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md text-sm bg-secondary/50 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:border hover:border-indigo-500/30 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-3 font-semibold">LANGUAGES</p>
          <div className="flex flex-wrap justify-center gap-3">
            {resumeData.languages.map((language, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg glass-card text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
