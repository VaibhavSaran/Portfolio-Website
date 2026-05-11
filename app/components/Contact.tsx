"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, CheckCircle, Github, Linkedin, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { resumeData } from "../data/resume";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xeeprnpp", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");
      setFormStatus("success");
      e.currentTarget.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid gap-6 lg:grid-cols-[0.78fr_1fr]"
        >
          <div className="noise-panel border border-border p-6 md:p-8">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Reach out when the role needs builders who can ship.</h2>
            <p className="section-copy">
              I am open to AI Engineer, ML Engineer, LLM/GenAI Engineer, MLOps Engineer, and Applied Scientist roles.
            </p>

            <div className="mt-8 grid gap-3">
              <a href={`mailto:${resumeData.basics.email}`} className="inline-flex items-center gap-3 border border-border bg-background/70 px-4 py-3 font-semibold hover:border-primary">
                <Mail className="h-5 w-5 text-primary" />
                {resumeData.basics.email}
              </a>
              <a href={`https://${resumeData.basics.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-border bg-background/70 px-4 py-3 font-semibold hover:border-primary">
                <Linkedin className="h-5 w-5 text-primary" />
                linkedin.com/in/vaibhav-saran
              </a>
              <a href={`https://${resumeData.basics.links.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-border bg-background/70 px-4 py-3 font-semibold hover:border-primary">
                <Github className="h-5 w-5 text-primary" />
                github.com/VaibhavSaran
              </a>
              <a href="https://calendly.com/vaibhavsaran8/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-border bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90">
                <Calendar className="h-5 w-5" />
                Schedule a call
              </a>
            </div>
          </div>

          <div className="quiet-card p-6 md:p-8">
            {formStatus === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle className="h-12 w-12 text-accent" />
                <p className="mt-4 text-2xl font-semibold">Message sent.</p>
                <p className="mt-2 text-muted-foreground">I will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    Name
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="min-h-12 border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground/70"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="min-h-12 border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground/70"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={8}
                    placeholder="Tell me about the role, team, or problem space."
                    className="resize-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                  />
                </label>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending..." : "Send message"}
                  <Send className="h-4 w-4" />
                </button>

                {formStatus === "error" && (
                  <p className="text-sm font-semibold text-red-500">
                    Something went wrong. Please email me directly at {resumeData.basics.email}.
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
