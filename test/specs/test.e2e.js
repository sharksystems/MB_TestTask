import LoginPage from '../pageobjects/login.page.js'
import DefaultUser from '../resources/defaultuser.js'
import RandomUser from '../resources/randomuser.js'
import InventoryPage from '../pageobjects/inventorypage.js'
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

// npx wdio run ./wdio.conf.js

describe('Smoke Test', () => {

    it('login with valid credentials', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.assertPasswordField();
        await loginPage.clickLoginSubmitBtn();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });
    it('login with invalid password', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();
        const randomUser = new RandomUser();

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
    it('login with invalid username', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();
        const randomUser = new RandomUser();

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
    it('logout', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await loginPage.clickMenuBtn();
        await loginPage.assertMenuItemsPresent();
        await loginPage.clickLogoutBtn();
        await loginPage.assertInputFieldsAreEmpty();
    });
    it('saving cart after logout', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();
        const inventoryPage = new InventoryPage();

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.clickAddToCartBtn();
        await loginPage.clickMenuBtn();
        await loginPage.assertMenuItemsPresent();
        await loginPage.clickLogoutBtn();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.clickLoginSubmitBtn();
        await inventoryPage.assertNumberOfItemsInCart();
    });
    it.only('sorting check', async () => {
        const loginPage = new LoginPage();
        const inventoryPage = new InventoryPage();
        const defaultUser = new DefaultUser();

        await loginPage.open();
        await loginPage.login(defaultUser.username, defaultUser.password);
        await inventoryPage.assertTitlesSortedCorrectlyZA();
        await inventoryPage.assertTitlesSortedCorrectlyAZ();
        await inventoryPage.assertPricesSortedCorrectlyAscending();
        await inventoryPage.assertPricesSortedCorrectlyDescending();
    });
})

