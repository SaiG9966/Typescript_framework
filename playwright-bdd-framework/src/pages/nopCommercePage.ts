import type { Page } from "@playwright/test";

import type { RuntimeConfig } from "../config/runtimeConfig.ts";
import { PlaywrightAssertions } from "../utils/playwrightAssertions.ts";

export class nopCommercePage extends PlaywrightAssertions {
  constructor(page: Page, runtime: RuntimeConfig) {
    super(page, runtime);
  }

  // Login page
  emailonPage = "#Email";
  passwordonPage = "#Password";
  loginButton = "button[type='submit']";

  // Admin navigation
  customersTab = "//a[contains(@href,'#')]//p[contains(text(),'Customers')]";
  customersInCustomersTab = "//a[@href='/Admin/Customer/List']//p[contains(text(),'Customers')]";
  addNewBtn = "a.btn.btn-primary";

  // Customer form fields
  emailInput = "#Email";
  passwordInput = "#Password";
  firstNameInput = "#FirstName";
  lastNameInput = "#LastName";
  maleGenderInput = "#Gender_Male";
  femaleGenderInput = "#Gender_Female";
  companyNameInput = "#Company";
  isTaxExempt = "#IsTaxExempt";
  vendorSelect = "#VendorId";
  adminComment = "#AdminComment";
  saveButton = "button[name='save']";

  async navigate() {
    await this.goto(this.runtime.nopCommerceUrl);
    // Wait for the login form to be present (handles Cloudflare redirects)
    await this.page.waitForSelector(this.emailonPage, {
      state: "visible",
      timeout: this.runtime.navigationTimeoutMs,
    });
  }

  async clickOnLogin() {
    await this.click(this.loginButton);

    try {
      await this.page.waitForURL("**/Admin/**", { timeout: this.runtime.navigationTimeoutMs });
    } catch (error) {
      if (!this.runtime.allowManualVerification) {
        throw error;
      }

      console.info(
        `[nopCommerce] Human verification detected. Complete it manually in the opened browser. Waiting ${this.runtime.manualVerificationTimeoutMs}ms...`,
      );
      await this.page.waitForTimeout(this.runtime.manualVerificationTimeoutMs);
      await this.page.waitForURL("**/Admin/**", { timeout: this.runtime.navigationTimeoutMs });
    }
  }

  async clickOnCustomersTab() {
    await this.click(this.customersTab);
  }

  async clickOnCustomersInCustomersTab() {
    await this.click(this.customersInCustomersTab);
    await this.page.waitForURL("**/Admin/Customer/List**", { timeout: this.runtime.navigationTimeoutMs });
  }

  async clickOnAddNewButton() {
    await this.click(this.addNewBtn);
    await this.page.waitForURL("**/Admin/Customer/Create**", { timeout: this.runtime.navigationTimeoutMs });
  }

  async enterCustomerEmail(email: string) {
    await this.fillText(this.emailInput, email);
  }

  async enterCustomerPassword(password: string) {
    await this.fillText(this.passwordInput, password);
  }

  async enterFirstName(firstName: string) {
    await this.fillText(this.firstNameInput, firstName);
  }

  async enterLastName(lastName: string) {
    await this.fillText(this.lastNameInput, lastName);
  }

  async selectGender(gender: string) {
    const normalizedGender = gender.toLowerCase().trim();
    const selector = normalizedGender === "female" ? this.femaleGenderInput : this.maleGenderInput;
    await this.check(selector);
  }

  async enterCompanyName(companyName: string) {
    await this.fillText(this.companyNameInput, companyName);
  }

  async clickonTaxExempt() {
    await this.click(this.isTaxExempt);
  }

  async selectCustomerRoles(roles: string[]) {
    // Remove pre-selected chips (e.g. "Registered")
    const deleteButtons = this.page.locator(".k-multiselect-wrap li.k-button .k-delete");
    const count = await deleteButtons.count();
    for (let i = count - 1; i >= 0; i--) {
      await deleteButtons.nth(i).click();
    }
    // Type and select each role
    for (const role of roles) {
      const input = this.page.locator(".k-multiselect-wrap input[type='text']");
      await input.fill(role);
      const option = this.page.locator(`.k-list-container li:has-text("${role}")`);
      await option.waitFor({ state: "visible", timeout: this.runtime.actionTimeoutMs });
      await option.click();
    }
  }

  async managerVendor(vendor: string) {
    await this.page.selectOption(this.vendorSelect, { label: vendor });
  }

  async enterAdminComment(comment: string) {
    await this.fillText(this.adminComment, comment);
  }

  async clickOnSave() {
    await this.click(this.saveButton);
  }
}
