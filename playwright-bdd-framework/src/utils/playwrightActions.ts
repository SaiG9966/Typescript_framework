import type { Locator, Page } from "@playwright/test";

import type { RuntimeConfig } from "../config/runtimeConfig.ts";
import { highlightElement } from "./highlight.ts";

export type LocatorTarget = string | Locator;
type SelectOptionInput = Parameters<Locator["selectOption"]>[0];

/**
 * PlaywrightActions — base class for all page objects.
 * Contains generic browser interaction methods (click, fill, check, etc.).
 * Extended by PlaywrightAssertions which adds expectXxx() assertion helpers.
 * All page objects should extend PlaywrightAssertions to get both.
 */
export class PlaywrightActions {
  protected readonly page: Page;
  protected readonly runtime: RuntimeConfig;

  constructor(page: Page, runtime: RuntimeConfig) {
    this.page = page;
    this.runtime = runtime;
  }

  protected locator(target: LocatorTarget): Locator {
    return typeof target === "string" ? this.page.locator(target) : target;
  }

  protected async highlight(target: LocatorTarget): Promise<void> {
    if (!this.runtime.highlightElements) return;

    if (typeof target === "string") {
      await highlightElement(this.page, target, true);
      return;
    }

    await target.evaluate((el: HTMLElement) => {
      el.style.border = "3px solid red";
      el.style.backgroundColor = "yellow";
    });
  }

  async goto(url: string, waitForSelector?: LocatorTarget): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });

    if (waitForSelector) {
      await this.waitForVisible(waitForSelector, this.runtime.navigationTimeoutMs);
    }
  }

  async waitForVisible(target: LocatorTarget, timeout = this.runtime.actionTimeoutMs): Promise<void> {
    await this.locator(target).waitFor({ state: "visible", timeout });
  }

  async click(target: LocatorTarget): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).click();
  }

  async fillText(target: LocatorTarget, value: string): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).fill("");
    await this.locator(target).fill(value);
  }

  async typeText(target: LocatorTarget, value: string): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).clear();
    await this.locator(target).type(value);
  }

  async press(target: LocatorTarget, key: string): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).press(key);
  }

  async check(target: LocatorTarget): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).check();
  }

  async uncheck(target: LocatorTarget): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).uncheck();
  }

  async select(target: LocatorTarget, option: SelectOptionInput): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).selectOption(option);
  }

  async hover(target: LocatorTarget): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).hover();
  }

  async scrollIntoView(target: LocatorTarget): Promise<void> {
    await this.waitForVisible(target);
    await this.locator(target).scrollIntoViewIfNeeded();
  }

  async uploadFile(target: LocatorTarget, filePaths: string | string[]): Promise<void> {
    await this.waitForVisible(target);
    await this.highlight(target);
    await this.locator(target).setInputFiles(filePaths);
  }

  async getText(target: LocatorTarget): Promise<string> {
    await this.waitForVisible(target);
    return (await this.locator(target).innerText()).trim();
  }

  async getInputValue(target: LocatorTarget): Promise<string> {
    await this.waitForVisible(target);
    return this.locator(target).inputValue();
  }

  async isChecked(target: LocatorTarget): Promise<boolean> {
    await this.waitForVisible(target);
    return this.locator(target).isChecked();
  }

  async isVisible(target: LocatorTarget): Promise<boolean> {
    return this.locator(target).isVisible();
  }

  async screenshot(filePath: string, fullPage = true): Promise<void> {
    await this.page.screenshot({ path: filePath, fullPage });
  }
}
