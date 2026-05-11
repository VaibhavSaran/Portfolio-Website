"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    href: "https://www.linkedin.com/in/nitin-v-kulkarni/",
    initials: "NK",
    name: "Nitin Kulkarni",
    title: "Ph.D. Candidate, University at Buffalo",
    relationship: "Research Mentor - November 2025",
    quote:
      "I had the pleasure of mentoring Vaibhav for 6 months on a research project on 'Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment'. Vaibhav showed critical thinking skills; he analyzed the problem and came up with a few methodologies to try and was able to anticipate the challenges or issues we might run into. He was able to work well in a team, understanding how his work fits into the bigger picture and ensured timely progress to support his team members. He is hard working, eager to learn and solve problems and would be a great asset to any team!",
  },
  {
    href: "https://www.linkedin.com/in/kanavbansal/",
    initials: "KB",
    name: "Kanav Bansal",
    title: "CTO @ Innomatics | ThatAIGuy.com",
    relationship: "Direct Manager - April 2026",
    quote:
      "I've had the opportunity to work closely with Vaibhav Saran, and he stands out as a highly capable and driven Data Science professional. Vaibhav brings a strong foundation in Machine Learning, Deep Learning and Generative AI, combined with an exceptional ability to translate complex problems into practical, scalable solutions. He has contributed significantly to building structured learning systems, automating processes, and improving data-driven decision-making across the organization. What differentiates him is his ownership mindset and speed of execution. Whether it's designing ML-driven assessments, working on content systems, or supporting placement outcomes through data-backed insights, Vaibhav consistently delivers high-impact results. Beyond his technical skills, he is proactive, dependable, and a strong team player who elevates the performance of those around him. I strongly recommend Vaibhav for roles that require analytical thinking, problem-solving, and end-to-end ownership in Data Science or Generative AI.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;
  const goTo = useCallback((index: number) => setCurrent(((index % total) + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => goTo(current + 1), 7000);
    return () => window.clearInterval(id);
  }, [current, goTo, paused]);

  const item = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">References</p>
          <h2 className="section-title">What mentors and managers say.</h2>
        </motion.div>

        <div className="quiet-card p-5 md:p-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="block"
            >
              <p className="max-w-5xl text-lg leading-8 text-foreground md:text-xl md:leading-9">"{item.quote}"</p>
              <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
                    {item.initials}
                  </span>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.relationship}</p>
                  </div>
                </div>
                <Linkedin className="h-5 w-5 text-primary" />
              </div>
            </motion.a>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  onClick={() => goTo(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  className={`h-2.5 transition-all ${index === current ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => goTo(current - 1)} className="flex h-10 w-10 items-center justify-center border border-border bg-card hover:border-primary" aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => goTo(current + 1)} className="flex h-10 w-10 items-center justify-center border border-border bg-card hover:border-primary" aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
