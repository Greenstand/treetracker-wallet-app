/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["wallet_state"],
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Skip native-only modules
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "expo-constants": false,
        "expo-modules-core": false,
      },
      extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".js", ".json"],
    };

    return config;
  },
};

module.exports = nextConfig;
