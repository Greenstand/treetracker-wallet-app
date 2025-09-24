/**
 * HTML Report Generator for BDD Tests
 *
 * This script processes JSON test results from Cucumber and generates
 * a beautiful HTML report using multiple-cucumber-html-reporter.
 *
 * Usage: yarn report:cucumber
 */

const report = require("multiple-cucumber-html-reporter");
const path = require("path");

report.generate({
  jsonDir: path.resolve(__dirname, "../reports/cucumber"),
  reportPath: path.resolve(__dirname, "../reports/cucumber-html"),
  pageTitle: "Treetracker Wallet E2E Test Report",
  reportName: "Cucumber Test Results",
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

const reportPath = path.resolve(
  __dirname,
  "../reports/cucumber-html/index.html",
);

console.log("✅ HTML report generated successfully!");
console.log("📊 Report location:", reportPath);
console.log("🌐 Open in browser:");
console.log(
  `   \x1b]8;;file://${reportPath}\x1b\\file://${reportPath}\x1b]8;;\x1b\\`,
);
console.log("");
console.log("💡 Quick commands:");
console.log("   • Open report: open apps/bdd/reports/cucumber-html/index.html");
console.log(
  "   • View in terminal: cat apps/bdd/reports/cucumber-html/index.html | head -20",
);
