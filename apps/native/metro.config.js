// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("@react-native/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 🟢 Only add monorepo root if you're using shared packages/modules
config.watchFolders = [workspaceRoot];

// 🟢 Safely add SVG support
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer",
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== "svg",
);
config.resolver.sourceExts.push("svg");

// ❌ REMOVE nodeModulesPaths override
// ❌ REMOVE disableHierarchicalLookup

module.exports = config;
