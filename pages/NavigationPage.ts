import { Page } from '@playwright/test';

export class NavigationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get homeLink() {
    return this.page.getByRole('link', { name: /^Home$/ });
  }

  private get productsLink() {
    return this.page.getByRole('link', { name: 'Products' });
  }

  private get cartLink() {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  private get signupLoginLink() {
    return this.page.getByRole('link', { name: 'Signup / Login' });
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToProducts(): Promise<void> {
    
  await this.productsLink.scrollIntoViewIfNeeded();
  await this.productsLink.click({ force: true });

  }

  async goToCart(): Promise<void> {
    
await this.cartLink.scrollIntoViewIfNeeded();
  await this.cartLink.click({ force: true });

  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }
}
