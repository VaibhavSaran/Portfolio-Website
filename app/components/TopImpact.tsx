"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Award, FileText, Presentation } from "lucide-react";
import { useRef } from "react";

const impacts = [
  {
    icon: Award,
    title: "CSE Demo Days Winner",
    description:
      "Secured 3rd place at CSE Demo Days, SUNY Buffalo for Optimizing Sepsis Treatment with Reinforcement Learning.",
    link: "https://www.linkedin.com/posts/vaibhav-saran_celebratingacademicexcellence-aiinhealthcare-activity-7332943025297379328-S61N?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
  },
  {
    icon: Presentation,
    title: "NY-BEST 2025 Conference",
    description:
      "Presented Green CRISP-ML(Q), a sustainable AI workflow and profiling framework, at the NY Battery and Energy Storage Technology Consortium Conference.",
    link: "https://www.linkedin.com/posts/vaibhav-saran_sustainableai-greencomputing-artificialintelligence-activity-7391684003608817664-2WP-?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
  },
  {
    icon: FileText,
    title: "IEEE ICMLA 2025",
    description:
      "Published work on attention-based offline reinforcement learning for interpretable sepsis treatment.",
    link: "https://www.linkedin.com/posts/vaibhav-saran_machinelearning-healthcare-ai-activity-7408712990381719552-dxlF?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
  },
];

export default function TopImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="py-12">
      <div className="section-shell">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Proof before promises</p>
            <h2 className="section-title max-w-3xl">Signals a recruiter can verify quickly.</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <motion.a
                key={impact.title}
                href={impact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group quiet-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-primary"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{impact.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{impact.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
