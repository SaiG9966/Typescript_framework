import type { Page } from "@playwright/test";

import type { RuntimeConfig } from "../../config/runtimeConfig.ts";
import { PlaywrightAssertions } from "../../utils/playwrightAssertions.ts";

export class LoginPage extends PlaywrightAssertions {
  usernameInput = "input[name='username']";
  passwordInput = "input[name='password']";
  loginButton = "button[type='submit']";

  constructor(page: Page, runtime: RuntimeConfig) {
    super(page, runtime);
  }

  async navigate() {
    await this.goto(this.runtime.loginUrl, this.usernameInput);
  }

  async enterUsername(username: string) {
    await this.fillText(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fillText(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async verifyDashboard() {
    await this.expectUrlContains("/dashboard");
  }
}
