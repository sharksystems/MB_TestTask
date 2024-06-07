import BasePage from "./basepage.js";
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

class CheckoutSuccessPage extends BasePage {

    get checkoutCompleteMsgLogo() {
        return $("img.pony_express");
    }
    get checkoutCompleteMsgTitle() {
        return $("h2.complete-header");
    }
    get checkoutCompleteMsgText() {
        return $("div.complete-text");
    }
    get checkoutBackHomeBtn() {
        return $("#back-to-products");
    }

    async clickCheckoutBackHomeBtn() {
        await this.checkoutBackHomeBtn.click();
        await browser.pause(500);
    }
    async assertCheckoutCompleteMsgIsDisplayed() {
        await wdioExpect(this.checkoutCompleteMsgLogo).toBeDisplayed();
        await wdioExpect(this.checkoutCompleteMsgTitle).toBeDisplayed();
        await wdioExpect(this.checkoutCompleteMsgText).toBeDisplayed();
    }
    async assertUserIsBackOnInventoryPage() {
        await wdioExpect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    }
}
export default CheckoutSuccessPage;