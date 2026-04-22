import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private readonly page: Page;

  // Locators
  private readonly productsList: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsList = page.locator('.features_items .col-sm-4');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productNames = page.locator('.productinfo p');
  }

  async verifyProductsPageLoaded(): Promise<void> {
    await this.page.waitForURL('**/products');
    await expect(this.productsList.first()).toBeVisible();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click({ force: true });

  }

  async getProductCount(): Promise<number> {
    return this.productsList.count();
  }

  /**
   * ✅ Best-practice: Click "View Product" explicitly
   */
  async clickProductByIndex(index: number): Promise<void> {
    const productCard = this.productsList.nth(index);

    const viewProductLink = productCard.locator('a[href^="/product_details"]');
    await expect(viewProductLink).toBeVisible();

    await viewProductLink.click();
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }
}
``