/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: ["wallet_state"],
  webpack: (config, { isServer }) => {
    // Ignore specific modules in the build
    config.externals = [
      ...(config.externals || []),
      "expo-constants",
      "expo-modules-core",
    ];

    return config;
  },
};
module.exports = nextConfig;
