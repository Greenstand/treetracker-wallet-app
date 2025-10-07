import jestConfig from "./jest.config";
export default {
  ...jestConfig,
  testRegex: "spec.e2e.ts$",
};
