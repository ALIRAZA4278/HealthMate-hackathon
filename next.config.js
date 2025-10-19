/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable TypeScript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
