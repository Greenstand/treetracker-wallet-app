// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.dev/guides/customizing-metro

const path = require("path");
const { getDefaultConfig } = require("@react-native/metro-config"); // ← updated from expo/metro-config

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Disable hierarchical lookup for consistency
config.resolver.disableHierarchicalLookup = true;

// 4. Add support for SVG files
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = config;

