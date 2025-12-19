import path from "node:path";
import fs from "node:fs";
import { baseConfig } from "./wdio.base.conf";
import { CAPABILITY_WEB_CHROME } from "./utils/capabilities";

// Video reporter for recording test execution - useful for debugging and demos
import Video from "wdio-video-reporter";
import {
  REPORTS_ROOT,
  VIDEOS_TMP,
  scenarioDirs,
  findVideoForCid,
} from "./utils/artifacts";
import cucumberJson from "wdio-cucumberjs-json-reporter";

/**
 * Maps WebdriverIO worker IDs (cid) to their current feature bucket.
 * A "feature bucket" is derived from the feature file name, e.g.:
 *   "register.feature" -> "register"
 *
 * Lifecycle:
 * - Set in `beforeFeature`
 * - Read in `afterStep` / `afterScenario`
 * - Cleared in `afterFeature`
 */
const FEATURE_BUCKET_BY_CID: Record<string, string> = {};

export const config: WebdriverIO.Config = {
  ...baseConfig,

  // Debug-specific settings
  logLevel: "debug",
  waitforTimeout: 60000, // Extended for debugging
  connectionRetryTimeout: 240000, // Extended for debugging

  // Debug capabilities (headed browser)
  capabilities: CAPABILITY_WEB_CHROME,

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
  reporters: [
    "spec",
    // Capture execution videos via wdio-video-reporter
    [
      Video as any,
      {
        saveAllVideos: true, // keep videos for passed and failed scenarios
        outputDir: VIDEOS_TMP, // temp output root for MP4s this run
        rawPath: path.join(VIDEOS_TMP, ".video-reporter-screenshots"), // reporter's cached frame screenshots
        videoFormat: "mp4",
        videoSlowdownMultiplier: 1,
        // Optional tuning (uncomment as needed):
        // excludedActions: ['execute', 'keys'],           // reduce noisy frames
        // screenshotIntervalSecs: 0.75,                   // throttle frame capture (>= 0.5)
      },
    ],
    // Write Cucumber JSON for the HTML report generator
    [
      "cucumberjs-json",
      {
        jsonFolder: path.join(REPORTS_ROOT, "cucumber"),
      },
    ],
  ],

  // Debug cucumber options - override base with debug settings
  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: "@debug", // Only run debug scenarios
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
  onPrepare: function (_config, _capabilities) {
    const cucumberJsonDir = path.join(REPORTS_ROOT, "cucumber");
    const cucumberHtmlDir = path.join(REPORTS_ROOT, "cucumber-html");
    const videosTmpDir = VIDEOS_TMP;
    const videosDir = path.dirname(videosTmpDir);
    const framesRootDir = path.join(
      videosTmpDir,
      ".video-reporter-screenshots",
    );

    // Ensure a clean Cucumber JSON output directory for this run
    try {
      fs.rmSync(cucumberJsonDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(cucumberJsonDir, { recursive: true });

    // Clean Cucumber HTML directory
    try {
      fs.rmSync(cucumberHtmlDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(cucumberHtmlDir, { recursive: true });

    // Always start with a fresh test-videos tree
    try {
      fs.rmSync(videosDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(videosDir, { recursive: true });

    // Recreate the temp area used by wdio-video-reporter
    fs.mkdirSync(videosTmpDir, { recursive: true });
    fs.mkdirSync(framesRootDir, { recursive: true });
  },

  // Remember the current feature "bucket" for this worker (cid).
  beforeFeature: function (uri: string) {
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";

    // Derive a stable bucket name from the feature file name
    try {
      const filename = path.basename(uri);
      const bucket = filename.replace(/\.feature$/i, "");
      FEATURE_BUCKET_BY_CID[cid] = bucket || "feature";
    } catch {
      FEATURE_BUCKET_BY_CID[cid] = "feature";
    }
  },

  /**
   * After each Cucumber step, capture and attach a screenshot if the step failed.
   */
  afterStep: async function (_step, _scenario, result, context) {
    if (result.passed) return;

    // Grab a PNG screenshot and attach it to the Cucumber JSON
    const screenshotB64 = await browser.takeScreenshot();
    // @ts-ignore
    cucumberJson.attach(screenshotB64, "image/png");

    // Derive the feature "bucket" recorded for this worker
    const world = context as unknown as {
      gherkinDocument?: { feature?: { name?: string } };
      pickle?: { name?: string };
    };

    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";
    const featureBucket =
      FEATURE_BUCKET_BY_CID[cid] ||
      world.gherkinDocument?.feature?.name ||
      "feature";

    const scenarioName = world.pickle?.name ?? _scenario?.name ?? "scenario";
    const { base, screenshots } = scenarioDirs(featureBucket, scenarioName);

    // Persist a single failure image in the scenario folder
    fs.writeFileSync(
      path.join(screenshots, `${Date.now()}-failed-step.png`),
      Buffer.from(screenshotB64, "base64"),
    );

    // Remove any legacy logs folder
    try {
      fs.rmSync(path.join(base, "logs"), { recursive: true, force: true });
    } catch {}
  },

  /**
   * After each Cucumber scenario:
   * - Move the recorded MP4 for this worker into the scenario's folder.
   * - Remove the temporary frame screenshots.
   * - Attach an HTML <video> player to the Cucumber JSON.
   */
  afterScenario: async function (world, result, context) {
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";
    const featureBucket =
      FEATURE_BUCKET_BY_CID[cid] ||
      world.gherkinDocument?.feature?.name ||
      "feature";

    const scenarioName = world.pickle?.name ?? "scenario";
    const { base } = scenarioDirs(featureBucket, scenarioName);

    // Move the MP4 produced by wdio-video-reporter
    const srcVideo = cid ? findVideoForCid(cid) : null;

    let videoRelPath = "";
    if (srcVideo) {
      const destVideo = path.join(base, "run.mp4");
      // Overwrite any stale file
      try {
        if (fs.existsSync(destVideo)) fs.rmSync(destVideo, { force: true });
      } catch {}

      fs.renameSync(srcVideo, destVideo);

      // Path relative to report output
      videoRelPath = path
        .relative(path.join(REPORTS_ROOT, "cucumber-html"), destVideo)
        .split(path.sep)
        .join("/");
    }

    // Remove any legacy logs folder
    try {
      fs.rmSync(path.join(base, "logs"), { recursive: true, force: true });
    } catch {}

    // Attach a <video> player to the Cucumber JSON
    try {
      const html = videoRelPath
        ? `<details><summary>Scenario video</summary><video controls width="880" src="${videoRelPath}"></video></details>`
        : `<em>No video found</em>`;
      // @ts-ignore
      await context.attach(html, "text/html");
    } catch {}
  },

  /**
   * Clear the worker's cached feature bucket after each feature.
   */
  afterFeature: function (_uri: string, _feature): void {
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";
    if (cid) {
      delete FEATURE_BUCKET_BY_CID[cid];
    }
  },

  /**
   * Gets executed after all tests are done.
   */
  after: async function (_result, _capabilities, _specs): Promise<void> {
    const ms = Number(process.env.WDIO_ARTIFACTS_FLUSH_MS ?? 150);
    if (ms > 0) {
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
  },

  /**
   * Called after each WebDriver session ends.
   */
  afterSession: async function (_config, _caps, _specs): Promise<void> {
    // Allow the video reporter to finish writing
    const settleMs = Number(process.env.WDIO_VIDEO_SETTLE_MS ?? 800);
    if (settleMs > 0) {
      await new Promise((r) => setTimeout(r, settleMs));
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
