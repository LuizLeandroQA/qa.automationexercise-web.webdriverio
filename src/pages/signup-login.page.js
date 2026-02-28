const BasePage = require('./base.page');

class SignupLoginPage extends BasePage {
    get signupNameInput() {
    return $('input[data-qa="signup-name"]');
    }

    get signupEmailInput() {
    return $('input[data-qa="signup-email"]');
    }

    get signupButton() {
    return $('button[data-qa="signup-button"]');
    }

    async startSignup(name, email) {
    await this.signupNameInput.waitForDisplayed({ timeout: 15000 });
    await this.signupNameInput.setValue(name);

    await this.signupEmailInput.waitForDisplayed({ timeout: 15000 });
    await this.signupEmailInput.setValue(email);

    await this.signupButton.click();
    }
} // <-- ESTE } estava faltando

module.exports = new SignupLoginPage();