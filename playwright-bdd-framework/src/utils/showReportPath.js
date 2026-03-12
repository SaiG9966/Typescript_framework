import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frameworkRoot = path.resolve(__dirname, "../..");
const reportPath = path.resolve(frameworkRoot, "allure-report/index.html");

console.log("\n======================================");
console.log(" Test Execution Completed");
console.log(" Allure Report Location:");
console.log(reportPath);
console.log("Framework by Thirumandas Saiteja Goud")
console.log("======================================\n");