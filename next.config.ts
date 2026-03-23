import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/p-mart",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
