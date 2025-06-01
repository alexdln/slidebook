import { type NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // distDir: "output",
    // output: "standalone",
    devIndicators: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
