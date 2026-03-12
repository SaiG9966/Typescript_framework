const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",
  reportPath: "reports/html-report",
  metadata: {
    browser: {
      name: "chrome",
      version: "latest"
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "10"
    }
  }
});