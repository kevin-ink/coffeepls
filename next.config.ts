import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coffeepls-imgs.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/*",
        search: "",
      },
    ],
  },
};

export default nextConfig;
