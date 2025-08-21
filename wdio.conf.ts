import type { Options } from "@wdio/types";

type MyWdioConfig = Options.Testrunner & {
  capabilities: WebdriverIO.Capabilities[];
  autoCompileOpts?: {
    autoCompile: boolean;
    tsNodeOpts: {
      transpileOnly: boolean;
      project: string;
    };
  };
};

export const config: MyWdioConfig = {
  runner: "local",

  // Specify test files
  specs: ["./test/specs/**/*.ts"],

  // Max instances for parallel execution
  maxInstances: 2, // total across all capabilities

  // Define multiple device capabilities for parallel execution
  capabilities: [
    // iOS Simulators
    {
      platformName: "iOS",
      "appium:deviceName": "iPhone 16",
      "appium:platformVersion": "17.0",
      "appium:automationName": "XCUITest",
      "appium:bundleId": "host.exp.Exponent",
      "appium:noReset": true,
    },
    {
      platformName: "iOS",
      "appium:deviceName": "iPhone 15",
      "appium:platformVersion": "16.4",
      "appium:automationName": "XCUITest",
      "appium:bundleId": "host.exp.Exponent",
      "appium:noReset": true,
    },
    // Android Emulators
    {
      platformName: "Android",
      "appium:deviceName": "Pixel_6_API_33",
      "appium:platformVersion": "13.0",
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "host.exp.exponent",
      "appium:appActivity": "host.exp.exponent.MainActivity",
      "appium:noReset": true,
    },
    {
      platformName: "Android",
      "appium:deviceName": "Pixel_5_API_32",
      "appium:platformVersion": "12.0",
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "host.exp.exponent",
      "appium:appActivity": "host.exp.exponent.MainActivity",
      "appium:noReset": true,
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  reporters: ["spec"],

  services: [
    [
      "appium",
      {
        args: {
          address: "127.0.0.1",
          port: 4723,
        },
        logPath: "./logs",
      },
    ],
  ],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.json",
    },
  },
};
