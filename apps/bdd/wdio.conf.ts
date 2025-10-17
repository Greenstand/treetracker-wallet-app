import type { Options } from "@wdio/types";
import path from "node:path";
import fs from "node:fs";
// Video reporter for recording test execution - useful for debugging and demos
import Video from "wdio-video-reporter";
import {
  REPORTS_ROOT,
  VIDEOS_TMP,
  scenarioDirs,
  findVideoForCid,
} from "./utils/artifacts";

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

export const config: Options.Testrunner = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",
  // tsConfigPath: './tsconfig.json',

  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // of the configuration file being run.
  //n
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // The path of the spec files will be resolved relative from the directory of
  // of the config file unless it's absolute.
  //
  specs: ["./features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //

  // @ts-ignore
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu", "--window-size=1920,1080"],
      },
    },
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "warn",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/lighthouse-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'http://localhost:8080',
  //
  // Default timeout for all waitFor* commands.
  baseUrl: "http://localhost:3000",

  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  // services: [],

  // =====
  // Services
  // =====
  services: ["chromedriver"],

  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",

  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: [
    "spec",
    // Capture execution videos via wdio-video-reporter
    [
      Video as any,
      {
        saveAllVideos: true, // keep videos for passed and failed scenarios
        outputDir: VIDEOS_TMP, // temp output root for MP4s this run
        rawPath: path.join(VIDEOS_TMP, ".video-reporter-screenshots"), // reporter’s cached frame screenshots
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

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ["./features/step-definitions/*.ts"],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: ["ts-node/register"],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> Only execute the scenarios with name matching the expression (repeatable).
    // name: [],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: "",
    // <number> timeout for step definitions
    timeout: 60000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: true,
    // <string[]> formatters for output
    // Remove the direct cucumber JSON formatter to a single file
    format: ["progress"], // keep a console formatter only
    // debug: true,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (_config, _capabilities) {
    const cucumberJsonDir = path.join(REPORTS_ROOT, "cucumber");
    const videosTmpDir = VIDEOS_TMP; // per-run temp output for MP4 + frame cache
    const videosDir = path.dirname(videosTmpDir); // apps/bdd/test-artifacts/test-videos
    const framesRootDir = path.join(
      videosTmpDir,
      ".video-reporter-screenshots",
    );

    // Ensure a clean Cucumber JSON output directory for this run
    try {
      fs.rmSync(cucumberJsonDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(cucumberJsonDir, { recursive: true });

    // Always start with a fresh test-videos tree (prevents stale videos blocking new recordings)
    try {
      fs.rmSync(videosDir, { recursive: true, force: true });
    } catch {}
    fs.mkdirSync(videosDir, { recursive: true });

    // Recreate the temp area used by wdio-video-reporter (frame stash + intermediate outputs)
    fs.mkdirSync(videosTmpDir, { recursive: true });
    fs.mkdirSync(framesRootDir, { recursive: true }); // ensure frame stash exists
  },

  /**
   * Gets executed before a worker process is spawned and can be used to initialize specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },

  /**
   * Gets executed just after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },

  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {string} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },

  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },

  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },

  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // Remember the current feature "bucket" (e.g. "register") for this worker (cid).
  beforeFeature: function (uri: string) {
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";

    // Derive a stable bucket name from the feature file name: "register.feature" -> "register"
    try {
      const filename = path.basename(uri); // e.g. "register.feature"
      const bucket = filename.replace(/\.feature$/i, ""); // -> "register"
      FEATURE_BUCKET_BY_CID[cid] = bucket || "feature";
    } catch {
      FEATURE_BUCKET_BY_CID[cid] = "feature";
    }
  },

  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {object}                 context  Cucumber World object
   */
  // beforeScenario: function (world, context) {
  // },

  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {object}             context  Cucumber World object
   */
  // beforeStep: function (step, scenario, context) {
  // },

  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {object}             context          Cucumber World object
   */
  /**
   * After each Cucumber step, capture and attach a screenshot if the step failed.
   * Also persist a single "failed-step" image under the scenario's screenshots folder.
   */
  afterStep: async function (_step, _scenario, result, context) {
    if (result.passed) return;

    // Grab a PNG screenshot and attach it to the Cucumber JSON (shows up in HTML)
    const screenshotB64 = await browser.takeScreenshot();
    // WDIO Cucumber world exposes `attach` at runtime
    // @ts-ignore
    await context.attach(Buffer.from(screenshotB64, "base64"), "image/png");

    // The Cucumber world carries names for feature/scenario; keep typing minimal and robust
    const world = context as unknown as {
      gherkinDocument?: { feature?: { name?: string } };
      pickle?: { name?: string };
    };

    // Derive the feature "bucket" recorded for this worker (cid), with safe fallbacks
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

    // Per-scenario logs are not used anymore; ensure any legacy folder is removed
    try {
      fs.rmSync(path.join(base, "logs"), { recursive: true, force: true });
    } catch {}
  },

  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {object}                 context          Cucumber World object
   */
  /**
   * After each Cucumber scenario:
   * - Move the recorded MP4 for this worker (cid) into the scenario's folder.
   * - Remove the temporary frame screenshots used by the video reporter.
   * - Attach an HTML <video> player to the Cucumber JSON so it shows in the HTML report.
   */
  afterScenario: async function (world, result, context) {
    // Identify this worker and resolve the feature bucket + scenario folder
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";

    const featureBucket =
      FEATURE_BUCKET_BY_CID[cid] ||
      world.gherkinDocument?.feature?.name ||
      "feature";

    const scenarioName = world.pickle?.name ?? "scenario";
    const { base } = scenarioDirs(featureBucket, scenarioName);

    // Move the MP4 produced by wdio-video-reporter for this cid into the scenario folder
    const srcVideo = cid ? findVideoForCid(cid) : null;

    let videoRelPath = "";
    if (srcVideo) {
      const destVideo = path.join(base, "run.mp4");
      // Overwrite any stale file from a previous run
      try {
        if (fs.existsSync(destVideo)) fs.rmSync(destVideo, { force: true });
      } catch {}

      fs.renameSync(srcVideo, destVideo);

      // Path relative to report output so the player works in CI artifacts
      videoRelPath = path
        .relative(path.join(REPORTS_ROOT, "cucumber-html"), destVideo)
        .split(path.sep)
        .join("/");

      // Clean up frame screenshots generated by the video reporter for this cid
      try {
        const framesRoot = path.join(VIDEOS_TMP, ".video-reporter-screenshots");
        if (fs.existsSync(framesRoot)) {
          for (const entry of fs.readdirSync(framesRoot)) {
            if (entry.includes(cid)) {
              fs.rmSync(path.join(framesRoot, entry), {
                recursive: true,
                force: true,
              });
            }
          }
        }
      } catch {}
    }

    // We don't keep per-scenario logs in the scenario tree anymore (remove any legacy folder)
    try {
      fs.rmSync(path.join(base, "logs"), { recursive: true, force: true });
    } catch {}

    // Attach a <video> player or a fallback note to the Cucumber JSON (visible in HTML report)
    try {
      const html = videoRelPath
        ? `<details><summary>Scenario video</summary><video controls width="880" src="${videoRelPath}"></video></details>`
        : `<em>No video found</em>`;
      // @ts-ignore - WDIO Cucumber world exposes `attach` at runtime
      await context.attach(html, "text/html");
    } catch {}
  },

  /**
   * Runs after a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  /**
   * Cucumber hook: runs after each Feature file finishes.
   * Clears the worker's cached feature bucket so it doesn't bleed into the next Feature.
   */
  afterFeature: function (_uri: string, _feature): void {
    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";

    if (cid) {
      delete FEATURE_BUCKET_BY_CID[cid];
    }
  },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },

  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  /**
   * WebdriverIO hook: runs after all tests complete.
   * Small buffer so async reporters (e.g., video encoder) finish writing files before process exit.
   * You can tune the delay with WDIO_ARTIFACTS_FLUSH_MS (defaults to 150ms).
   */
  after: async function (_result, _capabilities, _specs): Promise<void> {
    const ms = Number(process.env.WDIO_ARTIFACTS_FLUSH_MS ?? 150);
    if (ms > 0) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  /**
   * WebdriverIO hook: called after each WebDriver session ends (per worker).
   * Ensures the video reporter has flushed files, optionally archives its JSON,
   * and tidies up frame cache directories.
   */
  afterSession: async function (_config, _caps, _specs): Promise<void> {
    // Give the video encoder a brief window to finish file I/O.
    const settleMs = Number(process.env.WDIO_VIDEO_SETTLE_MS ?? 500);
    if (settleMs > 0) {
      await new Promise(r => setTimeout(r, settleMs));
    }

    const cid =
      process.env.WDIO_WORKER_ID || (browser as any)?.config?.cid || "";
    if (!cid) return;

    // Video reporter drops a per-worker JSON summary; keep or discard it.
    const reporterJsonName = `wdio-${cid}-VideoReporter-report.json`;
    const reporterJsonPath = path.join(VIDEOS_TMP, reporterJsonName);

    if (fs.existsSync(reporterJsonPath)) {
      const keepJson =
        (process.env.WDIO_KEEP_VIDEO_JSON ?? "true").toLowerCase() === "true";

      if (keepJson) {
        const archiveDir = path.join(REPORTS_ROOT, "session-logs");
        fs.mkdirSync(archiveDir, { recursive: true });

        // If a stale file exists, replace it.
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

    // If the video reporter created a frame cache root, remove it when empty.
    // (We already prune per-CID subfolders earlier; this is the final sweep.)
    const frameCacheRoot = path.join(VIDEOS_TMP, ".video-reporter-screenshots");
    try {
      if (
        fs.existsSync(frameCacheRoot) &&
        fs.readdirSync(frameCacheRoot).length === 0
      ) {
        fs.rmSync(frameCacheRoot, { recursive: true, force: true });
      }
    } catch {
      // best-effort cleanup; ignore
    }
  },

  /**
   * Gets executed when a refresh happens.
   * @param {string} oldSessionId session ID of the old session
   * @param {string} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
  /**
   * Hook that gets executed before a WebdriverIO assertion happens.
   * @param {object} params information about the assertion to be executed
   */
  // beforeAssertion: function(params) {
  // }
  /**
   * Hook that gets executed after a WebdriverIO assertion happened.
   * @param {object} params information about the assertion that was executed, including its results
   */
  // afterAssertion: function(params) {
  // }
};
