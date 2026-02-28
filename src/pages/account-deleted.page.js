const BasePage = require('./base.page');

/**
 * Account Deleted confirmation page.
 */
class AccountDeletedPage extends BasePage {
    get header() { return $('h2[data-qa="account-deleted"]'); }
    get continueButton() { return $('a[data-qa="continue-button"]'); }

    /**
   * Validates account deleted screen.
   */
    async assertAccountDeleted() {
    await expect(this.header).toBeDisplayed();
    await expect(this.header).toHaveText(expect.stringContaining('ACCOUNT DELETED!'));
    }

    /**
   * Clicks Continue after deletion.
   */
    async continue() {
    await this.clickWhenClickable(this.continueButton);
    }
}

module.exports = new AccountDeletedPage();