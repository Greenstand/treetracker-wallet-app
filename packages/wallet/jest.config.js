const babelConfig = {
  presets: [["@babel/preset-typescript"]],
  plugins: [["@babel/plugin-transform-modules-commonjs"]],
};

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.e2e.ts"],
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.(ts|tsx|js|mjs)$": ["babel-jest", babelConfig],
  },
};
