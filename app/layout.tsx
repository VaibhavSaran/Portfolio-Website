import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ChatBot from "./components/ChatBot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
