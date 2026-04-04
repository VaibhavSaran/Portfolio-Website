"use client";

import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useRef } from "react";

// CERTIFICATIONS: Add real certs here.
// Recommended: AWS Cloud Practitioner (1 week study), GCP Associate (2-3 weeks).
// Remove "Planned" badges once earned.

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    note: "[ Add after earning ]",
    initials: "AWS",
    gradient: "from-orange-400 to-yellow-500",
  },
  {
    title: "GCP Associate Cloud Engineer",
    issuer: "Google Cloud",
    note: "[ Add after earning ]",
    initials: "GCP",
    gradient: "from-blue-400 to-cyan-500",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="certifications" ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
          <p className="text-lg text-muted-foreground">
            Verified credentials and completed courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative glass-card rounded-xl p-6 flex flex-col gap-4"
              style={{ opacity: 0.6 }}
            >
              {/* Planned badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary/60 border border-white/20 text-muted-foreground">
                  Planned
                </span>
              </div>

              {/* Logo placeholder */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-xs font-bold text-white">{cert.initials}</span>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-base mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground italic">{cert.note}</p>
              </div>

              {/* Greyed-out Verify button */}
              <button
                disabled
                className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/40 border border-white/10 text-muted-foreground/50 text-sm font-semibold cursor-not-allowed"
              >
                <ShieldCheck className="w-4 h-4" />
                Verify
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
