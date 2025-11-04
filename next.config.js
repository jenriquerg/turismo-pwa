/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Solo usar standalone para Docker (no en Vercel)
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
