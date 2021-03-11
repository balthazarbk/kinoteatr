import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Kinoteatr');
  });

  it('should render the page Products', () => {
    page.navigateTo();
    expect(page.getProductsPage()).toEqual('Products:');
  });

  it('should add items to the cart by different pages, click on the Cart link in header nav and check if x items have been added', () => {
    page.navigateTo();
    const TheBuyButton = page.getTheFirstBuyButton();
    const TheCartLink = page.getTheCartLink();
    const TheScifiCategoryLink = page.getTheScifiCategoryLink();
    const TheCategoriesLink = page.getTheCategoriesLink();
    TheBuyButton.click();
    TheCartLink.click();
    expect(page.getTitleTextOfCart()).toEqual('Cart:');
    browser.sleep(500);
    expect(page.getFirstItemInCart()).toBe(1);
    browser.sleep(500);
    TheCategoriesLink.click();
    browser.sleep(500);
    TheScifiCategoryLink.click();
    browser.sleep(500);
    TheBuyButton.click();
    TheCartLink.click();
    browser.sleep(500);
    expect(page.getFirstItemInCart()).toBe(2);
  });

  it('should search for Modern Times, find it, buy it and check if it was added to the cart', () => {
    page.navigateTo();
    const theSearchInput = page.getTheSearchInput();
    const theBuyButton = page.getTheFirstBuyButton();
    theSearchInput.sendKeys('Modern' + protractor.Key.ENTER);
    browser.sleep(500);
    expect(page.getTheTitleOfTheFirstResult()).toEqual('Modern Times');
    browser.sleep(500);
    theBuyButton.click();
    const TheCartLink = page.getTheCartLink();
    TheCartLink.click();
    browser.sleep(500);
    expect(page.getFirstItemInCart()).toBe(1);
  });

  it('should add three items to the cart, go to see the content of the cart, click to checkout and check if there is the text Select your payment method: in the page', () => {
    page.navigateTo();
    const buyButtonList = page.getAllBuyButton();
    const TheCartLink = page.getTheCartLink();
    buyButtonList.get(0).click();
    buyButtonList.get(1).click();
    buyButtonList.get(2).click();
    TheCartLink.click();
    browser.sleep(500);
    const checkoutButton = page.getTheProceedToCheckoutButton();
    checkoutButton.click();
    expect(page.findSelectYourPaymentMethodText()).toEqual('Select your payment method:');
  });

  afterEach(async () => {
    // Don't (!) assert that there are errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.OFF,
    } as logging.Entry));
  });
});
