module.exports = {
  root: true,
  extends: ["@treetracker/config/eslint"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "import/no-require": "warn",
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },
  },
};