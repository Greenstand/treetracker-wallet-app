const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = defineConfig([
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      ".history/**",
      "**/coverage/**",
      "**/*.d.ts", // Ignore declaration files
      "apps/native/index.js", // Legacy file
      "packages/queue/**", // Queue package
      "packages/queue/__tests__/index.spec.js", // Specific test file
    ],
  },
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "import/no-unresolved": ["error", { ignore: ["./libs/validation/dtos"] }],
      "react/no-unescaped-entities": "warn",
      "prettier/prettier": "warn",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "react/display-name": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "import/export": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "no-var": "error", // Convert var to let/const
      eqeqeq: "warn", // Use === instead of ==
    },
    settings: {
      react: {
        version: "18.3", // Match the React version used in apps/web
      },
      "import/resolver": {
        typescript: {
          project: [
            "./packages/core/tsconfig.json",
            "./apps/web/tsconfig.json",
            "./apps/native/tsconfig.json",
            "./apps/user/tsconfig.json",
          ],
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },
]);
