import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  complier: {
    removeConsole: true,
  },
};

export default nextConfig;
