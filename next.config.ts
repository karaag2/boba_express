import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bobaexpress-niamey.com',
          },
        ],
        destination: 'https://bobaexpress-niamey.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.bobaexpress-niamey.com',
          },
        ],
        destination: 'https://bobaexpress-niamey.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
