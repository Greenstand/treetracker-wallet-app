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
        // Use the chromedriver npm binary (pinned to match local Chrome major,
        // currently 149). Bump the chromedriver devDep when Chrome auto-updates.
        version: "149",
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
