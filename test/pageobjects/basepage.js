import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';


export default class BasePage {

    get cartBtn() {
        return $('#shopping_cart_container');
    }
    get cartBtnBadge() {
        return $('span.shopping_cart_badge');
    }
    get menuBtn() {
        return $('#react-burger-menu-btn');
    }
    get closeMenuBtn() {
        return $('#react-burger-cross-btn');
    }
    get logoutBtn() {
        return $('#logout_sidebar_link');
    }
    get menuItems() {
        return $$('nav.bm-item-list>a');
    }
    get twitterSocialBtn() {
        return $('li.social_twitter');
    }
    get facebookSocialBtn() {
        return $('li.social_facebook');
    }
    get linkedinSocialBtn() {
        return $('li.social_linkedin');
    }

    async clickCartBtn() {
        await this.cartBtn.click();
    }
    async clickMenuBtn() {
        await this.menuBtn.click();
        await browser.pause(500);
    }
    async clickCloseMenuBtn() {
        await this.logoutBtn.isClickable(1000);
        await this.closeMenuBtn.click();
    }
    async clickLogoutBtn() {
        await this.logoutBtn.isClickable(1000);
        await this.logoutBtn.click();
    }
    async clickTwitterSocialBtn() {
        await this.twitterSocialBtn.click();
    }
    async clickFacebookSocialBtn() {
        await this.facebookSocialBtn.click();
    }
    async clickLinkedInSocialBtn() {
        await this.linkedinSocialBtn.click();
    }

    async assertTwitterLinkOpened() {
        browser.switchWindow('https://x.com/saucelabs');
        await wdioExpect(browser).toHaveUrl('https://x.com/saucelabs');
    }
    async assertFacebookLinkOpened() {
        browser.switchWindow('https://www.facebook.com/saucelabs');
        await wdioExpect(browser).toHaveUrl('https://www.facebook.com/saucelabs');
    }
    async assertLinkedInLinkOpened() {
        browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        await wdioExpect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');
    }
    async assertMenuItemsPresent() {
        await wdioExpect(this.menuItems).toBeElementsArrayOfSize(4);
    }
    async assertNoItemsDisplayedOnCartBtn() {
        await wdioExpect(this.cartBtnBadge).not.toBeDisplayed();
    }

    open(path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}
