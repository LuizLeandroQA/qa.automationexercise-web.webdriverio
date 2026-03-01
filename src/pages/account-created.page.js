// src/pages/account-created.page.js
const BasePage = require('./base.page');

/**
 * AccountCreatedPage
 *
 * Representa a tela de confirmação exibida após a criação
 * bem-sucedida de uma nova conta na aplicação.
 *
 * Responsável por:
 * - Validar que a conta foi criada com sucesso
 * - Permitir continuidade do fluxo após o cadastro
 *
 * Estende BasePage para reutilizar interações seguras
 * como clickWhenClickable e padrões de espera.
 */
class AccountCreatedPage extends BasePage {

    /**
     * Cabeçalho principal da tela de confirmação.
     * Exibe a mensagem "ACCOUNT CREATED!".
     *
     * @returns {import('webdriverio').Element}
     */
    get header() { return $('h2[data-qa="account-created"]'); }

    /**
     * Botão "Continue" exibido após criação da conta.
     *
     * @returns {import('webdriverio').Element}
     */
    get continueButton() { return $('a[data-qa="continue-button"]'); }

    /**
     * Valida que a tela de confirmação de conta criada
     * está visível e contém o texto esperado.
     *
     * Validações realizadas:
     * 1. Header está visível.
     * 2. Texto contém "ACCOUNT CREATED!".
     *
     * @returns {Promise<void>}
     */
    async assertAccountCreated() {
        await expect(this.header).toBeDisplayed();
        await expect(this.header).toHaveText(expect.stringContaining('ACCOUNT CREATED!'));
    }

    /**
     * Clica no botão "Continue" para prosseguir
     * no fluxo após a criação da conta.
     *
     * @returns {Promise<void>}
     */
    async continue() {
        await this.clickWhenClickable(this.continueButton);
    }
}

module.exports = new AccountCreatedPage();