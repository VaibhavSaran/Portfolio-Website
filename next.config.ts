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
        destination: 'https://f1primus.vaibhavsaran.com/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
