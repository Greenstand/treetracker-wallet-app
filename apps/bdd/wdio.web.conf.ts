import type { Options } from "@wdio/types";
import { baseConfig } from "./wdio.base.conf.ts";
import { CAPABILITY_WEB_CHROME } from "./utils/capabilities.ts";

export const config: Options.Testrunner = {
  ...baseConfig,

  capabilities: CAPABILITY_WEB_CHROME,
  cacheDir: "../../.yarn/.cache/webdriver",

  // WebdriverIO v9 has built-in browser-driver management: it auto-resolves and
  // downloads the Chromedriver matching the locally installed Chrome. The legacy
  // wdio-chromedriver-service pinned an older driver (148) which broke once local
  // Chrome auto-updated (150), so it's intentionally omitted here.

  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: "@web and not @skip",
  },

  before: function () {
    console.log("🌐 Starting WEB test session...");
  },
} as unknown as Options.Testrunner;
