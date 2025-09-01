import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://*.imgbox.com/**"),
      new URL("https://*.staticflickr.com/**"),
    ],
  },
};

export default nextConfig;
