import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hmditjhmanhaxugjylge.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/projects/project_images/**',
      },
    ],
  }
};

export default nextConfig;
