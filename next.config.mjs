import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        destination: "/notes",
        permanent: true,
        source: "/",
      },
    ];
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("next-pwa")).default({
      dest: "public",
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
