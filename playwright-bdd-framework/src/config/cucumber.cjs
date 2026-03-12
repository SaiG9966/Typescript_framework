require("dotenv").config();

const configuredFeaturePath = process.env.FEATURE_PATH;

module.exports = {
  default: {
    loader: ["ts-node/esm"],
    import: [
      "src/tests/support/**/*.ts",
      "src/tests/stepDefinitions/**/*.ts",
      "src/tests/hooks/**/*.ts"
    ],
    paths: configuredFeaturePath ? [configuredFeaturePath] : ["src/tests/features/**/*.feature"],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: process.env.ALLURE_RESULTS_DIR || "allure-results"
    },
    tags: process.env.TAGS,
    parallel: Number(process.env.PARALLEL || 0),
    retry: Number(process.env.RETRY || 0),
    publishQuiet: true
  }
};