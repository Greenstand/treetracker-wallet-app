/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["wallet_state"],
  output: "export",
  images: {
    unoptimized: true,
  },
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