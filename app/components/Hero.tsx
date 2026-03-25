"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { resumeData } from "../data/resume";

export default function Hero() {
  const handleViewExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Content */}
      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-gradient">{resumeData.basics.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {resumeData.basics.title}
          </motion.p>

          {/* Summary */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {resumeData.basics.summary.split('.')[0] + '.'} Published research on attention-based offline RL for sepsis treatment (IEEE ICMLA 2025). Building scalable AI solutions from research to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button
              onClick={handleViewExperience}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Experience
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>

            <a
              href="https://drive.google.com/file/d/1Yp3S1QVjm_0LfZhwF8eWqQkuB6qK2_XC/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 glass-card rounded-lg font-semibold text-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 border-2 border-white/20"
            >
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Download Resume
              </span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href={`mailto:${resumeData.basics.email}`}
              className="p-3 glass-card rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/30"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href={`https://${resumeData.basics.links.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={`https://${resumeData.basics.links.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://scholar.google.com/citations?user=cF7cswgAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
              aria-label="Google Scholar"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.5v8C3.5 19.5 5 21 7 21h10c2 0 3.5-1.5 3.5-3.5v-8H24L12 0z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
