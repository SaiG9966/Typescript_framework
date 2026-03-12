import type { DataTable} from "@cucumber/cucumber";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { basicControls_Page } from "../../pages/basicControlsPage.js";
import type { CustomWorld } from "../support/customWorld.js";

let basicControlsPage: basicControls_Page;

Given("user opens the registration form", async function (this: CustomWorld) {
  basicControlsPage = new basicControls_Page(this.page, this.runtime);
  await basicControlsPage.navigate();
});

When("user enters first name {string}", async function (this: CustomWorld, firstName: string) {
  if (!this.formData) this.formData = {};
  this.formData.firstName = firstName;
  await basicControlsPage.enterFirstname(firstName);
});

When("user enters last name {string}", async function (this: CustomWorld, lastName: string) {
  if (!this.formData) this.formData = {};
  this.formData.lastName = lastName;
  await basicControlsPage.enterlastName(lastName);
});

When("user selects gender {string}", async function (this: CustomWorld, gender: string) {
  if (!this.formData) this.formData = {};
  this.formData.gender = gender;
  await basicControlsPage.selectGender(gender);
});

When("user selects languages", async function (this: CustomWorld, dataTable: DataTable) {
  if (!this.formData) this.formData = {};
  const languages = dataTable.raw().flat().map((language) => language.trim());
  this.formData.languages = languages;
  await basicControlsPage.selectLanguages(languages);
});

When("user enters email {string}", async function (this: CustomWorld, email: string) {
  if (!this.formData) this.formData = {};
  this.formData.email = email;
  await basicControlsPage.enterEmail(email);
});

When("user enters password {string}", async function (this: CustomWorld, password: string) {
  if (!this.formData) this.formData = {};
  this.formData.password = password;
  await basicControlsPage.enterPassword(password);
});

Then("all user details should be filled successfully", async function (this: CustomWorld) {
  const expectedFirstName = String(this.formData.firstName ?? "");
  const expectedLastName = String(this.formData.lastName ?? "");
  const expectedEmail = String(this.formData.email ?? "");
  const expectedPassword = String(this.formData.password ?? "");
  const expectedGender = String(this.formData.gender ?? "").toLowerCase();
  const expectedLanguages = (this.formData.languages as string[] | undefined) ?? [];

  const firstNameValue = await basicControlsPage.getFirstnameValue();
  const lastNameValue = await basicControlsPage.getLastnameValue();
  const emailValue = await basicControlsPage.getEmailValue();
  const passwordValue = await basicControlsPage.getPasswordValue();
  const selectedGender = (await basicControlsPage.verifyGenderSelection(expectedGender)).toLowerCase();
  const selectedLanguages = await basicControlsPage.getSelectedLanguages();

  expect(firstNameValue).to.equal(expectedFirstName);
  expect(lastNameValue).to.equal(expectedLastName);
  expect(emailValue).to.equal(expectedEmail);
  expect(passwordValue).to.equal(expectedPassword);
  expect(selectedGender).to.contain(expectedGender.includes("male") ? "male" : expectedGender);
  expect(selectedLanguages).to.have.members(expectedLanguages);
});

Then("user should click on Register Button", async function () {
  await basicControlsPage.registerbutton();
});