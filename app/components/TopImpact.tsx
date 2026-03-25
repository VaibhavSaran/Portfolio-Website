"use client";

import { motion } from "framer-motion";
import { Award, Linkedin } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TopImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const impacts = [
    {
      icon: Award,
      title: "CSE Demo Days Winner",
      description: "Secured 3rd place at CSE Demo Days, SUNY Buffalo for the project Optimizing Sepsis Treatment with Reinforcement Learning",
      color: "from-blue-500 to-cyan-500",
      link: "https://www.linkedin.com/posts/vaibhav-saran_celebratingacademicexcellence-aiinhealthcare-activity-7332943025297379328-S61N?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
    },
    {
      icon: Award,
      title: "NY-BEST 2025 Conference",
      description: "Presented research poster on Green CRISP-ML(Q) at NY Battery and Energy Storage Technology Consortium Conference, Ithaca, NY",
      color: "from-purple-500 to-pink-500",
      link: "https://www.linkedin.com/posts/vaibhav-saran_sustainableai-greencomputing-artificialintelligence-activity-7391684003608817664-2WP-?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
    },
    {
      icon: Award,
      title: "IEEE ICMLA 2025",
      description: "Published research paper on Attention-based Offline RL for Sepsis Treatment at IEEE International Conference on Machine Learning and Applications",
      color: "from-yellow-500 to-orange-500",
      link: "https://www.linkedin.com/posts/vaibhav-saran_machinelearning-healthcare-ai-activity-7408712990381719552-dxlF?utm_source=share&utm_medium=member_desktop&rcm=ACoAACrJ1RkBr3SBhEiiMekgd27eRgCdbn-1BOo",
    },
  ];

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            const CardWrapper = impact.link ? 'a' : 'div';
            const cardProps = impact.link
              ? {
                  href: impact.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <CardWrapper
                  {...cardProps}
                  className="block group relative glass-card rounded-xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${impact.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${impact.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {impact.link && (
                        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{impact.title}</h3>
                    <p className="text-sm text-muted-foreground">{impact.description}</p>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
