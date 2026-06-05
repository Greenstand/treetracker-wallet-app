import type { Options } from "@wdio/types";
import { baseConfig } from "./wdio.base.conf.ts";
import { CAPABILITY_ANDROID, CAPABILITY_IOS } from "./utils/capabilities.ts";

const PLATFORM = process.env.PLATFORM || "android";

export const config: Options.Testrunner = {
  ...baseConfig,

  // Mobile-specific settings
  maxInstances: 1,
  waitforTimeout: 30000,
  connectionRetryTimeout: 180000,

  // Mobile capabilities
  capabilities: PLATFORM === "android" ? CAPABILITY_ANDROID : CAPABILITY_IOS,

  // Mobile services
  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          port: 4723,
          address: "127.0.0.1",
        },
        logPath: "./logs",
      },
    ],
  ] as any,

  // Mobile-specific cucumber tags
  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: "@native",
  },

  // Mobile-specific hooks
  before: function () {
    console.log("📱 Starting MOBILE test session...");
    console.log(`Platform: ${PLATFORM}`);
  },
} as unknown as Options.Testrunner;
