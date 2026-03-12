import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "playwright";
import type { Browser } from "playwright";
import { runtimeConfig } from "../../config/runtimeConfig.ts";
import type { CustomWorld } from "../support/customWorld.ts";

setDefaultTimeout(runtimeConfig.timeoutMs);

let sharedBrowser: Browser;

const browserFactory = {
  chromium,
  firefox,
  webkit
};

BeforeAll(async function () {
  const launcher = browserFactory[runtimeConfig.browser] ?? chromium;
  sharedBrowser = await launcher.launch({
    headless: runtimeConfig.headless,
    slowMo: runtimeConfig.slowMo
  });
});

Before(async function (this: CustomWorld) {
  const contextOptions: Parameters<Browser["newContext"]>[0] = {
    ignoreHTTPSErrors: true,
    viewport: { width: 1366, height: 768 }
  };

  if (runtimeConfig.baseUrl) {
    contextOptions.baseURL = runtimeConfig.baseUrl;
  }

  this.context = await sharedBrowser.newContext(contextOptions);
  this.context.setDefaultTimeout(runtimeConfig.actionTimeoutMs);
  this.context.setDefaultNavigationTimeout(runtimeConfig.navigationTimeoutMs);

  if (runtimeConfig.trace) {
    await this.context.tracing.start({ screenshots: true, snapshots: true });
  }

  this.page = await this.context.newPage();
  this.formData = {};
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (runtimeConfig.screenshotOnFailure && result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, "image/png");
  }

  if (runtimeConfig.trace && this.context && pickle) {
    await this.context.tracing.stop({
      path: `test-results/${pickle.name.replace(/[^a-zA-Z0-9-_]/g, "_")}.zip`
    });
  }

  await this.context?.close();
});

AfterAll(async function () {
  await sharedBrowser?.close();
});