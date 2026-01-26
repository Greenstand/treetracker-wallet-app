#!/usr/bin/env npx tsx

/**
 *  BDD Test Watcher
 *
 * A powerful development tool for BDD testing with WebdriverIO.
 *
 * Features:
 * - 🎯 Smart spec detection - auto-runs changed feature file only
 * - 🎮 Interactive menu - press keys to control the watcher
 * - 📊 Test statistics - track pass/fail history
 * - 🔄 Re-run failed - quickly re-run only failed tests
 * - 🏷️ Tag filtering - run tests by Cucumber tags
 * - 🧹 Clear screen - clean output between runs
 * - ⏱️ Time tracking - see how long tests take
 * - 🔊 Sound notifications - audio feedback on completion
 * - 📂 Auto-open reports - open HTML report after tests
 * - ⏸️ Pause/Resume - temporarily stop watching
 *
 * @see https://github.com/Greenstand/treetracker-wallet-app/issues/610
 */

import chokidar, { FSWatcher } from "chokidar";
import { spawn, ChildProcess, exec } from "child_process";
import path from "path";
import fs from "fs";
import treeKill from "tree-kill";

// ============================================================================
// Configuration
// ============================================================================

interface WatcherConfig {
  watchPaths: string[];
  ignoredPatterns: RegExp;
  debounceMs: number;
  wdioConfig: string;
  specFilter?: string;
  tags?: string;
  clearScreen: boolean;
  soundEnabled: boolean;
  autoOpenReport: boolean;
  maxInstances?: number;
  skipInitialRun: boolean;
}

interface TestRun {
  timestamp: Date;
  duration: number;
  exitCode: number | null;
  spec?: string;
}

// State
const BDD_ROOT = process.cwd();
const REPORTS_DIR = path.join(BDD_ROOT, "test-artifacts", "reports");
let wdioProcess: ChildProcess | null = null;
let isRunning = false;
let pendingRun = false;
let isPaused = false;
let lastChangedFile: string | null = null;
let testHistory: TestRun[] = [];
let lastFailedSpec: string | null = null;
let watcher: FSWatcher | null = null;
let currentConfig: WatcherConfig;

const defaultConfig: WatcherConfig = {
  watchPaths: [
    path.join(BDD_ROOT, "features/**/*.feature"),
    path.join(BDD_ROOT, "features/**/*.ts"),
    path.join(BDD_ROOT, "utils/**/*.ts"),
    path.join(BDD_ROOT, "wdio.*.ts"),
  ],
  // Ignore test artifacts, node_modules, git, temp files, and reporter outputs
  ignoredPatterns:
    /node_modules|\.git|test-artifacts|\.tmp|\.video-reporter|allure-results|\.mp4|\.png|\.json$/,
  debounceMs: 800,
  wdioConfig: "./wdio.debug.conf.ts",
  clearScreen: true,
  soundEnabled: true,
  autoOpenReport: false,
  skipInitialRun: false,
};

// ============================================================================
// CLI Argument Parsing
// ============================================================================

function parseArgs(): Partial<WatcherConfig> & { help?: boolean } {
  const args = process.argv.slice(2);
  const config: Partial<WatcherConfig> & { help?: boolean } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      config.help = true;
    } else if (arg === "--spec" || arg === "-s") {
      config.specFilter = args[++i];
    } else if (arg === "--config" || arg === "-c") {
      config.wdioConfig = args[++i];
    } else if (arg === "--debounce" || arg === "-d") {
      config.debounceMs = parseInt(args[++i], 10);
    } else if (arg === "--tags" || arg === "-t") {
      config.tags = args[++i];
    } else if (arg === "--debug") {
      config.wdioConfig = "./wdio.debug.conf.ts";
    } else if (arg === "--web") {
      config.wdioConfig = "./wdio.web.conf.ts";
    } else if (arg === "--no-clear") {
      config.clearScreen = false;
    } else if (arg === "--no-sound") {
      config.soundEnabled = false;
    } else if (arg === "--open-report") {
      config.autoOpenReport = true;
    } else if (arg === "--instances") {
      config.maxInstances = parseInt(args[++i], 10);
    } else if (arg === "--no-initial") {
      config.skipInitialRun = true;
    }
  }

  return config;
}

function showHelp(): void {
  console.log(`
\x1b[32m╔══════════════════════════════════════════════════════════════════════════════╗
║                            BDD Test Watcher                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[33mUSAGE:\x1b[0m
  yarn bdd:watch [options]

\x1b[33mOPTIONS:\x1b[0m
  -h, --help              Show this help message
  -s, --spec <name>       Filter tests by feature name (e.g., "login")
  -c, --config <path>     Path to WDIO config file
  -d, --debounce <ms>     Debounce delay in milliseconds (default: 800)
  -t, --tags <tags>       Filter by Cucumber tags (e.g., "@smoke", "@web and @login")
  --debug                 Use debug config (default)
  --web                   Use web config (faster, less verbose)
  --no-clear              Don't clear screen between runs
  --no-sound              Disable sound notifications
  --no-initial            Don't run tests on startup (wait for changes)
  --open-report           Auto-open HTML report after tests
  --instances <n>         Max parallel browser instances

\x1b[33mEXAMPLES:\x1b[0m
  yarn bdd:watch                           Watch all tests
  yarn bdd:watch --spec login              Watch only login.feature
  yarn bdd:watch --tags "@smoke"           Run only @smoke tagged scenarios
  yarn bdd:watch --open-report             Auto-open report after each run

\x1b[33mINTERACTIVE COMMANDS:\x1b[0m
  \x1b[36mEnter\x1b[0m     Re-run all tests
  \x1b[36mr\x1b[0m         Re-run last changed file only
  \x1b[36mf\x1b[0m         Re-run failed tests only
  \x1b[36mo\x1b[0m         Open HTML test report
  \x1b[36mc\x1b[0m         Clear screen
  \x1b[36mp\x1b[0m         Pause/Resume file watching
  \x1b[36ms\x1b[0m         Show test statistics
  \x1b[36ml\x1b[0m         List available feature files
  \x1b[36mh\x1b[0m         Show this help
  \x1b[36mq\x1b[0m         Quit watcher

\x1b[33mWATCHED FILES:\x1b[0m
  • features/**/*.feature    - Cucumber feature files
  • features/**/*.ts         - Step definitions
  • utils/**/*.ts            - Utility modules
  • wdio.*.ts                - WebdriverIO configs

`);
}

// ============================================================================
// Terminal Utilities
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
};

function clearScreen(): void {
  if (currentConfig?.clearScreen) {
    process.stdout.write("\x1b[2J\x1b[H");
  }
}

function playSound(success: boolean): void {
  if (!currentConfig?.soundEnabled) return;

  // Use terminal bell or system sounds
  if (process.platform === "darwin") {
    // macOS
    const sound = success ? "Glass" : "Basso";
    exec(`afplay /System/Library/Sounds/${sound}.aiff 2>/dev/null || true`);
  } else {
    // Terminal bell fallback
    process.stdout.write("\x07");
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(0);
  return `${mins}m ${secs}s`;
}

function printBanner(): void {
  console.log(`
${colors.green}╔══════════════════════════════════════════════════════════════════════════════╗
║                                   BDD Test Watcher                           ║
╚══════════════════════════════════════════════════════════════════════════════╝${colors.reset}
`);
}

function printStatus(): void {
  const pauseStatus = isPaused
    ? `${colors.yellow}⏸️  PAUSED${colors.reset}`
    : `${colors.green}👀 WATCHING${colors.reset}`;

  console.log(`
${colors.cyan}📁 Watching:${colors.reset}
   • features/**/*.feature
   • features/**/*.ts

${colors.cyan}⚙️  Config:${colors.reset} ${currentConfig.wdioConfig}
${currentConfig.specFilter ? `${colors.cyan}🎯 Spec:${colors.reset} *${currentConfig.specFilter}*` : ""}
${currentConfig.tags ? `${colors.cyan}🏷️  Tags:${colors.reset} ${currentConfig.tags}` : ""}
${colors.cyan}📊 Status:${colors.reset} ${pauseStatus}

${colors.dim}Press 'h' for help, 'q' to quit${colors.reset}
`);
}

function printTestStats(): void {
  if (testHistory.length === 0) {
    console.log(`\n${colors.yellow}📊 No test runs yet${colors.reset}\n`);
    return;
  }

  const passed = testHistory.filter(t => t.exitCode === 0).length;
  const failed = testHistory.filter(t => t.exitCode !== 0).length;
  const avgDuration =
    testHistory.reduce((sum, t) => sum + t.duration, 0) / testHistory.length;

  console.log(`
${colors.cyan}╔════════════════════════════════════════╗
║           📊 Test Statistics            ║
╠════════════════════════════════════════╣${colors.reset}
  Total Runs:    ${testHistory.length}
  ${colors.green}✅ Passed:${colors.reset}      ${passed}
  ${colors.red}❌ Failed:${colors.reset}      ${failed}
  Pass Rate:     ${((passed / testHistory.length) * 100).toFixed(1)}%
  Avg Duration:  ${formatDuration(avgDuration)}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}

${colors.dim}Recent runs:${colors.reset}
${testHistory
  .slice(-5)
  .map(
    t =>
      `  ${t.exitCode === 0 ? colors.green + "✓" : colors.red + "✗"} ${colors.reset}${t.timestamp.toLocaleTimeString()} - ${formatDuration(t.duration)}${t.spec ? ` (${t.spec})` : ""}`,
  )
  .join("\n")}
`);
}

function listFeatureFiles(): void {
  const featuresDir = path.join(BDD_ROOT, "features");
  console.log(`\n${colors.cyan}📂 Available Feature Files:${colors.reset}\n`);

  function listDir(dir: string, indent = ""): void {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && item !== "step-definitions") {
        console.log(`${indent}📁 ${colors.blue}${item}/${colors.reset}`);
        listDir(fullPath, indent + "  ");
      } else if (item.endsWith(".feature")) {
        const marker = lastChangedFile?.includes(item)
          ? " 👈 last changed"
          : "";
        console.log(
          `${indent}  📄 ${colors.green}${item}${colors.reset}${marker}`,
        );
      }
    }
  }

  listDir(featuresDir);
  console.log("");
}

function openReport(): void {
  const reportPath = path.join(REPORTS_DIR, "cucumber-html", "index.html");
  if (fs.existsSync(reportPath)) {
    console.log(`\n${colors.cyan}📂 Opening report...${colors.reset}`);
    const cmd =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
          ? "start"
          : "xdg-open";
    exec(`${cmd} "${reportPath}"`);
  } else {
    console.log(
      `\n${colors.yellow}⚠️  No report found. Run tests first.${colors.reset}`,
    );
  }
}

// ============================================================================
// Process Management
// ============================================================================

async function killPreviousProcess(): Promise<void> {
  return new Promise(resolve => {
    if (!wdioProcess || !wdioProcess.pid) {
      resolve();
      return;
    }

    console.log(
      `\n${colors.yellow}🛑 Stopping previous test...${colors.reset}`,
    );

    const pid = wdioProcess.pid;
    wdioProcess = null;
    isRunning = false;

    treeKill(pid, "SIGTERM", err => {
      if (err) {
        treeKill(pid, "SIGKILL", () => resolve());
      } else {
        resolve();
      }
    });

    setTimeout(() => resolve(), 5000);
  });
}

async function runTests(
  options: { spec?: string; failedOnly?: boolean } = {},
): Promise<void> {
  if (isRunning) {
    console.log(`${colors.yellow}⏳ Tests running, queuing...${colors.reset}`);
    pendingRun = true;
    return;
  }

  await killPreviousProcess();

  isRunning = true;
  pendingRun = false;

  clearScreen();
  printBanner();

  const startTime = Date.now();
  const timestamp = new Date().toLocaleTimeString();

  console.log(
    `${colors.bright}🚀 Starting tests at ${timestamp}${colors.reset}`,
  );
  console.log(`${"─".repeat(80)}\n`);

  // Build command arguments
  const args = ["wdio", "run", currentConfig.wdioConfig];

  // Determine spec to run
  let specToRun = options.spec;
  if (options.failedOnly && lastFailedSpec) {
    specToRun = lastFailedSpec;
    console.log(
      `${colors.yellow}🔄 Re-running failed spec: ${specToRun}${colors.reset}\n`,
    );
  } else if (currentConfig.specFilter) {
    specToRun = currentConfig.specFilter;
  }

  if (specToRun) {
    // Check if it's a full path or just a name
    if (specToRun.includes(".feature")) {
      args.push("--spec", specToRun);
    } else {
      args.push("--spec", `./features/**/*${specToRun}*.feature`);
    }
  }

  // Add tags if specified
  if (currentConfig.tags) {
    args.push("--cucumberOpts.tags", currentConfig.tags);
  }

  // Add max instances if specified
  if (currentConfig.maxInstances) {
    args.push("--maxInstances", currentConfig.maxInstances.toString());
  }

  console.log(`${colors.dim}📋 npx ${args.join(" ")}${colors.reset}\n`);

  wdioProcess = spawn("npx", args, {
    stdio: "inherit",
    shell: true,
    cwd: BDD_ROOT,
    env: {
      ...process.env,
      FORCE_COLOR: "1",
    },
  });

  wdioProcess.on("close", code => {
    const duration = Date.now() - startTime;
    const success = code === 0;

    // Track history
    testHistory.push({
      timestamp: new Date(),
      duration,
      exitCode: code,
      spec: specToRun,
    });

    // Track failed spec for re-run
    if (!success && specToRun) {
      lastFailedSpec = specToRun;
    } else if (success) {
      lastFailedSpec = null;
    }

    // Results banner
    console.log(`\n${"─".repeat(80)}`);
    if (success) {
      console.log(
        `${colors.bgGreen}${colors.white} ✅ PASSED ${colors.reset} ${formatDuration(duration)}`,
      );
    } else {
      console.log(
        `${colors.bgRed}${colors.white} ❌ FAILED ${colors.reset} Exit code: ${code} | ${formatDuration(duration)}`,
      );
    }
    console.log(`${"─".repeat(80)}`);

    // Sound notification
    playSound(success);

    // Auto-open report
    if (currentConfig.autoOpenReport) {
      setTimeout(() => openReport(), 1000);
    }

    // Show interactive hint
    console.log(`
${colors.dim}Commands: [Enter] run all | [r] run last | [f] run failed | [o] open report | [h] help${colors.reset}
`);

    isRunning = false;
    wdioProcess = null;

    if (pendingRun) {
      console.log(`${colors.cyan}🔄 Running queued test...${colors.reset}`);
      runTests();
    }
  });

  wdioProcess.on("error", error => {
    console.error(
      `\n${colors.red}❌ Process error: ${error.message}${colors.reset}`,
    );
    isRunning = false;
    wdioProcess = null;
  });
}

// ============================================================================
// File Watcher
// ============================================================================

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function startWatcher(config: WatcherConfig): FSWatcher {
  const debouncedRunTests = debounce((spec?: string) => {
    if (!isPaused) {
      runTests({ spec });
    }
  }, config.debounceMs);

  clearScreen();
  printBanner();
  printStatus();

  const fsWatcher = chokidar.watch(config.watchPaths, {
    ignored: config.ignoredPatterns,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  fsWatcher
    .on("ready", () => {
      if (config.skipInitialRun) {
        console.log(
          `${colors.green}✓ Ready! Waiting for file changes...${colors.reset}\n`,
        );
      } else {
        console.log(
          `${colors.green}✓ Ready! Running initial tests...${colors.reset}\n`,
        );
        runTests();
      }
    })
    .on("change", filePath => {
      const relPath = path.relative(BDD_ROOT, filePath);
      lastChangedFile = relPath;

      if (isPaused) {
        console.log(`${colors.yellow}📝 [PAUSED] ${relPath}${colors.reset}`);
        return;
      }

      console.log(`\n${colors.cyan}📝 Changed: ${relPath}${colors.reset}`);

      // Smart spec detection - if a .feature file changed, run only that file
      if (filePath.endsWith(".feature")) {
        const featureName = path.basename(filePath);
        console.log(
          `${colors.dim}   → Running only ${featureName}${colors.reset}`,
        );
        debouncedRunTests(filePath);
      } else {
        debouncedRunTests();
      }
    })
    .on("add", filePath => {
      const relPath = path.relative(BDD_ROOT, filePath);
      if (!isPaused) {
        console.log(`\n${colors.green}➕ Added: ${relPath}${colors.reset}`);
        debouncedRunTests();
      }
    })
    .on("unlink", filePath => {
      const relPath = path.relative(BDD_ROOT, filePath);
      console.log(`\n${colors.red}➖ Removed: ${relPath}${colors.reset}`);
    })
    .on("error", error => {
      console.error(`\n${colors.red}❌ Watcher error: ${error}${colors.reset}`);
    });

  return fsWatcher;
}

// ============================================================================
// Keyboard Input Handler
// ============================================================================

function setupKeyboardHandler(): void {
  if (!process.stdin.isTTY) return;

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", (chunk: Buffer | string) => {
    const key = chunk.toString().toLowerCase();

    switch (key) {
      case "\u0003": // Ctrl+C
      case "q":
        console.log(`\n\n${colors.yellow}🛑 Shutting down...${colors.reset}`);
        cleanup();
        break;

      case "\r": // Enter
      case "\n":
        console.log(`\n${colors.cyan}🔄 Running all tests...${colors.reset}`);
        runTests();
        break;

      case "r": // Re-run last changed file
        if (lastChangedFile) {
          console.log(
            `\n${colors.cyan}🔄 Re-running: ${lastChangedFile}${colors.reset}`,
          );
          if (lastChangedFile.endsWith(".feature")) {
            runTests({ spec: lastChangedFile });
          } else {
            runTests();
          }
        } else {
          console.log(`\n${colors.yellow}No file changed yet${colors.reset}`);
        }
        break;

      case "f": // Re-run failed
        if (lastFailedSpec) {
          runTests({ failedOnly: true });
        } else {
          console.log(
            `\n${colors.yellow}No failed tests to re-run${colors.reset}`,
          );
        }
        break;

      case "o": // Open report
        openReport();
        break;

      case "c": // Clear screen
        clearScreen();
        printBanner();
        printStatus();
        break;

      case "p": // Pause/Resume
        isPaused = !isPaused;
        if (isPaused) {
          console.log(
            `\n${colors.yellow}⏸️  Watching PAUSED - press 'p' to resume${colors.reset}`,
          );
        } else {
          console.log(`\n${colors.green}▶️  Watching RESUMED${colors.reset}`);
        }
        break;

      case "s": // Statistics
        printTestStats();
        break;

      case "l": // List features
        listFeatureFiles();
        break;

      case "h": // Help
      case "?":
        showHelp();
        break;
    }
  });
}

// ============================================================================
// Cleanup
// ============================================================================

async function cleanup(): Promise<void> {
  console.log(`\n${colors.dim}🧹 Cleaning up...${colors.reset}`);

  await killPreviousProcess();

  if (watcher) {
    await watcher.close();
  }

  // Final stats
  if (testHistory.length > 0) {
    printTestStats();
  }

  console.log(`${colors.green}👋 Goodbye!${colors.reset}\n`);
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGHUP", cleanup);
process.on("uncaughtException", async error => {
  console.error(`\n${colors.red}💥 Error: ${error}${colors.reset}`);
  await cleanup();
});

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  const cliArgs = parseArgs();

  if (cliArgs.help) {
    showHelp();
    process.exit(0);
  }

  currentConfig = {
    ...defaultConfig,
    ...cliArgs,
  };

  process.chdir(BDD_ROOT);

  watcher = startWatcher(currentConfig);
  setupKeyboardHandler();
}

main().catch(error => {
  console.error(`Failed to start: ${error}`);
  process.exit(1);
});
