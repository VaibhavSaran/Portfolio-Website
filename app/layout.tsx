import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ChatBot from "./components/ChatBot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vaibhav Saran | AI Engineer | LLM & GenAI Systems",
  description:
    "AI Engineer with 2+ years building production LLM systems, multi-agent RAG pipelines, and MLOps infrastructure. MS in AI from SUNY Buffalo. Published IEEE researcher. Open to full-time roles.",
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
  authors: [{ name: "Vaibhav Saran", url: "https://vaibhavsaran.com" }],
  creator: "Vaibhav Saran",
  metadataBase: new URL("https://vaibhavsaran.com"),
  openGraph: {
    type: "website",
    url: "https://vaibhavsaran.com",
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
    canonical: "https://vaibhavsaran.com",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
