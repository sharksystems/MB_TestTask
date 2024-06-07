import BasePage from "./basepage.js";
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

class CheckoutOverviewPage extends BasePage {

    get checkoutItemTitle() {
        return $('div.inventory_item_name');
    }
    get checkoutItemDescription() {
        return $('div.inventory_item_desc');
    }
    get checkoutItemPrice() {
        return $('div.inventory_item_price');
    }
    get checkoutFinishBtn() {
        return $('#finish');
    }
    get totalItemPrice() {
        return $('div.summary_subtotal_label');
    }
    get checkoutCancelBtn() {
        return $('#cancel');
    }

    async clickFinishCheckoutBtn() {
        await this.checkoutFinishBtn.click();
        await browser.pause(500);
    }
    async getCheckoutItemTitle() {
        return await this.checkoutItemTitle.getText();
    }
    async getCheckoutItemDescription() {
        return await this.checkoutItemDescription.getText();
    }
    async getCheckoutItemPrice() {
        return await this.checkoutItemPrice.getText();
    }
    async getTotalItemPrice() {
        return await this.totalItemPrice.getText();
    }
}
export default CheckoutOverviewPage;