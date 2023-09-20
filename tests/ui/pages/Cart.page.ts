import { Locator, Page } from '@playwright/test';
import { BaseUI } from './BaseUI.page';

export class Cart extends BaseUI {
  protected shippingNotice: Locator;
  protected viewCartButton: Locator;
  protected checkoutButton: Locator;
  protected continueWithoutReferral: Locator;
  protected continueReferralButton: Locator;

  constructor(page: Page) {
    super(page);
    this.viewCartButton = page.getByTestId('qa-cartcheckout');
    this.shippingNotice = page.getByRole('button', { name: 'I understand' });
    this.checkoutButton = page.getByTestId('qa-cart-checkout');
    this.continueWithoutReferral = page.getByTestId('qa-confirm-yes');
    this.continueReferralButton = page.getByTestId('qa-referral-code-continue');
  }

  public async addToShippingCar() {
    await this.tapElement(this.viewCartButton);
  }

  public async dismissShippingNotice() {
    await this.tapElement(this.shippingNotice);
  }

  public async tapCheckout() {
    await this.scrollToView(this.checkoutButton);
    await this.tapElement(this.checkoutButton);
  }
}
