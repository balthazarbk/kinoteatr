import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-header mat-toolbar-row span')).getText() as Promise<string>;
  }

  getProductsPage(): Promise<string> {
    return element(by.css('app-home mat-toolbar span')).getText() as Promise<string>;
  }

  getTheFirstBuyButton() {
    return element.all(by.css('app-products button')).first();
  }

  getTheCartLink() {
    return element(by.id('cart-button'));
  }

  getTheCategoriesLink() {
    return element(by.css('#categories-button'));
  }

  getTheScifiCategoryLink() {
    return element(by.css('#sci-fi-category-button'));
  }

  getTitleTextOfCart(): Promise<string> {
    return element(by.css('app-cart mat-toolbar span')).getText() as Promise<string>;
  }

  getFirstItemInCart(): Promise<number> {
    return element.all(by.css('app-item')).count() as Promise<number>;
  }

  getTheSearchInput() {
    return element(by.css('app-search input'));
  }

  getTheTitleOfTheFirstResult(): Promise<string> {
    return element(by.css('app-products mat-card-title')).getText() as Promise<string>;
  }

  getAllBuyButton() {
    return element.all(by.css('app-products button'));
  }

  getTheProceedToCheckoutButton() {
    return element(by.id('proceed-to-checkout-button'));
  }

  findSelectYourPaymentMethodText(): Promise<string> {
    return element.all(by.css('.customer-info mat-toolbar span')).first().getText() as Promise<string>;
  }
}
