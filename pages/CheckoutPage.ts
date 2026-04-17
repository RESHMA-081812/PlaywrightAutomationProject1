import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get placeOrderButton() { return this.page.locator('.check_out'); }
  private get nameOnCardInput() { return this.page.locator('[data-qa="name-on-card"]'); }
  private get cardNumberInput() { return this.page.locator('[data-qa="card-number"]'); }
  private get cvcInput() { return this.page.locator('[data-qa="cvc"]'); }
  private get expiryMonthInput() { return this.page.locator('[data-qa="expiry-month"]'); }
  private get expiryYearInput() { return this.page.locator('[data-qa="expiry-year"]'); }
  private get payAndConfirmButton() { return this.page.locator('[data-qa="pay-button"]'); }

  // Methods
  async verifyCheckoutPageLoaded(): Promise<void> {
    await this.page.waitForURL('**/checkout');
    await this.placeOrderButton.waitFor({ state: 'visible' });
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails(name: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string): Promise<void> {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(expiryMonth);
    await this.expiryYearInput.fill(expiryYear);
  }

  async payAndConfirmOrder(): Promise<void> {
    await this.payAndConfirmButton.click();
  }
}