import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  roots: ["<rootDir>", "<rootDir>/../../packages/common/tests"],
  testRegex: "spec.e2e.ts$",
};
