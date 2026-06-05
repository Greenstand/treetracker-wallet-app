import type { Options } from "@wdio/types";
import { baseConfig } from "./wdio.base.conf.ts";
import { CAPABILITY_WEB_CHROME } from "./utils/capabilities.ts";

export const config: Options.Testrunner = {
  ...baseConfig,

  capabilities: CAPABILITY_WEB_CHROME,
  cacheDir: "../../.yarn/.cache/webdriver",

  services: [
    [
      "chromedriver",
      {
        version: "147",
      },
    ],
  ],

  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: "@web and not @skip",
  },

  before: function () {
    console.log("🌐 Starting WEB test session...");
  },
} as unknown as Options.Testrunner;
