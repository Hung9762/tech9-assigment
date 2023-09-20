import { Locator, Page, expect } from '@playwright/test';
import { BaseUI } from './BaseUI.page';

export class Shipping extends BaseUI {
  protected firstName: Locator;
  protected lastName: Locator;
  protected address: Locator;
  protected city: Locator;
  protected state: Locator;
  protected zipcode: Locator;
  protected continue: Locator;
  protected signIn: Locator;
  protected referalCodeContinue: Locator;
  protected referealContinueWithOut: Locator;
  protected originalAddress: Locator;
  protected verifyAddressSave: Locator;
  protected shippingMethod: Locator;
  protected shippingContinue: Locator;
  protected subtotal: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('qa-first-name');
    this.lastName = page.getByTestId('qa-last-name');
    this.address = page.getByTestId('qa-address1');
    this.city = page.getByTestId('qa-city');
    this.state = page.getByRole('combobox').first();
    this.zipcode = page.getByTestId('qa-code');
    this.continue = page.getByTestId('qa-ship-continue');
    this.signIn = page.getByRole('link', { name: 'Sign in.' });
    this.referalCodeContinue = page.getByTestId('qa-referral-code-continue');
    this.referealContinueWithOut = page.getByTestId('qa-confirm-yes');
    this.originalAddress = page
      .locator('div')
      .filter({ hasText: /^74 E\. Richardson Ave\. Orlando,FL, 32818US$/ })
      .first();
    this.verifyAddressSave = page.getByTestId('qa-suggestion-save');
    this.shippingMethod = page.getByText('Standard $ 13.99 (3-5 business days)');
    this.shippingContinue = page.getByTestId('qa-ship-methods-continue');
    this.subtotal = page.getByTestId('qa-subtotal-value');
  }

  public async fillFirstNameAndLastName(firstName: string, lastName: string) {
    await this.fillElement(this.firstName, firstName);
    await this.fillElement(this.lastName, lastName);
  }

  public async fillAddress(address: string) {
    await this.fillElement(this.address, address);
  }

  public async fillCity(city: string) {
    await this.fillElement(this.city, city);
  }

  public async selectState(state: string) {
    await this.tapElement(this.state);
    await this.state.selectOption(state);
  }

  public async fillZipCode(zipcode: string) {
    await this.fillElement(this.zipcode, zipcode);
  }

  public async tapShippingContinue() {
    await this.tapElement(this.continue);
  }

  public async tapSignIn() {
    await this.tapElement(this.signIn);
  }

  public async tapReferealContinue() {
    await this.tapElement(this.referalCodeContinue);
    await this.tapElement(this.referealContinueWithOut);
  }

  public async tapVerifyAddress() {
    await this.tapElement(this.originalAddress);
    await this.tapElement(this.verifyAddressSave);
    await this.tapElement(this.continue);
  }

  public async tapShippingMethod() {
    await this.tapElement(this.shippingMethod);
    await this.tapElement(this.shippingContinue);
  }

  public async validaSubtotalPrice(subtotal: string) {
    let sub = await this.getElementText(this.subtotal);
    expect(sub).toContain(subtotal);
  }
}
