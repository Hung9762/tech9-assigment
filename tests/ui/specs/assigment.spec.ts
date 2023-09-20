import { Page, test, Dialog } from '@playwright/test';
import { Login } from '../pages/Login.page';
import { Search } from '../pages/Search.page';
import { Cart } from '../pages/Cart.page';
import { Shipping } from '../pages/Shipping.page';
import { Payment } from '../pages/Payment.page';

test.describe('Code Assigment', () => {
  let email = process.env.USER_EMAIL!;
  let password = process.env.USER_PASS!;
  let cardNumber = process.env.CARD_NUMBER!;
  let firstName = process.env.FIRST_NAME!;
  let lastName = process.env.LAST_NAME!;
  let month = process.env.MONTH!;
  let year = process.env.YEAR!;
  let cvv = process.env.CVV!;
  let login: Login;
  let search: Search;
  let cart: Cart;
  let shipping: Shipping;
  let payment: Payment;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    search = new Search(page);
    cart = new Cart(page);
    shipping = new Shipping(page);
    payment = new Payment(page);
  });

  test('Validate and order can be checkout', async ({ page }) => {
    test.slow();
    await login.goTo('/us/en');
    await login.tapSignIn();
    await page.waitForLoadState();
    await login.fillUserEmail(email);
    await login.fillUserPassword(password);
    await login.tapLogin();
    await login.account();
    await search.searchProduct('Angelica Essential Oil');
    await search.addFirstProduct();
    await search.validateAddedProductPopUp('Added to Cart Successfully');
    await cart.addToShippingCar();
    await cart.dismissShippingNotice();
    await cart.tapCheckout();
    await page.waitForLoadState();
    await shipping.tapSignIn();
    await shipping.tapReferealContinue();
    await page.waitForLoadState();
    await shipping.validaSubtotalPrice('66.45');
    await shipping.fillFirstNameAndLastName('Alex', 'Test');
    await shipping.fillAddress('74 E. Richardson Ave.');
    await shipping.fillCity('Orlando');
    await shipping.selectState('FL');
    await shipping.fillZipCode('32818');
    await shipping.tapShippingContinue();
    await shipping.tapVerifyAddress();
    await shipping.tapShippingMethod();
    await payment.fillCreditCard(cardNumber, firstName, lastName, month, year, cvv);
  });
});
