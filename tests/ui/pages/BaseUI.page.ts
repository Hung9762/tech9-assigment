import { Page, Locator, expect } from '@playwright/test';

export class BaseUI {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async goToURL(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }

  protected async fillElement(element: Locator, text: string) {
    await element.fill(text);
  }

  protected async tapElement(element: Locator) {
    await element.click();
  }

  protected async tap(element: Locator, url: string) {
    await element.click({ force: true });
  }

  protected async handleAlert(alert: Locator) {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.type()).toContain('alert');
      console.log(dialog.message);
      await dialog.dismiss();
    });
    await this.tapElement(alert);
  }

  protected async getElementText(element: Locator) {
    return await element.innerText();
  }

  protected async scrollToView(element: Locator) {
    await element.scrollIntoViewIfNeeded();
  }

  protected async waitForPageToload() {
    await this.page.waitForLoadState();
  }
}
