"use client";

import { motion, useInView } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useRef } from "react";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="testimonials" ref={ref} className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Testimonials</h2>
          <p className="text-lg text-muted-foreground">
            What collaborators and supervisors say
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.a
            href="https://www.linkedin.com/in/nitin-v-kulkarni/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="group relative glass-card rounded-2xl p-8 flex flex-col gap-4 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl w-full max-w-2xl cursor-pointer"
            style={{ textDecoration: "none" }}
          >
            {/* Quote text — inline quote mark to eliminate gap */}
            <p style={{ fontSize: "15px", lineHeight: "1.75", color: "rgba(255,255,255,0.85)", margin: 0, flex: 1 }}>
              <span style={{ fontSize: "28px", lineHeight: 0, verticalAlign: "-8px", marginRight: "4px", color: "#7C6FFF", fontFamily: "Georgia, serif" }}>&ldquo;</span>
              I had the pleasure of mentoring Vaibhav for 6 months on a research project on &lsquo;Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment&rsquo;. Vaibhav showed critical thinking skills; he analyzed the problem and came up with a few methodologies to try and was able to anticipate the challenges or issues we might run into. He was able to work well in a team, understanding how his work fits into the bigger picture and ensured timely progress to support his team members. He is hard working, eager to learn and solve problems and would be a great asset to any team!
            </p>

            {/* Reviewer row */}
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* Left: avatar + text */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  className="flex-shrink-0"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>NK</span>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#7C6FFF", margin: 0, textDecoration: "none" }}>Nitin Kulkarni</p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "2px 0 0 0" }}>Ph.D. Candidate, University at Buffalo</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "2px 0 0 0" }}>Research Mentor · November 2025</p>
                </div>
              </div>
              {/* Right: LinkedIn icon */}
              <div style={{ flexShrink: 0 }}>
                <Linkedin style={{ width: "18px", height: "18px", color: "#7C6FFF", opacity: 0.7 }} />
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
