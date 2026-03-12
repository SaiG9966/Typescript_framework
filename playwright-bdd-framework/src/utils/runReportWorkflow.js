import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frameworkRoot = path.resolve(__dirname, "../..");
const resultsDir = path.join(frameworkRoot, "allure-results");
const reportDir = path.join(frameworkRoot, "allure-report");

const shouldOpen = process.argv.includes("--open");

function runNpmScript(scriptName, { allowFailure = false } = {}) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    console.error("npm runtime metadata not found. Please run this via npm scripts.");
    process.exit(1);
  }

  const result = spawnSync(process.execPath, [npmCli, "run", scriptName], {
    cwd: frameworkRoot,
    stdio: "inherit"
  });

  const code = result.status ?? 1;
  if (code !== 0 && !allowFailure) {
    process.exit(code);
  }
  return code;
}

function hasResults() {
  if (!fs.existsSync(resultsDir)) return false;
  const entries = fs.readdirSync(resultsDir);
  return entries.length > 0;
}

function hasExistingReport() {
  return fs.existsSync(path.join(reportDir, "index.html"));
}

const testExitCode = runNpmScript("test:raw", { allowFailure: true });

if (hasResults()) {
  const reportCode = runNpmScript("report:generate", { allowFailure: true });
  if (reportCode !== 0) {
    console.error("\nReport generation failed. Existing report (if any) was not intentionally removed by this workflow.\n");
    process.exit(reportCode);
  }
} else {
  console.warn("\nNo allure results found. Keeping existing report unchanged.\n");
}

if (hasExistingReport()) {
  runNpmScript("print-report", { allowFailure: true });
  if (shouldOpen) {
    runNpmScript("report:open", { allowFailure: true });
  }
} else {
  console.warn("\nNo generated report found yet at allure-report/index.html\n");
}

if (testExitCode !== 0) {
  console.warn("\nTests failed, but report steps were still executed.\n");
}

process.exit(testExitCode);
