import { Page } from '@playwright/test';

export class ProductDetailsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get productName() { return this.page.locator('.product-information h2'); }
  private get productPrice() { return this.page.locator('.product-information span span'); }
  private get addToCartButton() { return this.page.locator('.cart'); }
  private get quantityInput() { return this.page.locator('#quantity'); }
  private get viewCartLink() { return this.page.locator('u').filter({ hasText: 'View Cart' }); }

  // Methods
  async verifyProductDetailsLoaded(): Promise<void> {
    await this.page.waitForURL('**/product_details/**');
    await this.productName.waitFor({ state: 'visible' });
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}