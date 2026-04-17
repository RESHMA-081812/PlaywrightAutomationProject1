// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly proceedToCheckoutButton: Locator;
  private readonly registerLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_info tbody tr');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout', {
      exact: true,
    });

    // Appears ONLY if user is NOT logged in
    this.registerLoginLink = page.getByRole('link', {
      name: /Register \/ Login/i,
    });
  }

  /**
   * ✅ Cart page can be valid with OR without items
   * (After checkout, cart becomes empty – this is correct behavior)
   */
  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/view_cart/);

    const itemCount = await this.cartItems.count();
    if (itemCount > 0) {
      await expect(this.cartItems.first()).toBeVisible();
    }
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * ✅ Handles both logged-in and logged-out users
   */
  async proceedToCheckoutAndGoToLogin(): Promise<void> {
    await this.proceedToCheckoutButton.click();

    // If user is NOT logged in, modal appears
    if (await this.registerLoginLink.isVisible().catch(() => false)) {
      await this.registerLoginLink.click();
    }

    // If user IS logged in, modal does not appear – continue normally
  }
}