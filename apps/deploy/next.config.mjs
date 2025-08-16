/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'shared-utils',
    'shared-types', 
    'shared-config',
    'ui',
    'ui-components',
    'design-system',
    'analyzer',
    'orchestrator'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  allowedDevOrigins: ['*.daytona.work'],
};

export default nextConfig;
