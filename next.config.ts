import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Cache Components stay off until explicitly enabled. */
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
