import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { site } from "../../data/site";
import { portraits } from "../../data/media";
import { External } from "./Primitives";

export default function HeroContent({
  reprise = false,
}: {
  reprise?: boolean;
}) {
  const Title = reprise ? "p" : "h1";
  return (
    <>
      <div className="hero-meta">
        <span className="eyebrow">
          <span className="status-dot" /> AI ENGINEER & ML RESEARCHER
        </span>
        <span className="meta">BASED IN THE UNITED STATES</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-identity">
            <div>
              <p className="tiny-label">ENGINEER. RESEARCHER. BUILDER.</p>
              <p className="hero-intro">Hello, I’m Vaibhav.</p>
            </div>
          </div>
          <Title className="hero-title" tabIndex={-1}>
            Research-minded.
            <br />
            Production<span className="serif-italic"> driven.</span>
          </Title>
          <p className="hero-description">
            I build AI systems that work beyond the demo.
            <br className="desktop-break" /> Agentic workflows, applied machine
            learning, and
            <br className="desktop-break" /> research with a path to the real
            world.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#experience">
              Explore my work <ArrowDown size={16} />
            </a>
            <External className="text-link" href={site.resume}>
              View resume
            </External>
          </div>
          <div className="hero-current">
            <span className="tiny-label">CURRENTLY</span>
            <span>
              AI/ML Engineering Intern <span className="muted">at</span>{" "}
              <strong>Trek Health</strong>
            </span>
          </div>
        </div>
        <figure className="hero-portrait-panel">
          {" "}
          <Image
            src={portraits.hero}
            width={576}
            height={1024}
            alt="Vaibhav Saran"
            priority
            className="hero-portrait"
          />
          <figcaption>VAIBHAV SARAN / AI ENGINEER</figcaption>
        </figure>
      </div>
      <div className="hero-bottom">
        <span className="meta">FROM RESEARCH QUESTIONS TO WORKING SYSTEMS</span>
        <a className="meta scroll-link" href="#experience">
          SCROLL TO ENTER <ArrowDown size={14} />
        </a>
      </div>
    </>
  );
}
