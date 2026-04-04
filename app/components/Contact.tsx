"use client";

import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);

    try {
      // Formspree endpoint for vaibhavsaran8@gmail.com
      const response = await fetch("https://formspree.io/f/xeeprnpp", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Let&apos;s build something meaningful together
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[340px] lg:flex-shrink-0 space-y-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              Open to AI/ML engineering roles, research collaborations, and interesting projects. Feel free to reach out directly or schedule a call.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:vaibhavsaran8@gmail.com"
                className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-indigo-400 transition-colors">
                  vaibhavsaran8@gmail.com
                </span>
              </a>

              <a
                href="https://linkedin.com/in/vaibhav-saran"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  linkedin.com/in/vaibhav-saran
                </span>
              </a>

              <a
                href="https://github.com/VaibhavSaran"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
                  github.com/VaibhavSaran
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full flex-1 min-w-0 glass-card rounded-xl p-6"
          >
            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-lg font-semibold">Message sent!</p>
                <p className="text-muted-foreground text-sm">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/60 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="hello@example.com"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === "sending" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {formStatus === "error" && (
                  <p className="text-xs text-red-400 text-center">
                    Something went wrong. Please email me directly at{" "}
                    <a href="mailto:vaibhavsaran8@gmail.com" className="underline hover:text-red-300">
                      vaibhavsaran8@gmail.com
                    </a>
                  </p>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-muted-foreground font-medium">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Schedule button */}
                <button
                  type="button"
                  onClick={() => window.open("https://calendly.com/vaibhavsaran8/30min", "_blank")}
                  className="w-full py-3.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Call
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
