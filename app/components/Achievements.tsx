"use client";

import { motion, useInView } from "framer-motion";
import { Trophy, Award, Users, TrendingUp, GitPullRequest, Star, Code2, Github, FileText, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { resumeData } from "../data/resume";

const iconMap: { [key: string]: any } = {
  award: Award,
  publication: Trophy,
  metric: TrendingUp,
  leadership: Star,
  opensource: GitPullRequest,
  project: Code2,
  research: FileText,
};

const colorMap: { [key: string]: string } = {
  award: "from-yellow-500 to-orange-500",
  publication: "from-indigo-500 to-purple-500",
  metric: "from-green-500 to-emerald-500",
  leadership: "from-blue-500 to-cyan-500",
  opensource: "from-pink-500 to-rose-500",
  project: "from-violet-500 to-purple-500",
  research: "from-emerald-500 to-teal-500",
};

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Separate top tier achievements
  const topTierAchievements = resumeData.achievements.filter(
    (a) => a.type === "publication" || a.title.includes("Winner — CSE Demo Days, SUNY Buffalo")
  );

  const otherAchievements = resumeData.achievements.filter(
    (a) => a.type !== "publication" && !a.title.includes("Winner — CSE Demo Days, SUNY Buffalo")
  );

  // Animated counter
  const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isInView, value]);

    return (
      <span className="text-4xl font-bold text-gradient">
        {count}
        {suffix}
      </span>
    );
  };

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
            <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Recognition and impact across research, mentorship, and open source
          </p>
        </motion.div>

        {/* Top Tier Achievements - Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {topTierAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.type];
            const colorClass = colorMap[achievement.type];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative glass-card rounded-2xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Prominent glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Large trophy icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${colorClass} mb-6 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.context}
                    </p>
                    <div className="pt-4">
                      <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${colorClass} text-white shadow-md`}>
                        {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.type];
            const colorClass = colorMap[achievement.type];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                className="group relative glass-card rounded-xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Subtle glow */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClass} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    {achievement.value ? (
                      <div className="mb-3">
                        <AnimatedCounter
                          value={achievement.value}
                          suffix={achievement.title.includes("%") ? "%" : "+"}
                        />
                      </div>
                    ) : null}

                    <h3 className="text-lg font-bold">
                      {achievement.value ? achievement.title.replace(/\d+\+?%?/, "").trim() : achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{achievement.context}</p>

                    {achievement.github && (
                      <div className="pt-3">
                        <a
                          href={achievement.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/50 transition-all text-sm font-semibold"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      </div>
                    )}

                    {achievement.link && (
                      <div className="pt-3">
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-500/50 transition-all text-sm font-semibold"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Poster
                        </a>
                      </div>
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
