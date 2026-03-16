"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import SplashScreen from "./components/SplashScreen";
import Hero from "./components/Hero";
import TopImpact from "./components/TopImpact";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Additional from "./components/Additional";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Prevent scroll during splash
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSplash]);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            <ThemeToggle />
            <ScrollProgress />

            <div id="hero">
              <Hero />
            </div>

            <TopImpact />

            <div id="experience">
              <Experience />
            </div>

            <div id="projects">
              <Projects />
            </div>

            <div id="skills">
              <Skills />
            </div>

            <div id="education">
              <Education />
            </div>

            <div id="achievements">
              <Achievements />
            </div>

            <Additional />

            <Footer />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
