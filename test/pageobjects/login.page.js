import BasePage from './basepage.js';
import { expect as chaiExpect } from 'chai';
import { expect as wdioExpect } from '@wdio/globals';


class LoginPage extends BasePage {

    get usernameInput() {
        return $('#user-name');
    }
    get passwordInput() {
        return $('#password');
    }
    get loginSubmitBtn() {
        return $('#login-button');
    }
    get usernameInputError() {
        return $('#user-name.input_error');
    }
    get usernameInputErrorIcon() {
        return $("//input[@id='user-name']/following-sibling::*[name()='svg']");
    }
    get passwordInputError() {
        return $('#password.input_error');
    }
    get passwordInputErrorIcon() {
        return $("//input[@id='password']/following-sibling::*[name()='svg']");
    }
    get noPasswordErrorMsg() {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Password is required')]");
    }
    get noUsernameErrorMsg() {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Username is required')]");
    }
    get wrongCredentialsErrorMsg() {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Username and password do not match any user in this service')]");
    }

    async clickUsernameInputField() {
        await this.usernameInput.click();
    }
    async clickPasswordInputField() {
        await this.passwordInput.click();
    }
    async clickLoginSubmitBtn() {
        await this.loginSubmitBtn.click();
    }
    async enterUsername(username) {
        await this.usernameInput.setValue(username);
    }
    async enterPassword(password) {
        await this.passwordInput.setValue(password);
    }
    async login(username, password) {
        await this.clickUsernameInputField();
        await this.enterUsername(username);
        await this.clickPasswordInputField();
        await this.enterPassword(password);
        await this.clickLoginSubmitBtn();
    }
    async assertPasswordField() {
        await wdioExpect(this.passwordInput).toHaveAttribute('type', 'password',);
    }
    async assertErrorHighlightsVisible() {
        await wdioExpect(this.usernameInputError).toBeDisplayed();
        await wdioExpect(this.passwordInputError).toBeDisplayed();
    }
    async assertErrorIconsVisible() {
        this.usernameInputErrorIcon.waitForDisplayed();
        this.passwordInputErrorIcon.waitForDisplayed();
    }
    async assertNoPasswordMsgVisible() {
        await wdioExpect(this.noPasswordErrorMsg).toBeDisplayed();
    }
    async assertNoUsernameMsgVisible() {
        await wdioExpect(this.noUsernameErrorMsg).toBeDisplayed();
    }
    async assertWrongCredentialsMsgVisible() {
        await wdioExpect(this.wrongCredentialsErrorMsg).toBeDisplayed();
    }
    async assertInputFieldsAreEmpty() {
        await wdioExpect(this.usernameInput).toHaveValue(expect.stringContaining(''));
        await wdioExpect(this.passwordInput).toHaveValue(expect.stringContaining(''));
    }

    open() {
        return super.open('');
    }
}
export default LoginPage;
