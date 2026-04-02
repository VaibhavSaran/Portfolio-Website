import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/StockPilotAI',
        destination: 'https://stockpilot.vaibhavsaran.com/',
        permanent: false,
      },
      {
        source: '/F1PrimusAI',
        destination: 'https://f1-primus-ai-214856382722.us-central1.run.app/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
