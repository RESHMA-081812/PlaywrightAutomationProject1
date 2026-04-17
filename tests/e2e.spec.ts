import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import SignupLoginPage from '../pages/SignupLoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { NavigationPage } from '../pages/NavigationPage';
import * as fs from 'fs';
import * as path from 'path';


// Shared instances across tests
let page: Page;
let homePage: HomePage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let cartPage: CartPage;
let signupLoginPage: SignupLoginPage;
let checkoutPage: CheckoutPage;
let orderConfirmationPage: OrderConfirmationPage;
let navigationPage: NavigationPage;

// ✅ Store user created during signup
let userEmail: string;
let userName: string;

// Screenshot helper
async function takeScreenshot(testInfo: any, folder: string): Promise<void> {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const screenshotPath = path.join(
    folder,
    `${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`
  );

  await page.screenshot({ path: screenshotPath, fullPage: true });
}

test.describe.serial('Automation Exercise E2E Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);
    signupLoginPage = new SignupLoginPage(page);
    checkoutPage = new CheckoutPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
    navigationPage = new NavigationPage(page);

    await page.goto('/');
    await homePage.verifyHomePageLoaded();
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === 'passed') {
      await takeScreenshot(testInfo, 'successScreenshots');
    } else if (testInfo.status === 'failed') {
      await takeScreenshot(testInfo, 'failureScreenshots');
    }
  });

  // ✅ HOME
  test('@smoke - Verify home page loads correctly', async () => {
    const count = await homePage.getFeaturedProductCount();
    expect(count).toBeGreaterThan(0);
  });

  // ✅ PRODUCTS
  test('@smoke - Navigate to products page', async () => {
    await homePage.navigateToProducts();
    await productsPage.verifyProductsPageLoaded();
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
  });

  test('@regression - Search for a product', async () => {
    await navigationPage.goToProducts();
    await productsPage.searchProduct('Blue Top');
    const names = await productsPage.getProductNames();
    expect(names.some(name => name.includes('Blue Top'))).toBeTruthy();
  });

  // ✅ PRODUCT DETAILS
  test('@regression - View product details', async () => {
    await navigationPage.goToProducts();
    await productsPage.clickProductByIndex(0);
    await productDetailsPage.verifyProductDetailsLoaded();
    expect(await productDetailsPage.getProductName()).toBeTruthy();
  });

  // ✅ CART
  test('@regression - Add product to cart', async () => {
    await navigationPage.goToProducts();
    await productsPage.clickProductByIndex(0);
    await productDetailsPage.setQuantity(2);
    await productDetailsPage.addToCart();
    await productDetailsPage.viewCart();

    await cartPage.verifyCartPageLoaded();
    expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);
  });

  // ✅ CHECKOUT → LOGIN REQUIRED
  test('@regression - View cart and proceed to checkout', async () => {
    await navigationPage.goToCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.proceedToCheckoutAndGoToLogin();
    await signupLoginPage.verifySignupLoginPageLoaded();
  });

  // ✅ SIGNUP (NO STATIC CREDENTIALS)
  test('@regression - User signup flow', async () => {
  const timestamp = Date.now();
  userName = `TestUser_${timestamp}`;
  userEmail = `user_${timestamp}@example.com`;

  // ✅ Correct AutomationExercise flow
  await signupLoginPage.startSignup(userName, userEmail);
  await signupLoginPage.completeSignupForm();
  await signupLoginPage.continueAfterSignup();
});
  // ✅ FINAL CHECKOUT (RE‑ENTER CART AFTER LOGIN)
  test('@regression - Complete checkout flow', async () => {
    await navigationPage.goToCart();
    await cartPage.verifyCartPageLoaded();

    // ✅ MUST checkout again after login
    await cartPage.proceedToCheckoutAndGoToLogin();

    await checkoutPage.verifyCheckoutPageLoaded();
    await checkoutPage.placeOrder();

    await checkoutPage.fillPaymentDetails(
      userName,
      '4111111111111111',
      '123',
      '12',
      '2030'
    );

    await checkoutPage.payAndConfirmOrder();

    await orderConfirmationPage.verifyOrderConfirmationLoaded();
    const message = await orderConfirmationPage.getOrderPlacedMessage();
    expect(message).toContain('Order Placed!');
  });

  // ✅ NAVIGATION
  test('@smoke - Header navigation validation', async () => {
    
    await navigationPage.goToProducts();
    await productsPage.verifyProductsPageLoaded();
    await navigationPage.goToCart();
    await cartPage.verifyCartPageLoaded();
  });

});
