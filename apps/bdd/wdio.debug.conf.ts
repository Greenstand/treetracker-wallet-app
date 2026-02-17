import path from "node:path";
import fs from "node:fs";
import { baseConfig } from "./wdio.base.conf";
import { CAPABILITY_WEB_CHROME_FOR_DEBUG } from "./utils/capabilities";

// Video reporter for recording test execution - useful for debugging and demos
import Video from "wdio-video-reporter";
import {
  REPORTS_ROOT,
  VIDEOS_TMP,
  scenarioDirs,
  findVideoForCid,
} from "./utils/artifacts";
import cucumberJson from "wdio-cucumberjs-json-reporter";

export const config: WebdriverIO.Config = {
  ...baseConfig,

  // Debug-specific settings
  logLevel: "debug",
  waitforTimeout: 60000, // Extended for debugging
  connectionRetryTimeout: 240000, // Extended for debugging

  // Debug capabilities (headed browser)
  capabilities: CAPABILITY_WEB_CHROME_FOR_DEBUG,

  // Debug services
  services: ["chromedriver"] as any,

  // ==================
  // Specify Test Files
  // ==================
  specs: ["./features/**/*.feature"],
  exclude: [],

  maxInstances: 10,

  // ===================
  // Test Configurations
  // ===================
  bail: 0,
  baseUrl: "http://localhost:3000",

  framework: "cucumber",

  // ============
  // Reporters
  // ============
  reporters: ["spec"],

  // Debug cucumber options - override base with debug settings
  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    //tags: "@debug", // Only run debug scenarios
    timeout: 120000, // Extended timeout for debugging
  },

  // =====
  // Hooks
  // =====

  // Debug hook - runs before all tests
  before: function () {
    console.log("🐛 Starting DEBUG test session...");
    console.log("Extended timeouts and verbose logging enabled");
  },

  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: function (_config, _capabilities) {},

  // Remember the current feature "bucket" for this worker (cid).
  beforeFeature: function (uri: string) {},

  /**
   * After each Cucumber step, capture and attach a screenshot if the step failed.
   */
  afterStep: async function (_step, _scenario, result, context) {},

  afterScenario: async function (world, result, context) {},

  /**
   * Clear the worker's cached feature bucket after each feature.
   */
  afterFeature: function (_uri: string, _feature): void {},

  /**
   * Gets executed after all tests are done.
   */
  after: async function (_result, _capabilities, _specs): Promise<void> {
    const ms = Number(process.env.WDIO_ARTIFACTS_FLUSH_MS ?? 150);
    if (ms > 0) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  /**
   * Called after each WebDriver session ends.
   */
  afterSession: async function (_config, _caps, _specs): Promise<void> {
    // Allow the video reporter to finish writing
    const settleMs = Number(process.env.WDIO_VIDEO_SETTLE_MS ?? 800);
    if (settleMs > 0) {
      await new Promise(r => setTimeout(r, settleMs));
    }

    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";
    if (!cid) return;

    // Optionally keep the VideoReporter JSON summary
    const reporterJsonName = `wdio-${cid}-VideoReporter-report.json`;
    const reporterJsonPath = path.join(VIDEOS_TMP, reporterJsonName);

    if (fs.existsSync(reporterJsonPath)) {
      const keepJson =
        (process.env.WDIO_KEEP_VIDEO_JSON ?? "true").toLowerCase() === "true";

      if (keepJson) {
        const archiveDir = path.join(REPORTS_ROOT, "session-logs");
        fs.mkdirSync(archiveDir, { recursive: true });
        try {
          fs.rmSync(path.join(archiveDir, reporterJsonName), { force: true });
        } catch {}
        fs.renameSync(
          reporterJsonPath,
          path.join(archiveDir, reporterJsonName),
        );
      } else {
        try {
          fs.rmSync(reporterJsonPath, { force: true });
        } catch {}
      }
    }

    // Clean up this worker's frame cache
    const framesRoot = path.join(VIDEOS_TMP, ".video-reporter-screenshots");
    try {
      if (fs.existsSync(framesRoot)) {
        for (const entry of fs.readdirSync(framesRoot)) {
          if (entry.includes(cid)) {
            fs.rmSync(path.join(framesRoot, entry), {
              recursive: true,
              force: true,
            });
          }
        }
        // Remove empty directory
        if (fs.readdirSync(framesRoot).length === 0) {
          fs.rmSync(framesRoot, { recursive: true, force: true });
        }
      }
    } catch {}

    // Clean up any stray temp files for this CID
    try {
      if (fs.existsSync(VIDEOS_TMP)) {
        for (const f of fs.readdirSync(VIDEOS_TMP)) {
          if (
            f.includes(cid) &&
            (f.endsWith(".mp4") || f.endsWith(".png") || f.endsWith(".json"))
          ) {
            try {
              fs.rmSync(path.join(VIDEOS_TMP, f), { force: true });
            } catch {}
          }
        }
      }
    } catch {}
  },

  // Debug hook - logs each command
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

  filesToWatch: ["./features/**/*.feature", "./features/**/*.ts"],
};
