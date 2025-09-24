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

console.log("HTML report generated at: ./reports/cucumber-html/index.html");
