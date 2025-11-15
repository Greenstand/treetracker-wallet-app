export default {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix --no-warn-ignored",
    "prettier --config packages/config/prettier.config.json --write",
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --config packages/config/prettier.config.json --write",
  ],
  "**/*.{ts,tsx}": () => "yarn type-check",
};
