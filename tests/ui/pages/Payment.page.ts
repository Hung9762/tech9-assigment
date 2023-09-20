import { Page, Locator } from '@playwright/test';
import { BaseUI } from './BaseUI.page';

export class Payment extends BaseUI {
  protected creditCardNumber: Locator;
  protected creditFirstName: Locator;
  protected creditLastName: Locator;
  protected month: Locator;
  protected year: Locator;
  protected cvv: Locator;

  constructor(page: Page) {
    super(page);
    this.creditCardNumber = page.getByTestId('qa-pay-card');
    this.creditLastName = page.getByTestId('qa-card-last-name');
    this.creditFirstName = page.getByTestId('qa-card-first-name');
    this.month = page.getByTestId('qa-pay-month');
    this.year = page.getByTestId('qa-pay-year');
    this.cvv = page.getByTestId('qa-pay-code');
  }
  public async fillCreditCard(
    number: string,
    firstName: string,
    lastName: string,
    month: string,
    year: string,
    cvv: string
  ) {
    await this.fillElement(this.creditCardNumber, number);
    await this.fillElement(this.creditFirstName, firstName);
    await this.fillElement(this.creditLastName, lastName);
    await this.fillElement(this.month, month);
    await this.fillElement(this.year, year);
    await this.fillElement(this.cvv, cvv);
  }
}
