// jest.e2e.config.js
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  // Only run your email E2E test(s)
  testMatch: ["<rootDir>/packages/common/spec/e2e/**/*.spec.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};