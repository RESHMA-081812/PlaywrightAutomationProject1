import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // ✅ Stable, real DOM locators
  private readonly header: Locator;
  private readonly logo: Locator;
  private readonly navMenu: Locator;
  private readonly featuresSection: Locator;

  private readonly productsLink: Locator;
  private readonly cartLink: Locator;
  private readonly signupLoginLink: Locator;
  private readonly contactUsLink: Locator;

  private readonly featuredProducts: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & navigation (REAL selectors for automationexercise.com)
    this.header = page.locator('#header');
    this.logo = page.locator('img[src*="logo.png"]');
    this.navMenu = page.locator('.shop-menu');

    // Navigation links
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');

    // Product section
    this.featuresSection = page.locator('h2', { hasText: 'Features Items' });
    this.featuredProducts = page.locator('.features_items .col-sm-4');
  }

  // ✅ Best way to verify Home page load
  async verifyHomePageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.header).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.navMenu).toBeVisible();
    await expect(this.featuresSection).toBeVisible();
  }

  async navigateToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async navigateToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async navigateToContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async getFeaturedProductCount(): Promise<number> {
    return this.featuredProducts.count();
  }

  async clickFirstFeaturedProduct(): Promise<void> {
    await this.featuredProducts.first().locator('a').click();
  }
}
``