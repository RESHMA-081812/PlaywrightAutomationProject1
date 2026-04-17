// pages/SignupLoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export default class SignupLoginPage {
  private readonly page: Page;

  // Signup (step 1)
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;

  // Signup (full form)
  private readonly passwordInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;

  // Signup complete
  private readonly continueButton: Locator;

  // ✅ Login (UI validation)
  private readonly loginEmailInput: Locator;
  private readonly loginPasswordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Signup start
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    // Signup form
    this.passwordInput = page.locator('[data-qa="password"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');

    // Continue
    this.continueButton = page.locator('[data-qa="continue-button"]');

    // ✅ Login
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
  }

  // ✅ Signup flow
  async startSignup(name: string, email: string): Promise<void> {
    await expect(this.signupNameInput).toBeVisible();
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async completeSignupForm(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();

    await this.passwordInput.fill('Password@123');
    await this.firstNameInput.fill('Test');
    await this.lastNameInput.fill('User');
    await this.addressInput.fill('Test Address');
    await this.countrySelect.selectOption('India');
    await this.stateInput.fill('Karnataka');
    await this.cityInput.fill('Bangalore');
    await this.zipcodeInput.fill('560001');
    await this.mobileNumberInput.fill('9999999999');

    await this.createAccountButton.click();
  }

  async continueAfterSignup(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

  // ✅ Login flow (THIS FIXES THE RED LINE)
  async login(email: string, password: string): Promise<void> {
    await expect(this.loginEmailInput).toBeVisible();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
  
// ✅ Verification method (FIXES RED LINE)
async verifySignupLoginPageLoaded(): Promise<void> {
  await expect(this.loginEmailInput).toBeVisible();
}

}
``