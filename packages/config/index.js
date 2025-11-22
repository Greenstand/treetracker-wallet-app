/* eslint-disable import/no-unresolved */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tsParser from "@typescript-eslint/parser";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginImport from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsProjects = [
  path.resolve(__dirname, "../tsconfig.json"),
  path.resolve(__dirname, "../packages/core/tsconfig.json"),
  path.resolve(__dirname, "../apps/web/tsconfig.json"),
  path.resolve(__dirname, "../apps/bdd/tsconfig.json"),
  path.resolve(__dirname, "../apps/native/tsconfig.json"),
  path.resolve(__dirname, "../packages/wallet/tsconfig.json"),
  path.resolve(__dirname, "../packages/keycloak/tsconfig.json"),
].filter(p => fs.existsSync(p));

export default [
  {
    ignores: [
      "node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      ".history/**",
      "**/coverage/**",
      "**/*.d.ts",
      "packages/queue/**",
      "packages/common/**",
      "packages/config/**",
      "**/*.d.ts", // type declarations
      "**/jest.config.js", // configs
      "**/setupTests.ts", // test setup files
    ],
  },

  // TypeScript + React + Hooks + Import
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
        project: tsProjects.length > 0 ? tsProjects : undefined,
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      import: eslintPluginImport,
    },
    rules: {
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": [
        "warn",
        {
          ignore: ["@treetracker/core", "@treetracker/wallet"],
        },
      ],
      "import/export": "warn",
      "no-var": "error",
      eqeqeq: "warn",
      "prettier/prettier": "warn",
    },
    settings: {
      react: { version: "detect" },
      // Help eslint-plugin-import understand TS files and extensions
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/resolver": {
        typescript: {
          project: tsProjects.length > 0 ? tsProjects : undefined,
          alwaysTryTypes: true,
        },
      },
    },
  },

  // JS + React + Hooks + Import
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: (await import("espree")).default,
      ecmaVersion: 2024,
      sourceType: "module",
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      import: eslintPluginImport,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prettier/prettier": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": "warn",
      "import/export": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
