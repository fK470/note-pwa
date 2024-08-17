import { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/notes',
        permanent: true,
      },
      // Wildcard path matching
      // {
      //   source: '/blog/:slug',
      //   destination: '/news/:slug',
      //   permanent: true,
      // },
    ];
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('next-pwa')).default({
      dest: 'public',
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
