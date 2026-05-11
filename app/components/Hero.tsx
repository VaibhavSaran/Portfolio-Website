"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowDown,
  Calendar,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { resumeData } from "../data/resume";

const metrics = [
  { value: "83%", label: "Sepsis RL accuracy", detail: "MIMIC-III and e-ICU" },
  { value: "150+", label: "Learners mentored", detail: "4.7/5 satisfaction score" },
  { value: "12", label: "Production projects", detail: "Across 7 countries" },
  { value: "1,000+", label: "News articles indexed", detail: "StockPilot AI pipeline" },
];

function MetricCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="metric-card">
      <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Agentic AI Engineer", "LLM Systems Builder", "Production ML Engineer", "ML Researcher"];

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [roles.length]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen overflow-hidden pt-24">
      <div className="section-shell grid min-h-[calc(100vh-6rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Research to deployed AI systems</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {resumeData.basics.name}
            <span className="mt-4 block text-gradient">{roles[roleIndex]}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {resumeData.basics.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              {resumeData.basics.location}
            </span>
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2">
              <Calendar className="h-4 w-4 text-primary" />
              Open to AI/ML roles
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={scrollToProjects}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              See deployed work
              <ArrowDown className="h-4 w-4" />
            </button>
            <a
              href="https://drive.google.com/file/d/134342Mr6VdjHp8Bn3Hxzsw0O2vwHh9mQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition hover:-translate-y-1 hover:border-primary"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a
              href="https://calendly.com/vaibhavsaran8/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition hover:-translate-y-1 hover:border-primary"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${resumeData.basics.email}`}
              className="flex h-11 w-11 items-center justify-center border border-border bg-card text-foreground transition hover:-translate-y-1 hover:border-primary"
              aria-label="Email Vaibhav"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={`https://${resumeData.basics.links.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center border border-border bg-card text-foreground transition hover:-translate-y-1 hover:border-primary"
              aria-label="GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`https://${resumeData.basics.links.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center border border-border bg-card text-foreground transition hover:-translate-y-1 hover:border-primary"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative"
        >
          <div className="quiet-card scanline relative overflow-hidden p-3">
            <div className="absolute left-0 top-0 h-1 w-2/5 bg-primary" />
            <div className="absolute right-0 top-0 h-1 w-1/5 bg-accent" />
            <img
              src="/images/profile.jpg"
              alt="Vaibhav Saran"
              className="aspect-[4/5] w-full object-cover object-top grayscale-[18%] contrast-105"
            />
            <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-black/52 p-4 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">Current signal</p>
              <p className="mt-2 text-lg font-semibold">Multi-agent systems, RAG, RL research, and MLOps.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
