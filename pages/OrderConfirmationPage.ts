import { Page } from '@playwright/test';

export class OrderConfirmationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get orderPlacedMessage() { return this.page.locator('[data-qa="order-placed"]'); }
  private get continueButton() { return this.page.locator('[data-qa="continue-button"]'); }

  // Methods
  async verifyOrderConfirmationLoaded(): Promise<void> {
    await this.page.waitForURL('**/payment_done/**');
    await this.orderPlacedMessage.waitFor({ state: 'visible' });
  }

  async getOrderPlacedMessage(): Promise<string> {
    return await this.orderPlacedMessage.textContent() || '';
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}