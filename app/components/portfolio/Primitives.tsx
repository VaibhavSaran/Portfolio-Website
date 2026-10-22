import Image from "next/image";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { projectArtwork } from "../../data/media";

const projectLinks: Record<string, string> = {
  liveDemo: "Live project",
  github: "Source code",
  demoVideo: "Watch demo",
  kaggleDataset: "Dataset",
  paperPdf: "Read paper",
};
export function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isLinkedIn = /^https?:\/\/(?:www\.)?linkedin\.com(?:\/|$)/i.test(href);
  const isGitHub = /^https?:\/\/(?:www\.)?github\.com(?:\/|$)/i.test(href);
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {isLinkedIn ? (
        <Linkedin size={15} aria-hidden="true" />
      ) : isGitHub ? (
        <Github size={15} aria-hidden="true" />
      ) : (
        <ArrowUpRight size={15} aria-hidden="true" />
      )}
    </a>
  );
}
export function SectionHeading({
  index,
  label,
  title,
  copy,
}: {
  index: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {index} / {label}
        </p>
        <h2>{title}</h2>
      </div>
      {copy && <p>{copy}</p>}
    </div>
  );
}
export function Links({ links }: { links: object }) {
  return (
    <div className="project-links">
      {Object.entries(links).map(
        ([key, href]) =>
          href && (
            <External key={key} href={href}>
              {projectLinks[key] || key}
            </External>
          ),
      )}
    </div>
  );
}
export function Tags({ skills }: { skills: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {skills.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}
export function ProjectIllustration({
  asset,
  alt,
  research = false,
}: {
  asset: Exclude<keyof typeof projectArtwork, "stockpilot" | "f1">;
  alt: string;
  research?: boolean;
}) {
  return (
    <figure
      className={
        research
          ? "research-cover editorial-cover"
          : "project-image editorial-cover"
      }
    >
      <Image
        src={projectArtwork[asset]}
        alt={alt}
        width={1672}
        height={941}
        sizes={
          research
            ? "(max-width: 760px) 100vw, 45vw"
            : "(max-width: 760px) 100vw, 55vw"
        }
      />
      <figcaption>
        {
          {
            automation: "FROM OPPORTUNITIES TO A SHORTLIST.",
            laptrack: "COMPARE. DISCOVER. CHOOSE.",
            "hand-sign": "FROM GESTURE TO MEANING.",
            sepsis: "MAKING CLINICAL REASONING VISIBLE.",
            "green-crisp": "MEASURE MORE THAN ACCURACY.",
          }[asset]
        }
      </figcaption>
    </figure>
  );
}
