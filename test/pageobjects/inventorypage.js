import BasePage from './basepage.js';
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

class InventoryPage extends BasePage {

    get productTitle() {
        return $(".inventory_item_name");
    }
    get addToCartBtn() {
        return $("//div[@class='inventory_item' and contains(.,'Sauce Labs Backpack')]//button");
    }
    get productSortingSelect() {
        return $(".product_sort_container");
    }
    get sortProductAZOption() {
        return $("//option[contains(.,'Name (A to Z)')]");
    }
    get sortProductZAOption() {
        return $("//option[contains(.,'Name (Z to A)')]");
    }
    get sortProductPriceLowToHighOption() {
        return $("//option[contains(. , 'Price (low to high)')]");
    }
    get sortProductPriceHighToLowOption() {
        return $("//option[contains(. , 'Price (high to low)')]");
    }

    totalItemsInCart = 0;

    async clickAddToCartBtn() {
        await this.addToCartBtn.click();
        this.totalItemsInCart++
    }
    async assertNumberOfItemsInCart() {
        let counter = this.totalItemsInCart.toString();
        await expect(this.cartBtnBadge).toHaveText(counter);
    }
    async clickProductSortingSelect() {
        await this.productSortingSelect.click();
    }
    async clickSortProductAZOption() {
        await this.sortProductAZOption.click();
        await browser.pause(500);
    }
    async clickSortProductZAOption() {
        await this.sortProductZAOption.click();
        await browser.pause(500);
    }
    async clickSortProductPriceLowToHighOption() {
        await this.sortProductPriceLowToHighOption.click();
        await browser.pause(500);
    }
    async clickSortProductPriceHighToLowOption() {
        await this.sortProductPriceHighToLowOption.click();
        await browser.pause(500);
    }

    async collectProductTitles() {
        return await $$(".inventory_item_name").map(async (element) => {
            return await element.getText();
        });
    }
    async collectProductPrices() {
        return await $$(".inventory_item_price").map(async (element) => {
            const price = await element.getText();
            return parseFloat(price.replace('$', ''));
        });
    }

    async getSortedTitles(titles) {
        return [...titles].sort();
    }
    async getReverseSortedTitles(titles) {
        return [...titles].sort().reverse();
    }
    async getSortedPricesAscending(prices) {
        return [...prices].sort((a, b) => (a - b));
    }
    async getSortedPricesDescending(prices) {
        return [...prices].sort((a, b) => (b - a));
    }

    async assertTitlesSortedCorrectlyZA() {
        const productTitles = await this.collectProductTitles();
        const productTitlesSortedZA = await this.getReverseSortedTitles(productTitles);
        await this.clickProductSortingSelect();
        await this.clickSortProductZAOption();
        const productTitlesAfterSorting = await this.collectProductTitles();

        console.log('Product Titles After Sorting Z - A (Expected):', productTitlesSortedZA);
        console.log('Product Titles After Sorting Z - A (Actual):', productTitlesAfterSorting);

        chaiExpect(productTitlesAfterSorting).to.deep.equal(productTitlesSortedZA, 'The product titles were not sorted correctly (Z-A)');
    }
    async assertTitlesSortedCorrectlyAZ() {
        const productTitles = await this.collectProductTitles();
        const productTitlesAfterSortingAZ = await this.getSortedTitles(productTitles);
        await this.clickProductSortingSelect();
        await this.clickSortProductAZOption();
        const productTitlesAfterSorting = await this.collectProductTitles();

        console.log('Product Titles After Sorting A - Z (Expected):', productTitlesAfterSortingAZ);
        console.log('Product Titles After Sorting A - Z (Actual):', productTitlesAfterSorting);

        chaiExpect(productTitlesAfterSorting).to.deep.equal(productTitlesAfterSortingAZ, 'The product titles were not sorted correctly (A-Z)');
    }
    async assertPricesSortedCorrectlyAscending() {
        const productPrices = await this.collectProductPrices();
        const productPricesSortedAscending = await this.getSortedPricesAscending(productPrices);
        await this.clickProductSortingSelect();
        await this.clickSortProductPriceLowToHighOption();
        const productPricesAfterSorting = await this.collectProductPrices();

        console.log('Product Prices After Sorting - Ascending (Expected):', productPricesSortedAscending);
        console.log('Product Prices After Sorting - Ascending (Actual):', productPricesAfterSorting);

        chaiExpect(productPricesAfterSorting).to.deep.equal(productPricesSortedAscending, 'The product prices were not sorted correctly (Ascending)');
    }
    async assertPricesSortedCorrectlyDescending() {
        const productPrices = await this.collectProductPrices();
        const productPricesSortedDescending = await this.getSortedPricesDescending(productPrices);
        await this.clickProductSortingSelect();
        await this.clickSortProductPriceHighToLowOption();
        const productPricesAfterSorting = await this.collectProductPrices();

        console.log('Product Prices After Sorting - Descending (Expected):', productPricesSortedDescending);
        console.log('Product Prices After Sorting - Descending (Actual):', productPricesAfterSorting);
        
        chaiExpect(productPricesAfterSorting).to.deep.equal(productPricesSortedDescending, 'The product prices were not sorted correctly (Descending)');
    }
}
export default InventoryPage;