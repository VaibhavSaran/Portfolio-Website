import { seoMetadata, profileSchema } from "./data/seo";

import ChatBot from "./components/ChatBot";
import "./globals.css";

export const metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`,
          }}
        />
      </head>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
