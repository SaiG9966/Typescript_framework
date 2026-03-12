import { Given, Then, When } from "@cucumber/cucumber";
import { nopCommercePage as NopCommercePage } from "../../pages/nopCommercePage.ts";
import type { CustomWorld } from "../support/customWorld.ts";

let nopCommercePage: NopCommercePage;

Given("user opens the login dashboard", async function (this: CustomWorld) {
  nopCommercePage = new NopCommercePage(this.page, this.runtime);
  await nopCommercePage.navigate();
});

When("user click on username tab", async function (this: CustomWorld) {
  await nopCommercePage.fillText(nopCommercePage.emailonPage, this.runtime.username);
});

When("user click on password tab", async function (this: CustomWorld) {
  await nopCommercePage.fillText(nopCommercePage.passwordonPage, this.runtime.password);
});

When("click on login", async function (this: CustomWorld) {
  await nopCommercePage.clickOnLogin();
});

Then("user click on customersTab", async function (this: CustomWorld) {
  await nopCommercePage.clickOnCustomersTab();
});

Then("user click on customersinCustomersTab", async function (this: CustomWorld) {
  await nopCommercePage.clickOnCustomersInCustomersTab();
});

Then("click in addNew Button", async function (this: CustomWorld) {
  await nopCommercePage.clickOnAddNewButton();
});

When("user enters customer email {string}", async function (this: CustomWorld, email: string) {
  await nopCommercePage.enterCustomerEmail(email);
});

When("user enters customer password {string}", async function (this: CustomWorld, password: string) {
  await nopCommercePage.enterCustomerPassword(password);
});

When("user enters firstName {string}", async function (this: CustomWorld, firstName: string) {
  await nopCommercePage.enterFirstName(firstName);
});

When("user enters lastName {string}", async function (this: CustomWorld, lastName: string) {
  await nopCommercePage.enterLastName(lastName);
});

When("user selects customer gender {string}", async function (this: CustomWorld, gender: string) {
  await nopCommercePage.selectGender(gender);
});

When("user enters companyName {string}", async function (this: CustomWorld, companyName: string) {
  await nopCommercePage.enterCompanyName(companyName);
});

Then("user click on taxExempt", async function (this: CustomWorld) {
  await nopCommercePage.clickonTaxExempt();
});

Then("user selects {string} in customerRoles", async function (this: CustomWorld, role: string) {
  await nopCommercePage.selectCustomerRoles([role]);
});

Then("user enters managerofVendor {string}", async function (this: CustomWorld, vendor: string) {
  await nopCommercePage.managerVendor(vendor);
});

Then("user enters adminComment {string}", async function (this: CustomWorld, comment: string) {
  await nopCommercePage.enterAdminComment(comment);
});

Then("user should click on Save Button", async function (this: CustomWorld) {
  await nopCommercePage.clickOnSave();
});
