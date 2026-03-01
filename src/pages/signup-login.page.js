// src/pages/signup-home.page.js
const BasePage = require('./base.page');

/**
 * SignupLoginPage
 *
 * Representa a página de Login e Cadastro da aplicação.
 * Responsável por iniciar o fluxo de criação de conta
 * a partir do preenchimento inicial de nome e e-mail.
 *
 * Estende BasePage para reutilização de comportamentos comuns
 * como navegação, esperas e interações seguras.
 */
class SignupLoginPage extends BasePage {

    /**
     * Campo de input para nome no fluxo de cadastro.
     * @returns {import('webdriverio').Element}
     */
    get signupNameInput() {
        return $('input[data-qa="signup-name"]');
    }

    /**
     * Campo de input para e-mail no fluxo de cadastro.
     * @returns {import('webdriverio').Element}
     */
    get signupEmailInput() {
        return $('input[data-qa="signup-email"]');
    }

    /**
     * Botão responsável por iniciar o cadastro.
     * @returns {import('webdriverio').Element}
     */
    get signupButton() {
        return $('button[data-qa="signup-button"]');
    }

    /**
     * Inicia o processo de cadastro preenchendo nome e e-mail
     * e acionando o botão de criação de conta.
     *
     * Fluxo executado:
     * 1. Aguarda o campo de nome estar visível.
     * 2. Preenche nome.
     * 3. Aguarda o campo de e-mail estar visível.
     * 4. Preenche e-mail.
     * 5. Clica no botão de cadastro.
     *
     * @param {string} name Nome do usuário a ser cadastrado.
     * @param {string} email E-mail do usuário a ser cadastrado.
     * @returns {Promise<void>}
     */
    async startSignup(name, email) {
        await this.signupNameInput.waitForDisplayed({ timeout: 15000 });
        await this.signupNameInput.setValue(name);

        await this.signupEmailInput.waitForDisplayed({ timeout: 15000 });
        await this.signupEmailInput.setValue(email);

        await this.signupButton.click();
    }
} // <-- ESTE } estava faltando

module.exports = new SignupLoginPage();