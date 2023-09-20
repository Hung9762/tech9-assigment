import { Page, Locator, expect } from '@playwright/test';
import { BaseUI } from './BaseUI.page';

export class Login extends BaseUI {
  protected signInButton: Locator;
  protected userEmail: Locator;
  protected userEmailContinueButton: Locator;
  protected userPassword: Locator;
  protected userSignInButton: Locator;
  protected myAccount: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.getByTestId('qa-myaccount');
    this.userEmail = page.getByPlaceholder('Email Address or Member Number or Username');
    this.userEmailContinueButton = page.getByRole('button', { name: 'Continue' });
    this.userPassword = page.getByPlaceholder('Password');
    this.userSignInButton = page.locator('#login-btn');
    this.myAccount = page.getByTestId('qa-myaccount');
  }

  public async goTo(url: string) {
    await this.goToURL(url);
  }

  public async tapSignIn() {
    await this.tapElement(this.signInButton);
  }

  public async fillUserEmail(email: string) {
    await this.fillElement(this.userEmail, email);
    await this.tapElement(this.userEmailContinueButton);
  }

  public async fillUserPassword(pass: string) {
    await this.fillElement(this.userPassword, pass);
  }

  public async tapLogin() {
    await this.tapElement(this.userSignInButton);
  }

  public async account() {
    await this.myAccount.waitFor({ state: 'visible' });
    await expect(this.myAccount).toBeVisible();
  }
}
