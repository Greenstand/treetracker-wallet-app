/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["wallet_state"],
  output: "export",
};
module.exports = nextConfig;
