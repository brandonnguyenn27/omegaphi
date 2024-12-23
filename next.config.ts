import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xvibzpkqqwyevevkcemr.supabase.co",
        port: "",
        // Using "/**" allows any path under "/storage/v1/object/public/"
        // If you want to be more restrictive, you can do:
        // pathname: '/storage/v1/object/public/my-bucket/**'
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
