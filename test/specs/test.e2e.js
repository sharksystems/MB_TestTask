import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import DefaultUser from '../resources/defaultuser.js'
import RandomUser from '../resources/randomuser.js'
import InventoryPage from '../pageobjects/inventorypage.js'

// npx wdio run ./wdio.conf.js

describe('Smoke Test', () => {

    xit('login with valid credentials', async () => {
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
    })
    xit('login with invalid password', async () => {
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
    })
    xit('login with invalid username', async () => {
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
    })
    xit('logout', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.clickLoginSubmitBtn();
        await loginPage.clickMenuBtn();
        await loginPage.assertMenuItemsPresent();
        await loginPage.clickLogoutBtn();
        await loginPage.assertInputFieldsAreEmpty();
    })
    xit('saving cart after logout', async () => {
        const loginPage = new LoginPage();
        const defaultUser = new DefaultUser();
        const inventoryPage = new InventoryPage();

        await loginPage.open();
        await loginPage.clickUsernameInputField();
        await loginPage.enterUsername(defaultUser.username);
        await loginPage.clickPasswordInputField();
        await loginPage.enterPassword(defaultUser.password);
        await loginPage.clickLoginSubmitBtn();
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
    })
})

