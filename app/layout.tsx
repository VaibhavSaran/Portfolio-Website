import type { Metadata } from "next";
import ChatBot from "./components/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaibhav Saran - AI Engineer & ML Researcher",
  description: "MS in Artificial Intelligence from SUNY Buffalo. 1.5+ years of Data Science experience. Deep Learning, Gen AI, and Production ML pipelines.",
  keywords: ["AI", "Machine Learning", "Deep Learning", "Generative AI", "Data Science", "ML Engineering"],
  authors: [{ name: "Vaibhav Saran" }],
  openGraph: {
    title: "Vaibhav Saran - AI Engineer & ML Researcher",
    description: "MS in Artificial Intelligence from SUNY Buffalo. 1.5+ years of Data Science experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
