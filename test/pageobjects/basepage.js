import { browser } from '@wdio/globals'


export default class BasePage {

    get cartBtn () {
        return $('#shopping_cart_container');
    }
    get cartBtnBadge () {
        return $('span.shopping_cart_badge');
    }
    get menuBtn () {
        return $('#react-burger-menu-btn');
    }
    get closeMenuBtn () {
        return $('#react-burger-cross-btn');
    }
    get logoutBtn () {
        return $('#logout_sidebar_link');
    }
    get menuItems () {
        return $$('nav.bm-item-list>a');
    }
    
    async clickCartBtn () {
        await this.cartBtn.click();
    }
    async clickMenuBtn () {
        await this.menuBtn.click();
    }
    async clickCloseMenuBtn () {
        await this.logoutBtn.isClickable(1000);
        await this.closeMenuBtn.click();
    }
    async clickLogoutBtn () {
        await this.logoutBtn.isClickable(1000);
        await this.logoutBtn.click();
    }
    async assertMenuItemsPresent () {
        await expect(this.menuItems).toBeElementsArrayOfSize(4);
    }
    
    open (path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}
