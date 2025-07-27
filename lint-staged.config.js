module.exports = {
  // Run ESLint and Prettier on TypeScript/JavaScript files
  "*.{js,jsx,ts,tsx}": ["eslint --fix --no-warn-ignored", "prettier --write"],
  // Run Prettier on other files
  "*.{json,md,yml,yaml}": ["prettier --write"],
  // Run type checking on TypeScript files (only in workspaces that have tsconfig)
  "apps/web/**/*.{ts,tsx}": () => "yarn workspace web tsc --noEmit",
  "apps/native/**/*.{ts,tsx}": () => "yarn workspace native tsc --noEmit",
  "apps/user/**/*.{ts,tsx}": () => "yarn workspace user tsc --noEmit",
  "packages/core/**/*.{ts,tsx}": () => "yarn workspace core tsc --noEmit",
};
