/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  // Uncomment transpilePackages if you add workspace dependencies
  // transpilePackages: [],
  experimental: {
    externalDir: true
  },
  // Ensure we handle trailing slashes consistently
  trailingSlash: false,
}; 