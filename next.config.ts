import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "yzhmfmpjuwbvrcvhpskz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
