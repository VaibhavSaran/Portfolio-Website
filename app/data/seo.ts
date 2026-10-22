import type { Metadata } from "next";
import { site } from "./site";
import { portraits } from "./media";

export const seoMetadata: Metadata = {
  title: "Vaibhav Saran | AI Engineer | LLM & GenAI Systems",
  description:
    "AI engineer building production agentic systems, diagnostic workflows, and MLOps pipelines. MS in AI from University at Buffalo, with research in interpretable offline RL and sustainable machine learning.",
  keywords: [
    "Vaibhav Saran",
    "AI Engineer",
    "LLM Engineer",
    "GenAI Engineer",
    "ML Engineer",
    "Agentic AI Engineer",
    "Agentic AI",
    "LangGraph",
    "LangChain developer",
    "RAG",
    "Multi-Agent Systems",
    "MLOps",
    "Reinforcement Learning",
    "IEEE researcher",
    "SUNY Buffalo",
  ],
  authors: [{ name: "Vaibhav Saran", url: site.url }],
  creator: "Vaibhav Saran",
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    url: site.url,
    title: "Vaibhav Saran | AI Engineer | LLM & GenAI Systems",
    description:
      "AI Engineer specializing in multi-agent LLM systems, RAG pipelines, and production MLOps. Published IEEE researcher. MS AI from SUNY Buffalo.",
    siteName: "Vaibhav Saran Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Vaibhav Saran | AI Engineer",
    description:
      "AI Engineer specializing in multi-agent LLM systems, RAG pipelines, and production MLOps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

// Public identity facts only; keep the visible profile and structured data consistent.
export const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profile`,
  url: site.url,
  name: "Vaibhav Saran | AI Engineer",
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: "Vaibhav Saran",
    url: site.url,
    jobTitle: "AI Engineer",
    image: new URL(portraits.hero, site.url).href,
    sameAs: [site.github, site.linkedin, site.scholar],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University at Buffalo" },
      { "@type": "CollegeOrUniversity", name: "JIET Group of Institutions" },
    ],
  },
};
