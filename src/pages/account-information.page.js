const BasePage = require('./base.page');

/**
 * Account Information page (registration form).
 */
class AccountInformationPage extends BasePage {

  // Title
    get titleMr() { return $('#id_gender1'); }
    get titleMrs() { return $('#id_gender2'); }

  // Account credentials
    get passwordInput() { return $('#password'); }
    get daySelect() { return $('#days'); }
    get monthSelect() { return $('#months'); }
    get yearSelect() { return $('#years'); }

  // Checkboxes
    get newsletterCheckbox() { return $('#newsletter'); }
    get offersCheckbox() { return $('#optin'); }

  // Address fields
    get firstNameInput() { return $('#first_name'); }
    get lastNameInput() { return $('#last_name'); }
    get companyInput() { return $('#company'); }
    get address1Input() { return $('#address1'); }
    get address2Input() { return $('#address2'); }
    get countrySelect() { return $('#country'); }
    get stateInput() { return $('#state'); }
    get cityInput() { return $('#city'); }
    get zipcodeInput() { return $('#zipcode'); }
    get mobileNumberInput() { return $('#mobile_number'); }

    get createAccountButton() { return $('button[data-qa="create-account"]'); }

    /**
   * Fills the registration form and submits it.
   * @param {object} user
   */
    async fillAndSubmit(user) {

    // Title
    if (user.title === 'Mr') {
        await this.clickWhenClickable(this.titleMr);
    } else {
        await this.clickWhenClickable(this.titleMrs);
    }

    // Account info
    await this.type(this.passwordInput, user.password);
    await this.daySelect.selectByVisibleText(user.birthDay);
    await this.monthSelect.selectByVisibleText(user.birthMonth);
    await this.yearSelect.selectByVisibleText(user.birthYear);

    // Checkboxes
    if (user.newsletter) {
        await this.clickWhenClickable(this.newsletterCheckbox);
    }

    if (user.offers) {
        await this.clickWhenClickable(this.offersCheckbox);
    }

    // Address
    await this.type(this.firstNameInput, user.firstName);
    await this.type(this.lastNameInput, user.lastName);
    await this.type(this.companyInput, user.company);
    await this.type(this.address1Input, user.address1);
    await this.type(this.address2Input, user.address2);

    await this.countrySelect.selectByVisibleText(user.country);

    await this.type(this.stateInput, user.state);
    await this.type(this.cityInput, user.city);
    await this.type(this.zipcodeInput, user.zipcode);
    await this.type(this.mobileNumberInput, user.mobileNumber);

    await this.clickWhenClickable(this.createAccountButton);
    }
}

module.exports = new AccountInformationPage();