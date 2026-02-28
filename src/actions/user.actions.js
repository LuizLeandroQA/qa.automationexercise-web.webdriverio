const HomePage = require('../pages/home.page');
const SignupLoginPage = require('../pages/signup-login.page');
const AccountInformationPage = require('../pages/account-information.page');
const AccountCreatedPage = require('../pages/account-created.page');
const AccountDeletedPage = require('../pages/account-deleted.page');

/**
 * High-level user flows to reduce duplication across specs.
 */
class UserActions {
    /**
   * Registers a new user end-to-end.
   * @param {object} user
   */
    async register(user) {
    console.log('HomePage resolve:', require.resolve('../pages/home.page'));
    console.log('HomePage type:', typeof HomePage);
    console.log('HomePage keys:', Object.getOwnPropertyNames(HomePage));
    console.log('goToSignupLogin:', typeof HomePage.goToSignupLogin);
    console.log('open:', typeof HomePage.open);

    await HomePage.open();
    await HomePage.goToSignupLogin();
    await SignupLoginPage.startSignup(user.name, user.email);
    await AccountInformationPage.fillAndSubmit(user);
    await AccountCreatedPage.assertAccountCreated();
    await AccountCreatedPage.continue();
    }

    /**
   * Deletes the currently logged in user.
   */
    async deleteCurrentAccount() {
  await HomePage.waitUntilLoggedIn();  // garante que login finalizou
    await HomePage.deleteAccount();
    await AccountDeletedPage.assertAccountDeleted();
    await AccountDeletedPage.continue();
}
}

module.exports = new UserActions();