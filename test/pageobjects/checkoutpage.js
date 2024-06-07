import BasePage from './basepage.js';
import { Key } from 'webdriverio'
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';

class CheckoutPage extends BasePage {

    get firstNameInputField() {
        return $('#first-name');
    }
    get lastNameInputField() {
        return $('#last-name');
    }
    get zipCodeInputField() {
        return $('#postal-code');
    }
    get continueBtn() {
        return $('#continue');
    }
    get cancelBtn() {
        return $('#cancel');
    }
    get firstNameInputError() {
        return $("#first-name.input_error");
    }
    get lastNameInputError() {
        return $("#last-name.input_error");
    }
    get zipCodeInputError() {
        return $("#postal-code.input_error");
    }
    get firstNameErrorIcon() {
        return $("//input[@id='first-name']/following-sibling::*[name()='svg']");
    }
    get lastNameErrorIcon() {
        return $("//input[@id='last-name']/following-sibling::*[name()='svg']");
    }
    get zipCodeErrorIcon() {
        return $("//input[@id='postal-code']/following-sibling::*[name()='svg']");
    }
    get noFirstNameErrorMsg() {
        return $("//div[@class = 'error-message-container error' and contains (., 'Error: First Name is required')]");
    }
    get noLastNameErrorMsg() {
        return $("//div[@class = 'error-message-container error' and contains (., 'Error: Last Name is required')]");
    }
    get noZipCodeErrorMsg() {
        return $("//div[@class = 'error-message-container error' and contains (., 'Error: Postal Code is required')]");
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }
    async enterFirstName(firstName) {
        await this.firstNameInputField.click();
        await this.firstNameInputField.setValue(firstName);
    }
    async enterLastName(lastName) {
        await this.lastNameInputField.click();
        await this.lastNameInputField.setValue(lastName);
    }
    async enterZipCode(zipCode) {
        await this.zipCodeInputField.click();
        await this.zipCodeInputField.setValue(zipCode);
    }
    async enterEmptyFirstName(lastName, zipCode) {
        await this.firstNameInputField.click();
        await browser.keys([Key.Ctrl, 'a', Key.Backspace]);
        await this.lastNameInputField.setValue(lastName);
        await this.zipCodeInputField.setValue(zipCode);
    }
    async enterEmptyLastName (fistName, zipCode) {
        await this.firstNameInputField.setValue(fistName);
        await this.lastNameInputField.click();
        await browser.keys([Key.Ctrl, 'a', Key.Backspace]);
        await this.zipCodeInputField.setValue(zipCode);
    }
    async enterEmptyZipCode (firstName, lastName) {
        await this.firstNameInputField.setValue(firstName);
        await this.lastNameInputField.setValue(lastName);
        await this.zipCodeInputField.click();
        await browser.keys([Key.Ctrl, 'a', Key.Backspace]);
    }

    async assertErrorHighlightsVisible() {
        await wdioExpect(this.firstNameInputError).toBeDisplayed();
        await wdioExpect(this.lastNameInputError).toBeDisplayed();
        await wdioExpect(this.zipCodeInputError).toBeDisplayed();
    }
    async assertErrorIconsVisible() {
        await this.firstNameErrorIcon.waitForDisplayed();
        await this.lastNameErrorIcon.waitForDisplayed();
        await this.zipCodeErrorIcon.waitForDisplayed();
    }
    async assertNoFirstNameErrorMsgVisible() {
        await wdioExpect(this.noFirstNameErrorMsg).toBeDisplayed();
    }
    async assertNoLastNameErrorMsgVisible() {
        await wdioExpect(this.noLastNameErrorMsg).toBeDisplayed();
    }
    async assertNoZipCodeErrorMsgVisible() {
        await wdioExpect(this.noZipCodeErrorMsg).toBeDisplayed();
    }
}
export default CheckoutPage;