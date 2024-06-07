import BasePage from './basepage.js';
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

class CartPage extends BasePage {

    get checkoutBtn() {
        return $('#checkout')
    }
    get removeFromCartBtn() {
        return $("//button[contains(.,'Remove')]");
    }
    get continueShoppingBtn() {
        return $('#continue-shopping');
    }
    get cartProductTitle() {
        return $('div.inventory_item_name');
    }
    get cartProductDescription() {
        return $('div.inventory_item_desc')
    }
    get cartProductPrice() {
        return $('div.inventory_item_price');
    }
    get cartIsEmptyErrorMsg() {
        return $("//div[contains(.,'Cart is Empty')]")
    }

    async clickRemoveFromCartBtn() {
        await this.removeFromCartBtn.click();
    }
    async clickCheckoutBnt() {
        await this.checkoutBtn.click();
    }
    async getProductTitle() {
        return await this.cartProductTitle.getText();
    }
    async getProductDescription() {
        return await this.cartProductDescription.getText();
    }
    async getProductPrice() {
        return await this.cartProductPrice.getText();
    }
    async assertEmptyCartErrorMsgIsDisplayed() {
        await wdioExpect(this.cartIsEmptyErrorMsg).toBeDisplayed();
        await wdioExpect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    }
}
export default CartPage;