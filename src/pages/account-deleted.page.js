// src/pages/account-deleted.page.js
const BasePage = require('./base.page');

/**
 * AccountDeletedPage
 *
 * Representa a tela de confirmação exibida após a exclusão
 * bem-sucedida de uma conta de usuário.
 *
 * Responsabilidades:
 * - Validar que a conta foi excluída corretamente
 * - Permitir continuidade do fluxo após a exclusão
 *
 * Estende BasePage para reutilização de interações seguras,
 * como clickWhenClickable e padrões de espera.
 */
class AccountDeletedPage extends BasePage {

    /**
     * Cabeçalho principal da tela de confirmação de exclusão.
     * Deve conter o texto "ACCOUNT DELETED!".
     *
     * @returns {import('webdriverio').Element}
     */
    get header() { return $('h2[data-qa="account-deleted"]'); }

    /**
     * Botão "Continue" exibido após a exclusão da conta.
     *
     * @returns {import('webdriverio').Element}
     */
    get continueButton() { return $('a[data-qa="continue-button"]'); }

    /**
     * Valida que a tela de confirmação de exclusão
     * foi exibida corretamente.
     *
     * Validações realizadas:
     * 1. O cabeçalho está visível.
     * 2. O texto contém "ACCOUNT DELETED!".
     *
     * @returns {Promise<void>}
     */
    async assertAccountDeleted() {
        await expect(this.header).toBeDisplayed();
        await expect(this.header).toHaveText(expect.stringContaining('ACCOUNT DELETED!'));
    }

    /**
     * Clica no botão "Continue" após a exclusão da conta,
     * permitindo que o fluxo retorne à home ou prossiga conforme
     * comportamento da aplicação.
     *
     * @returns {Promise<void>}
     */
    async continue() {
        await this.clickWhenClickable(this.continueButton);
    }
}

module.exports = new AccountDeletedPage();