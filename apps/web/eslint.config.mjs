import baseConfig from "@treetracker/config/eslint";

export default [
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
    settings: {
      react: { version: "19.0" },
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },
  },
];
