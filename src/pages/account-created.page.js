// src/pages/account-created.page.js
const BasePage = require('./base.page');

class AccountCreatedPage extends BasePage {
  get header() {
    return $('h2[data-qa="account-created"]');
  }

  get continueButton() {
    return $('a[data-qa="continue-button"]');
  }

  get loggedInAs() {
    return $('//a[contains(., "Logged in as")]');
  }

  async assertAccountCreated() {
    await this.dismissOverlays();

    let lastUrl = await browser.getUrl();

    await browser.waitUntil(
      async () => {
        lastUrl = await browser.getUrl();

        if (lastUrl.includes('/account_created')) {
          return await this.header.isDisplayed();
        }

        return await this.loggedInAs.isDisplayed();
      },
      {
        timeout: 60000,
        interval: 500,
        timeoutMsg:
          'Nem a tela /account_created apareceu, nem o "Logged in as". Veja o log da URL atual.',
      }
    );

    console.log(`URL após cadastro: ${lastUrl}`);

    if (lastUrl.includes('/account_created')) {
      await expect(this.header).toBeDisplayed();
      await expect(this.header).toHaveTextContaining('ACCOUNT CREATED!');
    } else {
      await expect(this.loggedInAs).toBeDisplayed();
    }
  }

  async continue() {
    // Só existe na tela /account_created
    const url = await browser.getUrl();
    if (!url.includes('/account_created')) return;

    await this.dismissOverlays();
    await this.clickWhenClickable(this.continueButton, 60000);
  }
}

module.exports = new AccountCreatedPage();