/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { domains: ["localhost", "uat.api.projects.ipllogisticstechnologies.com"], unoptimized: true }
}

module.exports = nextConfig
