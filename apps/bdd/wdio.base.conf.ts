import type { Options } from "@wdio/types";
import path from "node:path";
import fs from "node:fs";
import "dotenv/config";
import Video from "wdio-video-reporter";
import cucumberJson from "wdio-cucumberjs-json-reporter";
import {
  REPORTS_ROOT,
  VIDEOS_TMP,
  findVideoForCid,
  scenarioDirs,
  FEATURE_BUCKET_BY_CID,
} from "./utils/artifacts";

// Define a base config type that matches your specific service configurations
interface CustomTestrunner extends Omit<Options.Testrunner, "services"> {
  services?: (string | object)[];
}

export const baseConfig: CustomTestrunner = {
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",

  // ==================
  // Specify Test Files
  // ==================
  specs: ["./features/**/*.feature"],
  exclude: [],

  // ============
  // Capabilities (to be overridden by environment configs)
  // ============
  maxInstances: 5,

  // ===================
  // Test Configurations
  // ===================
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost:3000",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // =====
  // Framework
  // =====
  framework: "cucumber",

  // =====
  // Reporters
  // =====
  reporters: [
    "spec",
    [
      Video as any,
      {
        saveAllVideos: true,
        outputDir: VIDEOS_TMP,
        rawPath: path.join(VIDEOS_TMP, ".video-reporter-screenshots"),
        videoFormat: "mp4",
        videoSlowdownMultiplier: 1,
      },
    ],
    [
      "cucumberjs-json",
      {
        jsonFolder: path.join(REPORTS_ROOT, "cucumber"),
      },
    ],
  ],

  // =====
  // Cucumber Options
  // =====
  cucumberOpts: {
    require: ["./features/step-definitions/*.ts", "./support/*.ts"],
    backtrace: false,
    requireModule: ["ts-node/register"],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
    format: ["progress"],
  },

  // =====
  // Hooks (Common) - Cast to appropriate types
  // =====
  onPrepare: function (_config: any, _capabilities: any) {
    const cucumberJsonDir = path.join(REPORTS_ROOT, "cucumber");
    const cucumberHtmlDir = path.join(REPORTS_ROOT, "cucumber-html");
    const videosDir = path.dirname(VIDEOS_TMP);
    const framesRootDir = path.join(VIDEOS_TMP, ".video-reporter-screenshots");

    // Clean and create directories
    try {
      fs.rmSync(cucumberJsonDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(cucumberJsonDir, { recursive: true });

    try {
      fs.rmSync(cucumberHtmlDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(cucumberHtmlDir, { recursive: true });

    try {
      fs.rmSync(videosDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(videosDir, { recursive: true });

    fs.mkdirSync(VIDEOS_TMP, { recursive: true });
    fs.mkdirSync(framesRootDir, { recursive: true });
  },

  beforeFeature: function (uri: string) {
    const cid =
      process.env.WDIO_WORKER_ID || (global as any).browser?.config?.cid || "";
    try {
      const filename = path.basename(uri);
      const bucket = filename.replace(/\.feature$/i, "");
      FEATURE_BUCKET_BY_CID[cid] = bucket || "feature";
    } catch {
      FEATURE_BUCKET_BY_CID[cid] = "feature";
    }
  },

  afterStep: async function (
    _step: any,
    _scenario: any,
    result: any,
    context: any,
  ) {
    if (result.passed) return;

    const screenshotB64 = await (global as any).browser.takeScreenshot();
    (cucumberJson as any).attach(screenshotB64, "image/png");

    const cid =
      process.env.WDIO_WORKER_ID || (global as any).browser?.config?.cid || "";
    const world = context as any;
    const featureBucket =
      FEATURE_BUCKET_BY_CID[cid] ||
      world.gherkinDocument?.feature?.name ||
      "feature";
    const scenarioName = world.pickle?.name ?? _scenario?.name ?? "scenario";
    const { screenshots } = scenarioDirs(featureBucket, scenarioName);

    fs.writeFileSync(
      path.join(screenshots, `${Date.now()}-failed-step.png`),
      Buffer.from(screenshotB64, "base64"),
    );
  },

  afterScenario: async function (world: any, result: any, context: any) {
    const cid =
      process.env.WDIO_WORKER_ID || (global as any).browser?.config?.cid || "";
    const featureBucket =
      FEATURE_BUCKET_BY_CID[cid] ||
      world.gherkinDocument?.feature?.name ||
      "feature";
    const scenarioName = world.pickle?.name ?? "scenario";
    const { base } = scenarioDirs(featureBucket, scenarioName);

    const srcVideo = cid ? findVideoForCid(cid) : null;
    let videoRelPath = "";

    if (srcVideo) {
      const destVideo = path.join(base, "run.mp4");
      try {
        if (fs.existsSync(destVideo)) fs.rmSync(destVideo, { force: true });
      } catch {}
      fs.renameSync(srcVideo, destVideo);
      videoRelPath = path
        .relative(path.join(REPORTS_ROOT, "cucumber-html"), destVideo)
        .split(path.sep)
        .join("/");
    }

    try {
      const html = videoRelPath
        ? `<details><summary>Scenario video</summary><video controls width="880" src="${videoRelPath}"></video></details>`
        : `<em>No video found</em>`;
      await (context as any).attach(html, "text/html");
    } catch {}
  },

  afterFeature: function (_uri: string, _feature: any): void {
    const cid =
      process.env.WDIO_WORKER_ID || (global as any).browser?.config?.cid || "";
    if (cid) {
      delete FEATURE_BUCKET_BY_CID[cid];
    }
  },

  afterSession: async function (
    _config: any,
    _caps: any,
    _specs: any,
  ): Promise<void> {
    const settleMs = Number(process.env.WDIO_VIDEO_SETTLE_MS ?? 800);
    if (settleMs > 0) {
      await new Promise(r => setTimeout(r, settleMs));
    }

    const cid =
      process.env.WDIO_WORKER_ID || (global as any).browser?.config?.cid || "";
    if (!cid) return;

    // Video reporter cleanup logic
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

    // Frame cache cleanup
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
        if (fs.readdirSync(framesRoot).length === 0) {
          fs.rmSync(framesRoot, { recursive: true, force: true });
        }
      }
    } catch {}

    // Cleanup temp files
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
};
