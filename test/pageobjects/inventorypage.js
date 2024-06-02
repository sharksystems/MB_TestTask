import BasePage from './basepage.js';


class InventoryPage extends BasePage {
    
    get addToCartBtn () {
        return $("//div[@class='inventory_item' and contains(.,'Sauce Labs Backpack')]//button");
    }

    totalItemsInCart = 0;

    async clickAddToCartBtn () {
        await this.addToCartBtn.click();
        this.totalItemsInCart++
    }
    async assertNumberOfItemsInCart () {
        let counter = this.totalItemsInCart.toString();
        await expect(this.cartBtnBadge).toHaveText(counter);  
    }
}
export default InventoryPage;