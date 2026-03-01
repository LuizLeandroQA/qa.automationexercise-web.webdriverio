// src/pages/account-information.page.js
const BasePage = require('./base.page');

/**
 * AccountInformationPage
 *
 * Representa a página de preenchimento de informações da conta
 * durante o fluxo de cadastro de usuário.
 *
 * Responsável por:
 * - Selecionar título (Mr/Mrs)
 * - Preencher credenciais
 * - Definir data de nascimento
 * - Selecionar preferências (newsletter/offers)
 * - Preencher dados de endereço
 * - Submeter criação da conta
 *
 * Estende BasePage para reutilizar:
 * - type()
 * - clickWhenClickable()
 * - padrões de espera e mitigação de flakiness
 */
class AccountInformationPage extends BasePage {

  // Title

  /**
   * Radio button para título "Mr".
   * @returns {import('webdriverio').Element}
   */
  get titleMr() { return $('#id_gender1'); }

  /**
   * Radio button para título "Mrs".
   * @returns {import('webdriverio').Element}
   */
  get titleMrs() { return $('#id_gender2'); }

  // Account credentials

  /**
   * Campo de senha do usuário.
   * @returns {import('webdriverio').Element}
   */
  get passwordInput() { return $('#password'); }

  /**
   * Select de dia de nascimento.
   * @returns {import('webdriverio').Element}
   */
  get daySelect() { return $('#days'); }

  /**
   * Select de mês de nascimento.
   * @returns {import('webdriverio').Element}
   */
  get monthSelect() { return $('#months'); }

  /**
   * Select de ano de nascimento.
   * @returns {import('webdriverio').Element}
   */
  get yearSelect() { return $('#years'); }

  // Checkboxes

  /**
   * Checkbox para inscrição na newsletter.
   * @returns {import('webdriverio').Element}
   */
  get newsletterCheckbox() { return $('#newsletter'); }

  /**
   * Checkbox para recebimento de ofertas/promos.
   * @returns {import('webdriverio').Element}
   */
  get offersCheckbox() { return $('#optin'); }

  // Address fields

  /**
   * Campo de primeiro nome.
   * @returns {import('webdriverio').Element}
   */
  get firstNameInput() { return $('#first_name'); }

  /**
   * Campo de sobrenome.
   * @returns {import('webdriverio').Element}
   */
  get lastNameInput() { return $('#last_name'); }

  /**
   * Campo de empresa.
   * @returns {import('webdriverio').Element}
   */
  get companyInput() { return $('#company'); }

  /**
   * Campo de endereço principal.
   * @returns {import('webdriverio').Element}
   */
  get address1Input() { return $('#address1'); }

  /**
   * Campo de endereço complementar.
   * @returns {import('webdriverio').Element}
   */
  get address2Input() { return $('#address2'); }

  /**
   * Select de país.
   * @returns {import('webdriverio').Element}
   */
  get countrySelect() { return $('#country'); }

  /**
   * Campo de estado.
   * @returns {import('webdriverio').Element}
   */
  get stateInput() { return $('#state'); }

  /**
   * Campo de cidade.
   * @returns {import('webdriverio').Element}
   */
  get cityInput() { return $('#city'); }

  /**
   * Campo de CEP.
   * @returns {import('webdriverio').Element}
   */
  get zipcodeInput() { return $('#zipcode'); }

  /**
   * Campo de número de telefone.
   * @returns {import('webdriverio').Element}
   */
  get mobileNumberInput() { return $('#mobile_number'); }

  /**
   * Botão responsável por finalizar a criação da conta.
   * @returns {import('webdriverio').Element}
   */
  get createAccountButton() { return $('button[data-qa="create-account"]'); }

  /**
   * Preenche o formulário completo de cadastro e submete a criação da conta.
   *
   * Fluxo executado:
   * 1. Seleção de título (Mr/Mrs).
   * 2. Preenchimento de senha e data de nascimento.
   * 3. Seleção opcional de newsletter e ofertas.
   * 4. Preenchimento dos dados de endereço.
   * 5. Submissão do formulário.
   *
   * Espera-se que o objeto user contenha:
   * {
   *   title,
   *   password,
   *   birthDay,
   *   birthMonth,
   *   birthYear,
   *   newsletter,
   *   offers,
   *   firstName,
   *   lastName,
   *   company,
   *   address1,
   *   address2,
   *   country,
   *   state,
   *   city,
   *   zipcode,
   *   mobileNumber
   * }
   *
   * @param {Object} user Objeto contendo os dados necessários para o cadastro.
   * @returns {Promise<void>}
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