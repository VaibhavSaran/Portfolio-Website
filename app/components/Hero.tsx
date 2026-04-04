"use client";

import { motion, useInView } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { resumeData } from "../data/resume";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 30, suffix: "×", label: "Faster Analysis", sublabel: "45 min → <90 sec · F1 Primus AI" },
  { value: 150, suffix: "+", label: "Learners Mentored", sublabel: "4.7/5 satisfaction score" },
  { value: 83, suffix: "%", label: "RL Model Accuracy", sublabel: "ICU sepsis treatment" },
  { value: 12, suffix: "+", label: "Production Projects", sublabel: "Delivered across 7 countries" },
];

function StatCounter({
  value,
  suffix,
  label,
  sublabel,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="glass-card rounded-xl p-3 sm:p-4 text-center flex flex-col gap-0.5">
      <div className="text-2xl sm:text-3xl font-bold text-gradient">
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-foreground/90">{label}</div>
      <div className="text-xs text-muted-foreground leading-tight">{sublabel}</div>
    </div>
  );
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [photoHeight, setPhotoHeight] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const measure = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (contentRef.current && window.innerWidth >= 768) {
        setPhotoHeight(contentRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleViewExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto w-full z-10 py-12">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

          {/* Profile photo — first in DOM (above name on mobile) */}
          <motion.div
            className="md:order-2 flex-shrink-0 flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mobile: fixed sizes; Desktop: height matches content column */}
            <div
              className="rounded-2xl overflow-hidden profile-glow"
              style={
                isDesktop && photoHeight > 0
                  ? {
                      height: `${photoHeight}px`,
                      aspectRatio: "1286 / 1706",
                      width: "auto",
                      borderRadius: "16px",
                      flexShrink: 0,
                    }
                  : {
                      width: "160px",
                      height: "213px",
                      borderRadius: "16px",
                    }
              }
            >
              <img
                id="profile-photo"
                src="/images/profile.jpg"
                alt="Vaibhav Saran"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.background =
                      "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)";
                    parent.innerHTML =
                      '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem;font-weight:700;color:white">VS</span>';
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Text content — second in DOM, first on desktop (md:order-1) */}
          <div className="md:order-1 flex-1 min-w-0 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Measured region: name → CTA buttons */}
              <div ref={contentRef}>
                {/* Name */}
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="text-gradient">{resumeData.basics.name}</span>
                </motion.h1>

                {/* Title — "IEEE ICMLA 2025" on its own line */}
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Agentic AI Engineer · LLM Systems · Production ML
                  <br />
                  IEEE ICMLA 2025
                </motion.p>

                {/* Bio */}
                <motion.p
                  className="text-base text-muted-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {resumeData.basics.summary}
                </motion.p>

                {/* Stats Counter Strip */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {stats.map((stat, i) => (
                    <StatCounter key={i} {...stat} />
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
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
              </div>
              {/* End measured region */}

              {/* Social Links — outside measured region */}
              <motion.div
                className="flex gap-6 justify-center md:justify-start mt-8"
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
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.5v8C3.5 19.5 5 21 7 21h10c2 0 3.5-1.5 3.5-3.5v-8H24L12 0z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
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
