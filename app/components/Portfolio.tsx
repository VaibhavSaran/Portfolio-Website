"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { resumeData } from "../data/resume";
import { site, navigation } from "../data/site";
import { portraits, projectArtwork } from "../data/media";
import HeroContent from "./portfolio/HeroContent";
import {
  External,
  SectionHeading,
  Links,
  Tags,
  ProjectIllustration,
} from "./portfolio/Primitives";
import { testimonials } from "../data/testimonials";
import AmbientScene from "./AmbientScene";
import Contact from "./Contact";
import ThemeToggle from "./ThemeToggle";
import ScrollLoop from "./ScrollLoop";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEarlier, setShowEarlier] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedQuotes, setExpandedQuotes] = useState<string[]>([]);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  const featured = resumeData.projects.slice(0, 2);
  const supporting = [resumeData.projects[2], resumeData.projects[4]];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AmbientScene />
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="wordmark">
            Vaibhav<span> Saran</span>
            <span className="wordmark-dot">.</span>
          </a>
          <nav
            aria-label="Main navigation"
            className={menuOpen ? "navigation open" : "navigation"}
          >
            {navigation.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              className="nav-resume"
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <ArrowUpRight size={14} />
            </a>
          </nav>
          <div className="header-controls">
            <ThemeToggle />
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <div className="hero-journey" id="home">
          <section
            className="hero section-shell"
            aria-label="Introduction and scroll journey"
          >
            <HeroContent />
          </section>
        </div>

        <section className="section-shell section-block" id="experience">
          <SectionHeading
            index="01"
            label="PROFESSIONAL EXPERIENCE"
            title="Where I put it into practice."
            copy="Building with teams. Solving real problems. Taking responsibility for the system, not just the model."
          />
          <div className="experience-list">
            {resumeData.experience.slice(0, 3).map((exp, i) => (
              <article className="experience-row" key={exp.company}>
                <div className="experience-meta">
                  <span className="meta">{exp.dates}</span>
                  <h3>{exp.company}</h3>
                  <span className="location">{exp.location}</span>
                </div>
                <div className="experience-detail">
                  <div className="role-heading">
                    <h4>{exp.role}</h4>
                    {i === 0 && (
                      <span className="current-badge">
                        <span className="status-dot" /> Current
                      </span>
                    )}
                  </div>
                  <ul className="prose-list">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <button
            className="text-link earlier-toggle"
            onClick={() => setShowEarlier(!showEarlier)}
            aria-expanded={showEarlier}
          >
            {showEarlier
              ? "Hide earlier experience"
              : "Earlier experience & open-source contributions"}
            <span>{showEarlier ? "−" : "+"}</span>
          </button>
          {showEarlier && (
            <div className="earlier-experience">
              {resumeData.experience.slice(3).map((exp) => (
                <article key={`${exp.company}-${exp.role}-${exp.dates}`}>
                  <span className="meta">{exp.dates}</span>
                  <h3>{exp.role}</h3>
                  <p className="muted">{exp.company}</p>
                  <ul className="prose-list">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="work-section" id="projects">
          <div className="section-shell section-block">
            <SectionHeading
              index="02"
              label="SELECTED ENGINEERING"
              title="Ideas, built into systems."
              copy="A closer look at the agents, pipelines, and applications I’ve taken from a question to a working product."
            />
            <div className="flagships">
              {featured.map((project, i) => (
                <article
                  className={`flagship flagship-${i}`}
                  key={project.title}
                >
                  <div className="flagship-media">
                    <div className="media-topline">
                      <span>
                        0{i + 1} /{" "}
                        {i === 0
                          ? "MULTI-AGENT RESEARCH"
                          : "AUTONOMOUS RACE INTELLIGENCE"}
                      </span>
                      <span>2026</span>
                    </div>
                    <Image
                      src={projectArtwork[i === 0 ? "stockpilot" : "f1"]}
                      width={1672}
                      height={941}
                      alt={
                        i === 0
                          ? "Editorial illustration of glass financial research planes, archival records, and a central research lens"
                          : "Editorial illustration of an unbranded open-wheel car with glass weather, telemetry, and race-report panels"
                      }
                      sizes="(max-width: 760px) 100vw, 60vw"
                    />
                    <div className="media-bottomline">
                      <span>
                        {i === 0
                          ? "RETRIEVE. REASON. RESEARCH."
                          : "BEFORE THE LIGHTS GO OUT."}
                      </span>
                    </div>
                  </div>
                  <div className="flagship-copy">
                    <p className="eyebrow">
                      {i === 0
                        ? "AGENTIC AI / FINANCIAL RESEARCH"
                        : "AGENTIC AI / MLOPS"}
                    </p>
                    <h3>
                      {i === 0 ? "StockPilot AI" : "F1 Primus AI"}
                      <span>
                        {i === 0
                          ? "A research desk, orchestrated."
                          : "Race intelligence. Before race day."}
                      </span>
                    </h3>
                    <p className="project-lead">{project.bullets[0]}</p>
                    <p>{project.bullets[1]}</p>
                    <p>{project.bullets[2]}</p>
                    <div className="project-result">
                      <strong>{i === 0 ? "<10 sec" : "<2 min"}</strong>
                      <span>
                        {i === 0
                          ? "multi-source research responses"
                          : "autonomous pre-race reports"}
                      </span>
                    </div>
                    <Tags skills={project.skills} />
                    <Links links={project.links} />
                  </div>
                </article>
              ))}
            </div>
            <div className="work-subheading">
              <h3>More systems. Different problems.</h3>
              <span className="meta">THE SAME END-TO-END APPROACH</span>
            </div>
            <div className="supporting-projects">
              {supporting.map((project, i) => (
                <article
                  className={`supporting-project ${i === 0 ? "wide-project" : ""}`}
                  key={project.title}
                >
                  <ProjectIllustration
                    asset={i === 0 ? "automation" : "laptrack"}
                    alt={
                      i === 0
                        ? "Editorial glass sorting sculpture organizing opportunity cards into a selected shortlist"
                        : "Editorial comparison display of a laptop, phone, tablet, smartwatch, and folding phones on ivory stone plinths"
                    }
                  />
                  <div className="supporting-copy">
                    <p className="eyebrow">
                      {i === 0
                        ? "WORKFLOW AUTOMATION"
                        : "DATA ENGINEERING / RECOMMENDATIONS"}
                    </p>
                    <h3>{i === 0 ? "Job Search Automation" : "Laptrack"}</h3>
                    <ul className="prose-list">
                      {project.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <Tags skills={project.skills} />
                    <Links links={project.links} />
                  </div>
                </article>
              ))}
              <article className="supporting-project">
                <ProjectIllustration
                  asset="hand-sign"
                  alt="Editorial gallery of hand sculptures in distinct fingerspelling poses, framed by sage optical glass"
                />
                <div className="supporting-copy">
                  <p className="eyebrow">COMPUTER VISION / ACCESSIBILITY</p>
                  <h3>Hand Sign Detection</h3>
                  <ul className="prose-list">
                    {resumeData.projects[5].bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Tags skills={resumeData.projects[5].skills} />
                  <Links links={resumeData.projects[5].links} />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-shell section-block" id="research">
          <SectionHeading
            index="03"
            label="RESEARCH & PUBLICATIONS"
            title="Questions worth investigating."
            copy="Interpretable clinical decisions and more sustainable machine learning. Work that asks what better could look like."
          />
          <div className="research-grid">
            <article className="research-card">
              <ProjectIllustration
                research
                asset="sepsis"
                alt="Editorial clinical glass sculpture with layered records and a decision path, representing interpretable sepsis research"
              />
              <div className="research-copy">
                <p className="eyebrow">IEEE ICMLA 2025 / CONFERENCE PAPER</p>
                <h3>
                  Interpretable sepsis treatment with offline reinforcement
                  learning.
                </h3>
                <ul className="prose-list">
                  {resumeData.projects[3].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="research-stat">
                  <strong>83%</strong>
                  <span>
                    treatment accuracy in research evaluation
                    <br />
                    23 percentage points above the BCQ baseline
                  </span>
                </div>
                <p className="citation">
                  Kumar P., Saran V., Patel D., Kulkarni N., Vereshchaka A.
                  <br />
                  <em>
                    Attention-Based Offline RL and Clustering for Interpretable
                    Sepsis.
                  </em>{" "}
                  IEEE ICMLA 2025.
                </p>
                <Tags skills={resumeData.projects[3].skills} />
                <Links links={resumeData.projects[3].links} />
                <p className="collaboration">
                  With Punit Kumar (lead author), Divyesh Patel, and research
                  collaborators at University at Buffalo.
                </p>
              </div>
            </article>
            <article className="research-card green-research-card">
              <ProjectIllustration
                research
                asset="green-crisp"
                alt="Editorial glass computing core surrounded by six sustainability panels and an energy ribbon"
              />
              <div className="research-copy">
                <p className="eyebrow">NY-BEST 2025 / POSTER PRESENTATION</p>
                <h3>
                  Green CRISP-ML(Q): a framework for sustainable machine
                  learning.
                </h3>
                <p>{resumeData.research.greenCrisp.overview}</p>
                <p>{resumeData.research.greenCrisp.experiment}</p>
                <div
                  className="green-findings"
                  aria-label="Measured experiment results"
                >
                  {resumeData.research.greenCrisp.findings.map((finding) => (
                    <div key={finding.value}>
                      <strong>{finding.value}</strong>
                      <span>{finding.label}</span>
                    </div>
                  ))}
                </div>
                <details className="research-details">
                  <summary>Inside the profiler</summary>
                  <p>{resumeData.research.greenCrisp.architecture}</p>
                  <ol
                    className="checkpoint-list"
                    aria-label="Six sustainability checkpoints"
                  >
                    {resumeData.research.greenCrisp.checkpoints.map(
                      (checkpoint) => (
                        <li key={checkpoint}>{checkpoint}</li>
                      ),
                    )}
                  </ol>
                  <p>{resumeData.research.greenCrisp.limitations}</p>
                </details>
                <p className="citation">
                  Saran V., Imran A.
                  <br />
                  <em>
                    Green CRISP-ML(Q): A Framework for Sustainable Machine
                    Learning.
                  </em>{" "}
                  Poster, NY-BEST 2025.
                </p>
                <Tags skills={resumeData.research.greenCrisp.skills} />
                <External className="text-link" href={site.poster}>
                  View research poster
                </External>
                <details className="research-details poster-preview">
                  <summary>Preview the original poster</summary>
                  <a
                    href={site.poster}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the full Green CRISP-ML(Q) poster PDF"
                  >
                    <Image
                      src="/images/work/green-crisp-poster.webp"
                      width={1400}
                      height={1333}
                      sizes="(max-width: 760px) 90vw, 45vw"
                      alt="Original University at Buffalo poster by Vaibhav Saran and Dr. Asif Imran, showing the six-stage framework, five-phase profiler, and NCF experiment findings"
                    />
                  </a>
                </details>
              </div>
            </article>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-shell section-block">
            <SectionHeading
              index="04"
              label="THE PERSON BEHIND THE SYSTEMS"
              title="An engineer. Always a student."
            />
            <div className="about-grid">
              <div className="about-portrait">
                <Image
                  src={portraits.about}
                  width={1125}
                  height={1500}
                  alt="Vaibhav Saran"
                  sizes="(max-width: 760px) 70vw, 30vw"
                />
                <span className="portrait-caption meta">
                  VAIBHAV SARAN / UNITED STATES
                </span>
              </div>
              <div className="about-copy">
                <h3>
                  I like the space between
                  <br />
                  “what if” and <em>“it works.”</em>
                </h3>
                <p>
                  I’m an AI engineer with a master’s in Artificial Intelligence
                  from the University at Buffalo. My work moves between agentic
                  systems, data engineering, and applied ML research, including
                  interpretable clinical reinforcement learning and sustainable
                  ML.
                </p>
                <p>
                  I care about what happens around a model: the quality of its
                  data, how it is evaluated, how its decisions can be
                  understood, and what it takes to keep it running.
                </p>
                <p>
                  Outside the core projects, I’ve contributed to open source,
                  mentored learners across seven countries, and continue
                  building a public learning roadmap from Python fundamentals to
                  generative AI.
                </p>
                <External
                  className="text-link"
                  href="https://github.com/VaibhavSaran/Artificial-Intelligence"
                >
                  Explore the learning roadmap
                </External>
                <div className="about-social">
                  <External href={site.github}>GitHub</External>
                  <External href={site.linkedin}>LinkedIn</External>
                  <External href={site.scholar}>Google Scholar</External>
                </div>
              </div>
            </div>
            <div className="skills-heading">
              <h3>The tools follow the problem.</h3>
              <span className="meta">SKILLS & TECHNOLOGIES</span>
            </div>
            <div className="skills-grid">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h4>{category}</h4>
                  <p>{skills.join(" · ")}</p>
                </div>
              ))}
            </div>
            <div className="education-heading">
              <p className="eyebrow">ACADEMIC FOUNDATION</p>
              <h3>Education</h3>
            </div>
            <div className="education-grid">
              {resumeData.education.map((edu) => (
                <article key={edu.institution}>
                  <span className="meta">{edu.dates}</span>
                  <h4>{edu.institution}</h4>
                  <p>{edu.degree}</p>
                  <span className="gpa">GPA {edu.gpa} / 4.0</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-shell section-block recommendations"
          id="recommendations"
        >
          <SectionHeading
            index="05"
            label="RECOMMENDATIONS"
            title="Good work is rarely solo."
            copy="A few words from the people I’ve had the opportunity to learn from and build alongside."
          />
          <div className="quote-list">
            {testimonials.map((t, i) => {
              const expanded = expandedQuotes.includes(t.name);
              const excerpt =
                i === 0
                  ? "He was able to work well in a team, understanding how his work fits into the bigger picture and ensured timely progress to support his team members."
                  : "What differentiates him is his ownership mindset and speed of execution.";
              return (
                <article key={t.name} className="quote-row">
                  <div className="quote-person">
                    <span className="quote-initials">{t.initials}</span>
                    <h3>{t.name}</h3>
                    <p>{t.title}</p>
                    <span className="meta">{t.relationship}</span>
                    <External href={t.href} className="text-link">
                      LinkedIn
                    </External>
                  </div>
                  <div>
                    <span className="quote-mark" aria-hidden="true">
                      “
                    </span>
                    <blockquote>{expanded ? t.quote : excerpt}</blockquote>
                    <button
                      className="quote-toggle text-link"
                      aria-expanded={expanded}
                      onClick={() =>
                        setExpandedQuotes(
                          expanded
                            ? expandedQuotes.filter((n) => n !== t.name)
                            : [...expandedQuotes, t.name],
                        )
                      }
                    >
                      {expanded ? "Show excerpt" : "Read full recommendation"}{" "}
                      <span>{expanded ? "−" : "+"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer section-shell">
        <div>
          <a href="#home" className="wordmark">
            Vaibhav Saran<span className="wordmark-dot">.</span>
          </a>
          <p>Thoughtful systems. Useful intelligence.</p>
        </div>
        <div className="footer-links">
          <External href={site.github}>GitHub</External>
          <External href={site.linkedin}>LinkedIn</External>
          <button onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vaibhav Saran</span>
          <span>BUILT WITH CURIOSITY. ALWAYS ITERATING.</span>
        </div>
      </footer>
      <ScrollLoop>
        <section className="hero section-shell">
          <HeroContent reprise />
        </section>
      </ScrollLoop>
    </>
  );
}
