"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    href: "https://www.linkedin.com/in/nitin-v-kulkarni/",
    initials: "NK",
    name: "Nitin Kulkarni",
    title: "Ph.D. Candidate, University at Buffalo",
    relationship: "Research Mentor · November 2025",
    quote:
      "I had the pleasure of mentoring Vaibhav for 6 months on a research project on \u2018Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment\u2019. Vaibhav showed critical thinking skills; he analyzed the problem and came up with a few methodologies to try and was able to anticipate the challenges or issues we might run into. He was able to work well in a team, understanding how his work fits into the bigger picture and ensured timely progress to support his team members. He is hard working, eager to learn and solve problems and would be a great asset to any team!",
  },
  {
    href: "https://www.linkedin.com/in/kanavbansal/",
    initials: "KB",
    name: "Kanav Bansal",
    title: "CTO @ Innomatics | ThatAIGuy.com",
    relationship: "Direct Manager · April 2026",
    quote:
      "I\u2019ve had the opportunity to work closely with Vaibhav Saran, and he stands out as a highly capable and driven Data Science professional. Vaibhav brings a strong foundation in Machine Learning, Deep Learning and Generative AI, combined with an exceptional ability to translate complex problems into practical, scalable solutions. He has contributed significantly to building structured learning systems, automating processes, and improving data-driven decision-making across the organization. What differentiates him is his ownership mindset and speed of execution. Whether it\u2019s designing ML-driven assessments, working on content systems, or supporting placement outcomes through data-backed insights, Vaibhav consistently delivers high-impact results. Beyond his technical skills, he is proactive, dependable, and a strong team player who elevates the performance of those around him. I strongly recommend Vaibhav for roles that require analytical thinking, problem-solving, and end-to-end ownership in Data Science or Generative AI.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Swipe detection
  const pointerStartX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    pointerStartX.current = null;
  };

  const variants = {
    enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 px-4 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground">
            What collaborators and supervisors say
          </p>
        </motion.div>

        {/* Carousel wrapper — FIX 2: arrows anchored here, not inside card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track + arrows in a single relative container so arrows
              are centered against the fixed-height track, not card content */}
          <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>

            {/* Arrow: Left — FIX 2 */}
            <motion.button
              aria-label="Previous testimonial"
              onClick={prev}
              whileHover={{ scale: 1.15, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex"
              style={{
                position: "absolute",
                left: "0px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
              }}
              onMouseEnter={() => setPaused(true)}
            >
              <svg width="36" height="60" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="28,4 8,30 28,56" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </motion.button>

            {/* Card track */}
            <div
              style={{ width: "min(680px, 90vw)", minHeight: "420px", position: "relative", overflow: "hidden" }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.a
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  href={testimonials[current].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // FIX 1: card background visible in light mode
                  className="group rounded-2xl p-8 flex flex-col gap-4 cursor-pointer
                             bg-white dark:bg-white/5
                             border border-gray-200 dark:border-white/10
                             hover:shadow-xl transition-shadow duration-300"
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={(e) => {
                    if (
                      pointerStartX.current !== null &&
                      Math.abs(
                        (e as unknown as React.PointerEvent).clientX -
                          pointerStartX.current
                      ) > 10
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  {/* FIX 1: Quote text — readable in light + dark */}
                  <p
                    className="text-gray-800 dark:text-gray-100"
                    style={{ fontSize: "15px", lineHeight: "1.75", margin: 0, flex: 1 }}
                  >
                    {/* FIX 1: quote mark — purple visible in both modes */}
                    <span
                      className="text-purple-500 dark:text-purple-400"
                      style={{
                        fontSize: "28px",
                        lineHeight: 0,
                        verticalAlign: "-8px",
                        marginRight: "4px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      &ldquo;
                    </span>
                    {testimonials[current].quote}
                  </p>

                  {/* Reviewer row */}
                  <div
                    className="border-t border-gray-200 dark:border-white/10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      paddingTop: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {/* Avatar — purple gradient works in both modes */}
                      <div
                        className="flex-shrink-0"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #6366f1, #a855f7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>
                          {testimonials[current].initials}
                        </span>
                      </div>
                      <div>
                        {/* FIX 1: Name — solid purple visible in both modes */}
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#7C3AED", margin: 0, textDecoration: "none" }}>
                          {testimonials[current].name}
                        </p>
                        {/* FIX 1: Title */}
                        <p
                          className="text-gray-600 dark:text-gray-400"
                          style={{ fontSize: "12px", margin: "2px 0 0 0" }}
                        >
                          {testimonials[current].title}
                        </p>
                        {/* FIX 1: Relationship */}
                        <p
                          className="text-gray-500 dark:text-gray-500"
                          style={{ fontSize: "11px", margin: "2px 0 0 0" }}
                        >
                          {testimonials[current].relationship}
                        </p>
                      </div>
                    </div>
                    {/* LinkedIn icon — #7C3AED visible in both modes */}
                    <div style={{ flexShrink: 0 }}>
                      <Linkedin style={{ width: "18px", height: "18px", color: "#7C3AED", opacity: 0.7 }} />
                    </div>
                  </div>
                </motion.a>
              </AnimatePresence>
            </div>

            {/* Arrow: Right — FIX 2 */}
            <motion.button
              aria-label="Next testimonial"
              onClick={next}
              whileHover={{ scale: 1.15, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex"
              style={{
                position: "absolute",
                right: "0px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
              }}
              onMouseEnter={() => setPaused(true)}
            >
              <svg width="36" height="60" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="8,4 28,30 8,56" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </motion.button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-6" style={{ justifyContent: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: i === current ? "#7C3AED" : "rgba(124,58,237,0.3)",
                  background: i === current ? "#7C3AED" : "transparent",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
