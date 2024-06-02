import { $ } from '@wdio/globals'
import BasePage from './basepage.js';


class LoginPage extends BasePage {

    get usernameInput () {
        return $('#user-name');
    }
    get passwordInput () {
        return $('#password');
    }
    get loginSubmitBtn () {
        return $('#login-button');
    }
    get usernameInputError () {
        return $('#user-name.input_error');
    }
    get usernameInputErrorIcon () {
        return $("//input[@id='user-name']/following-sibling::*[name()='svg']");
    }
    get passwordInputError () {
        return $('#password.input_error');
    }
    get passwordInputErrorIcon () {
        return $("//input[@id='password']/following-sibling::*[name()='svg']");
    }
    get noPasswordErrorMsg () {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Password is required')]");
    }
    get noUsernameErrorMsg () {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Username is required')]");
    }
    get wrongCredentialsErrorMsg () {
        return $("//div[@class='error-message-container error' and contains(.,'Epic sadface: Username and password do not match any user in this service')]");
    }

    async clickUsernameInputField () {
        await this.usernameInput.click();
    }
    async clickPasswordInputField () {
        await this.passwordInput.click();
    }
    async clickLoginSubmitBtn () {
        await this.loginSubmitBtn.click();
    }
    async enterUsername (username) {
        await this.usernameInput.setValue(username);
    }
    async enterPassword (password) {
        await this.passwordInput.setValue(password);
    }
    async assertPasswordField () {
        await expect(this.passwordInput).toHaveAttribute('type', 'password',);
    }
    async assertErrorHighlightsVisible () {
        await expect(this.usernameInputError).toBeDisplayed();
        await expect(this.passwordInputError).toBeDisplayed();
    }
    async assertErrorIconsVisible () {
        this.usernameInputErrorIcon.waitForDisplayed();
        this.passwordInputErrorIcon.waitForDisplayed();
    }
    async assertNoPasswordMsgVisible () {
        await expect(this.noPasswordErrorMsg).toBeDisplayed();
    }
    async assertNoUsernameMsgVisible () {
        await expect(this.noUsernameErrorMsg).toBeDisplayed();
    }
    async assertWrongCredentialsMsgVisible () {
        await expect(this.wrongCredentialsErrorMsg).toBeDisplayed();
    }
    async assertInputFieldsAreEmpty () {
        await expect(this.usernameInput).toHaveValue(expect.stringContaining(''));
        await expect(this.passwordInput).toHaveValue(expect.stringContaining(''));
    }

    open () {
        return super.open(' ');
    }
}
export default LoginPage;
