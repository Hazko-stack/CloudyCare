import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phmibcxawxuvdlfkwrus.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Optional: jika pakai MDX files locally (tidak perlu untuk Supabase storage)
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;