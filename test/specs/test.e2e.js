import LoginPage from '../pageobjects/login.page.js'
import DefaultUser from '../resources/defaultuser.js'
import RandomUser from '../resources/randomuser.js'
import InventoryPage from '../pageobjects/inventorypage.js'
import CartPage from '../pageobjects/cartpage.js'
import CheckoutPage from '../pageobjects/checkoutpage.js'
import CheckoutOverviewPage from '../pageobjects/checkoutoverviewpage.js'
import CheckoutSuccessPage from '../pageobjects/checkoutsuccesspage.js'

import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

// npx wdio run ./wdio.conf.js

describe('Smoke Test', () => {
    let defaultUser;
    let randomUser;
    let inventoryPage;
    let loginPage;
    let cartPage;
    let checkoutPage;
    let checkoutOverviewPage;
    let checkoutSuccessPage;

    beforeEach(async function () {
        defaultUser = new DefaultUser();
        randomUser = new RandomUser();
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();
        cartPage = new CartPage();
        checkoutPage = new CheckoutPage();
        checkoutOverviewPage = new CheckoutOverviewPage();
        checkoutSuccessPage = new CheckoutSuccessPage();
    })

    it('1. login with valid credentials', async () => {

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.assertPasswordField();
        await loginPage.clickLoginSubmitBtn();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });
    it('2. login with invalid password', async () => {

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(randomUser.password);
        await loginPage.clickLoginSubmitBtn();
        await loginPage.assertErrorHighlightsVisible();
        await loginPage.assertErrorIconsVisible();
        await loginPage.assertWrongCredentialsMsgVisible();
    });
    it('3. login with invalid username', async () => {

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(randomUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.clickLoginSubmitBtn();
        await loginPage.assertErrorHighlightsVisible();
        await loginPage.assertErrorIconsVisible();
        await loginPage.assertWrongCredentialsMsgVisible();
    });
    it('bonus. login with empty fields', async () => {

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.clickPasswordInputField();
        await loginPage.clickLoginSubmitBtn();
        await loginPage.assertErrorHighlightsVisible();
        await loginPage.assertErrorIconsVisible();
        await loginPage.assertNoUsernameMsgVisible();
    });
    it('4. logout', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await loginPage.clickMenuBtn();
        await loginPage.assertMenuItemsPresent();
        await loginPage.clickLogoutBtn();
        await loginPage.assertInputFieldsAreEmpty();
    });
    it('5. saving cart after logout', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        await loginPage.clickMenuBtn();
        await loginPage.assertMenuItemsPresent();
        await loginPage.clickLogoutBtn();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.assertNumberOfItemsInCartBtn();
        await inventoryPage.clickCartBtn();
        let itemTitleOnCartPage = await cartPage.getProductTitle();
        let itemDescriptionOnCartPage = await cartPage.getProductDescription();
        let itemPriceOnCartPage = await cartPage.getProductPrice();
        chaiExpect(itemTitleOnCartPage).to.equal(inventoryPage.addedProductTitle);
        chaiExpect(itemDescriptionOnCartPage).to.equal(inventoryPage.addedProductDescription);
        chaiExpect(itemPriceOnCartPage).to.equal(inventoryPage.addedProductPrice);
        await cartPage.clickRemoveFromCartBtn();

    });
    it('6. sorting check', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.assertTitlesSortedCorrectlyZA();
        await inventoryPage.assertTitlesSortedCorrectlyAZ();
        await inventoryPage.assertPricesSortedCorrectlyAscending();
        await inventoryPage.assertPricesSortedCorrectlyDescending();
    });
    it('7. footer links check', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.clickTwitterSocialBtn();
        await inventoryPage.assertTwitterLinkOpened();
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
        await inventoryPage.clickFacebookSocialBtn();
        await inventoryPage.assertFacebookLinkOpened();
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
        await inventoryPage.clickLinkedInSocialBtn();
        await inventoryPage.assertLinkedInLinkOpened();
    });
    it('8. positive checkout test', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Bike Light');
        await inventoryPage.assertNumberOfItemsInCartBtn();
        await inventoryPage.clickCartBtn();

        let itemTitleOnCartPage = await cartPage.getProductTitle();
        let itemDescriptionOnCartPage = await cartPage.getProductDescription();
        let itemPriceOnCartPage = await cartPage.getProductPrice();
        chaiExpect(itemTitleOnCartPage).to.equal(inventoryPage.addedProductTitle);
        chaiExpect(itemDescriptionOnCartPage).to.equal(inventoryPage.addedProductDescription);
        chaiExpect(itemPriceOnCartPage).to.equal(inventoryPage.addedProductPrice);
        await cartPage.clickCheckoutBnt();

        await checkoutPage.enterFirstName(randomUser.firstname);
        await checkoutPage.enterLastName(randomUser.lastname);
        await checkoutPage.enterZipCode(randomUser.zipcode);
        await checkoutPage.clickContinueBtn();

        let itemTitleOnCheckoutPage = await checkoutOverviewPage.getCheckoutItemTitle();
        let itemDescriptionOnCheckoutPage = await checkoutOverviewPage.getCheckoutItemDescription();
        let itemPriceOnCheckoutPage = await checkoutOverviewPage.getCheckoutItemPrice();
        let itemTotalPrice = await checkoutOverviewPage.getTotalItemPrice();
        chaiExpect(itemTitleOnCheckoutPage).to.equal(inventoryPage.addedProductTitle);
        chaiExpect(itemDescriptionOnCheckoutPage).to.equal(inventoryPage.addedProductDescription);
        chaiExpect(itemPriceOnCheckoutPage).to.equal(inventoryPage.addedProductPrice);
        chaiExpect(itemTotalPrice).to.equal('Item total: ' + inventoryPage.addedProductPrice);
        await checkoutOverviewPage.clickFinishCheckoutBtn();

        await checkoutSuccessPage.assertCheckoutCompleteMsgIsDisplayed();
        await checkoutSuccessPage.clickCheckoutBackHomeBtn();
        await checkoutSuccessPage.assertUserIsBackOnInventoryPage();
        await checkoutSuccessPage.assertNoItemsDisplayedOnCartBtn();
    });
    it('bonus. checkout with invalid data', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Fleece Jacket');
        await inventoryPage.clickCartBtn();

        await cartPage.clickCheckoutBnt();

        await checkoutPage.clickContinueBtn();
        await checkoutPage.assertErrorHighlightsVisible();
        await checkoutPage.assertErrorIconsVisible();

        await checkoutPage.enterEmptyFirstName(defaultUser.lastname, defaultUser.zipcode);
        await checkoutPage.clickContinueBtn();
        await checkoutPage.assertErrorHighlightsVisible();
        await checkoutPage.assertErrorIconsVisible();

        await checkoutPage.enterEmptyLastName(defaultUser.firstname, defaultUser.zipcode);
        await checkoutPage.clickContinueBtn();
        await checkoutPage.assertErrorHighlightsVisible();
        await checkoutPage.assertErrorIconsVisible();

        await checkoutPage.enterEmptyZipCode(defaultUser.firstname, defaultUser.lastname);
        await checkoutPage.clickContinueBtn();
        await checkoutPage.assertErrorHighlightsVisible();
        await checkoutPage.assertErrorIconsVisible();
    })
    it('9. checkout with empty cart', async () => {

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);

        await inventoryPage.clickCartBtn();
        await cartPage.clickCheckoutBnt();
        await cartPage.assertEmptyCartErrorMsgIsDisplayed();
    });
})

