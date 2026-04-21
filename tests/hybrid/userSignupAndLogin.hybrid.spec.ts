import { test, expect } from '@playwright/test';
import ApiHelpers from '../../utils/apiHelpers';
import SignupLoginPage from '../../pages/SignupLoginPage';

test.describe('@hybrid User Signup and Login', () => {

  // ✅ Skip entire hybrid suite in CI
  test.skip(!!process.env.CI, 'Hybrid tests skipped in CI');

  test('should create user via API and login via UI', async ({ page }) => {

    const apiContext = await ApiHelpers.createApiContext();

    const email = ApiHelpers.generateRandomEmail();
    const password = 'Hybrid@1234';

    await ApiHelpers.createUser(apiContext, {
      name: 'Hybrid User',
      email,
      password,
    });

    await apiContext.dispose();

    const signupLoginPage = new SignupLoginPage(page);

    await page.goto('/login');
    await signupLoginPage.login(email, password);

    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
  });

});
