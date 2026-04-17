// tests/hybrid/userSignupAndLogin.hybrid.spec.ts
// API + UI hybrid test using Playwright
// @hybrid tag
// API used for setup, UI used for validation

import { test, expect } from '@playwright/test';
import ApiHelpers from '../../utils/apiHelpers';
import SignupLoginPage from '../../pages/SignupLoginPage';

test.describe('@hybrid User Signup and Login', () => {

  test('should create user via API and login via UI', async ({ page }) => {

    // ✅ API SETUP (no browser involved)
    const apiContext = await ApiHelpers.createApiContext();

    const email = ApiHelpers.generateRandomEmail();
    const password = 'Hybrid@1234';

    await ApiHelpers.createUser(apiContext, {
      name: 'Hybrid User',
      email,
      password,
    });

    await apiContext.dispose();

    // ✅ UI VALIDATION
    const signupLoginPage = new SignupLoginPage(page);

    // Navigate explicitly to login page
    await page.goto('/login');

    await signupLoginPage.login(email, password);

    // ✅ Validate logged-in state
    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
  });

});