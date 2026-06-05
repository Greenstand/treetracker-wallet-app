/**
 * HTML Report Generator for BDD Tests
 *
 * This script processes JSON test results from Cucumber and generates
 * a beautiful HTML report using multiple-cucumber-html-reporter.
 *
 * Usage: yarn report:cucumber
 */
import { generate } from "multiple-cucumber-html-reporter";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORTS_ROOT = resolve(__dirname, "../test-artifacts/reports");
const PLATFORM = (process.env.PLATFORM ?? "web").toLowerCase();
const PLATFORM_LABEL =
  PLATFORM === "ios"
    ? "iOS"
    : PLATFORM.charAt(0).toUpperCase() + PLATFORM.slice(1);
const PLATFORM_REPORTS_ROOT = join(REPORTS_ROOT, PLATFORM);

generate({
  jsonDir: join(PLATFORM_REPORTS_ROOT, "cucumber"),
  reportPath: join(PLATFORM_REPORTS_ROOT, "cucumber-html"),
  pageTitle: `Treetracker Wallet E2E Test Report - ${PLATFORM_LABEL}`,
  reportName: `Cucumber Test Results - ${PLATFORM_LABEL}`,
  disableLog: true,
  displayDuration: true,
  metadata: {
    browser: { name: "Chrome", version: "Latest" },
    device: "CI/Local",
    platform: { name: process.platform },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Generated on", value: new Date().toISOString() },
      { label: "Environment", value: process.env.NODE_ENV || "development" },
    ],
  },
});

const reportPath = resolve(PLATFORM_REPORTS_ROOT, "cucumber-html/index.html");

console.log("✅ HTML report generated successfully!");
console.log("📊 Report location:", reportPath);
console.log("🌐 Open in browser:");
console.log(
  `   \x1b]8;;file://${reportPath}\x1b\\file://${reportPath}\x1b]8;;\x1b\\`,
);
console.log("");
console.log("💡 Quick commands:");
console.log(
  "   • Open report: open apps/bdd/test-artifacts/reports/cucumber-html/index.html",
);
console.log(
  "   • View in terminal: cat apps/bdd/test-artifacts/reports/cucumber-html/index.html | head -20",
);
