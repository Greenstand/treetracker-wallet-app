// wdio.conf.ts
import type { Capabilities, Options } from "@wdio/types";

type MyWdioConfig = Options.Testrunner & {
  // @ts-ignore
  capabilities: Capabilities.RemoteCapability[];
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

  // Test specs
  specs: ["./e2e/features/**/*.feature"],

  maxInstances: 2,

  // Capabilities
  capabilities: [
    // {
    //   platformName: "iOS",
    //   "appium:deviceName": "iPhone 16",
    //   "appium:platformVersion": "18.5",
    //   "appium:automationName": "XCUITest",
    //   "appium:app": "./ios/build/Build/Products/Debug-iphonesimulator/YourApp.app",
    //   "appium:autoGrantPermissions": true,
    //   "appium:noReset": true,
    // },
    // testing in emulator
    // {
    //   platformName: "Android",
    //   "appium:deviceName": "Pixel_9a",
    //   "appium:automationName": "UiAutomator2",
    //   "appium:appPackage": "host.exp.exponent",
    //   "appium:appActivity": "host.exp.exponent.experience.HomeActivity",
    //   "appium:autoGrantPermissions": true,
    //   "appium:noReset": true,
    // },
    // testing in devices
    {
      platformName: "Android",
      "appium:deviceName": "Pixel_9a",
      // "appium:avd": "Pixel_9a",
      // "appium:isHeadless": true,
      "appium:app": `${process.env.PROJECT_ROOT}/android/app/build/outputs/apk/debug/app-debug.apk`,
      // 💡 PROJECT_ROOT should point to the absolute path of your local project root.
      // Example (macOS/Linux): /Users/user/dev/treetracker-wallet-app
      // Example (Windows): C:\\Users\\user\\dev\\treetracker-wallet-app
      // This ensures WDIO can locate the built app correctly when running E2E tests.

      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "com.gtw.app",
      "appium:appActivity": "com.gtw.app.MainActivity",
      // "appium:autoGrantPermissions": true,
      "appium:noReset": true,
      "appium:newCommandTimeout": 240,
      "appium:appWaitPackage": "*",
      // 🔧 FORCE DEBUG MODE
      "appium:debugLogLevel": "debug",

      // Don't wait for specific launch
      "appium:appWaitForLaunch": false,
    },
  ],

  logLevel: "debug",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  before: async function () {
    const { server } = await import("./e2e/mocks/server");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  },
  after: async function () {
    const { server } = await import("./e2e/mocks/server");
    server.close();
  },

  framework: "cucumber",
  cucumberOpts: {
    require: ["./e2e/features/**/*.ts"],
    requireModule: ["ts-node/register"],
    timeout: 60000,
    backtrace: false,
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    snippets: true,
    source: true,
    profile: [],
    strict: true,
    tagExpression: "",
    ignoreUndefinedDefinitions: false,
  },

  reporters: ["spec"],

  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          port: 4723,
          address: "localhost",
        },
        logPath: "./logs",
      },
    ],
  ],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.wdio.json",
    },
  },
  execArgv:
    process.env.NODE_ENV === "test" ? ["--unhandled-rejections=strict"] : [],
};
