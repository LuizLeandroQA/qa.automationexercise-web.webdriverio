const BasePage = require('./base.page');

/**
 * Account Created confirmation page.
 */
class AccountCreatedPage extends BasePage {
    get header() { return $('h2[data-qa="account-created"]'); }
    get continueButton() { return $('a[data-qa="continue-button"]'); }

    /**
   * Validates account created screen.
   */
    async assertAccountCreated() {
    await expect(this.header).toBeDisplayed();
    await expect(this.header).toHaveText(expect.stringContaining('ACCOUNT CREATED!'));
    }

    /**
   * Clicks Continue after account creation.
   */
    async continue() {
    await this.clickWhenClickable(this.continueButton);
    }
}

module.exports = new AccountCreatedPage();