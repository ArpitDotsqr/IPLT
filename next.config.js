/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ["localhost", "uat.api.projects.ipllogisticstechnologies.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
