import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Compression for better performance
  compress: true,
  // Strict mode for React
  reactStrictMode: true,
  // Turbopack: pin root to this directory so Next.js doesn't get confused
  // by the parent-level package-lock.json living at the repo root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
