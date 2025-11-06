/* eslint-disable @typescript-eslint/no-require-imports */
// eslint.config.js

/**
 * ⚙️ ESLint Flat Config Setup for Expo + TypeScript Monorepo
 * ----------------------------------------------------------
 * - Extends Expo config (React + TS + Import plugin)
 * - Adds custom rules
 * - Prettier integration
 * - Filters tsconfig.json files to avoid parser "read file" errors
 */

const fs = require("fs");
const tsParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");
const expoConfig = require("eslint-config-expo/flat");

// 🔧 Only include tsconfig.json files that exist
const tsProjects = [
  "./packages/core/tsconfig.json",
  "./apps/web/tsconfig.json",
  "./apps/native/tsconfig.json",
  "./apps/user/tsconfig.json",
].filter((p) => fs.existsSync(p));

module.exports = [
  /**
   * 🧹 Ignore paths globally
   */
  {
    ignores: [
      "node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      ".history/**",
      "**/coverage/**",
      "**/*.d.ts",
      "apps/native/index.js",
      "packages/queue/**",
      "packages/queue/__tests__/index.spec.js",
    ],
  },

  /**
   * 📦 Base Expo Config
   */
  ...expoConfig,

  /**
   * 🧠 Custom Project Rules
   */
  {
    name: "project-config",
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: __dirname,
        project: tsProjects, // ✅ Only existing tsconfigs
        warnOnUnsupportedTypeScriptVersion: true, // ✅ Warn instead of error
      },
    },
    rules: {
      "import/no-unresolved": ["error", { ignore: ["./libs/validation/dtos"] }],
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript rules (plugin already included via Expo)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "warn",

      // General JS/TS rules
      "no-undef": "off",
      "no-unused-expressions": "off",
      "no-var": "error",
      eqeqeq: "warn",
      "import/export": "warn",
    },
    settings: {
      react: {
        version: "18.3",
      },
      "import/resolver": {
        typescript: {
          project: tsProjects,
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
        },
      },
    },
  },

  /**
   * 🎨 Prettier Integration
   */
  {
    name: "prettier-config",
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
       "import/no-unresolved": "warn"
    },
  },
];
