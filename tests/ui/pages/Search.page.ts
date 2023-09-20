import { Locator, Page, expect } from '@playwright/test';
import { BaseUI } from './BaseUI.page';

export class Search extends BaseUI {
  protected searchBox: Locator;
  protected firstProduct: Locator;
  protected addedProductPopUp: Locator;
  protected addedProductDismiss: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.getByTestId('qa-search-input');
    this.firstProduct = page.getByRole('button', { name: 'Add to Cart' }).first();
    this.addedProductPopUp = page.getByTestId('qa-toast');
    this.addedProductDismiss = page.getByRole('button', { name: 'dismiss' });
  }

  public async searchProduct(product: string) {
    await this.fillElement(this.searchBox, product);
  }

  public async addFirstProduct() {
    await this.tapElement(this.firstProduct);
  }

  public async validateAddedProductPopUp(text: string) {
    let popMessage = await this.getElementText(this.addedProductPopUp);
    expect(popMessage).toContain(text);
  }
}
