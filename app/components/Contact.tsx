"use client";

import { useState } from "react";
import { ArrowUpRight, Send, CheckCircle, Linkedin } from "lucide-react";
import { site } from "../data/site";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(site.contactEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="section-shell section-block contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">06 / START A CONVERSATION</p>
          <h2>
            Something interesting
            <br />
            on your <em>mind?</em>
          </h2>
          <p>
            A team to join. A problem to untangle. An idea worth exploring. I’d
            love to hear about it.
          </p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={17} />
          </a>
          <div className="contact-secondary">
            <a
              className="text-link"
              href={site.calendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a call <ArrowUpRight size={14} />
            </a>
            <a
              className="text-link"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Linkedin size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        {status === "success" ? (
          <div className="form-message" role="status">
            <CheckCircle size={26} />
            <h3>Message sent. Thank you.</h3>
            <p>I’ll get back to you soon.</p>
            <button className="text-link" onClick={() => setStatus("idle")}>
              Send another message <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label="Contact Vaibhav"
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="Alex Morgan"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Email address
                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  placeholder="alex@company.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              What are you thinking?
              <textarea
                name="message"
                rows={6}
                required
                maxLength={5000}
                placeholder="A little about your team, idea, or opportunity…"
              />
            </label>
            <button
              className="button button-dark"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <Send size={14} />
            </button>
            {status === "error" && (
              <p className="form-message form-error" role="alert">
                Your message couldn’t be sent. Please try again or{" "}
                <a href={`mailto:${site.email}`}>email me directly</a>.
              </p>
            )}
            <p className="form-note">
              Your message is delivered securely via Formspree.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
