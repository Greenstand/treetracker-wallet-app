import { pathsToModuleNameMapper } from "ts-jest";

const { compilerOptions } = require("./tsconfig.json");

export default {
  displayName: "api",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  coverageDirectory: "../../coverage/apps/api",
};
