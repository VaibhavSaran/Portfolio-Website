"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "skills", "education", "achievements"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section navigation - Desktop */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="glass-card rounded-full px-3 py-6">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group relative block"
                  aria-label={section.label}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-150"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                    {section.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-white/10">
        <div className="flex justify-around items-center px-4 py-3">
          {sections.slice(0, 5).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeSection === section.id
                  ? "text-indigo-500 scale-110"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-muted-foreground/30"
              }`} />
              <span className="text-xs font-medium">{section.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
