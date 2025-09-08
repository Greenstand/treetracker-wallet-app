module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix --no-warn-ignored", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};
