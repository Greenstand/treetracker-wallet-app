import type { Options } from "@wdio/types";
import { baseConfig } from "./wdio.base.conf";
import { CAPABILITY_WEB_CHROME } from "./utils/capabilities";

export const config = {
  ...baseConfig,

  // Debug-specific settings
  logLevel: "debug",
  waitforTimeout: 60000,
  connectionRetryTimeout: 240000,

  // Debug capabilities (headed browser)
  capabilities: CAPABILITY_WEB_CHROME,

  // Debug services
  services: ["chromedriver"] as any,

  // Debug cucumber options
  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: "@debug",
    timeout: 120000,
  },

  // Debug hooks
  before: function () {
    console.log("🐛 Starting DEBUG test session...");
    console.log("Extended timeouts and verbose logging enabled");
  },

  afterCommand: function (
    commandName: string,
    args: any[],
    result: any,
    error: any,
  ) {
    console.log(
      `🔍 Command: ${commandName}`,
      error ? `Error: ${error.message}` : "Success",
    );
  },
} as unknown as Options.Testrunner;
