/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: ["wallet_state", "@treetracker/msw"],
  serverExternalPackages: ["expo-constants", "expo-modules-core"],
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Ignore specific modules in the build
    config.externals = [
      ...(config.externals || []),
      "expo-constants",
      "expo-modules-core",
    ];

    // Force a single jotai instance across the app and workspace packages
    // (e.g. @treetracker/wallet). Without this, jotai is duplicated and each
    // copy has its own default store, so the auth token set at login isn't
    // visible to the wallet hooks. See "Detected multiple Jotai instances".
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      jotai: path.resolve(__dirname, "node_modules/jotai"),
    };

    return config;
  },
};
module.exports = nextConfig;
