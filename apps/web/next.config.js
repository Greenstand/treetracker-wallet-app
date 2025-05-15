/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["wallet_state"],
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Extend existing resolve config instead of overwriting it
    config.resolve = {
      ...(config.resolve || {}),
      // Prevent Next.js from bundling native-only modules in web builds
      alias: {
        ...(config.resolve?.alias || {}),
        "expo-constants": false,
        "expo-modules-core": false,
        "react-native": false,
      },
      // Ensure .web.ts/.web.tsx files are preferred over .native.ts in web builds
      extensions: [
        ".web.tsx",
        ".web.ts",
        ".tsx",
        ".ts",
        ".js",
        ".json",
        ...(config.resolve?.extensions || []),
      ],
    };

    return config;
  },
};

module.exports = nextConfig;
