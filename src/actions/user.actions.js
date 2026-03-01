// src/actions/user.factory.js
const HomePage = require('../pages/home.page');
const SignupLoginPage = require('../pages/signup-login.page');
const AccountInformationPage = require('../pages/account-information.page');
const AccountCreatedPage = require('../pages/account-created.page');
const AccountDeletedPage = require('../pages/account-deleted.page');

/**
 * UserActions
 *
 * Camada de orquestração de fluxos de alto nível relacionados ao usuário.
 *
 * Objetivo:
 * - Reduzir duplicação de código nos testes (Specs)
 * - Centralizar fluxos end-to-end
 * - Manter os testes mais legíveis e orientados a comportamento
 *
 * Segue o princípio de separação de responsabilidades:
 * - Pages → interações com elementos
 * - Actions → orquestração de fluxos
 * - Specs → validações e cenários
 */
class UserActions {

    /**
     * Realiza o fluxo completo de cadastro de usuário (end-to-end).
     *
     * Fluxo executado:
     * 1. Acessa a Home.
     * 2. Navega para Signup/Login.
     * 3. Inicia o cadastro com nome e e-mail.
     * 4. Preenche formulário completo de registro.
     * 5. Valida tela de "Account Created".
     * 6. Continua para finalizar o fluxo.
     *
     * Espera-se que o objeto user contenha todos os dados
     * necessários para o preenchimento do formulário.
     *
     * @param {Object} user Objeto contendo dados completos do usuário.
     * @returns {Promise<void>}
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
     * Executa o fluxo completo de exclusão da conta atualmente logada.
     *
     * Fluxo executado:
     * 1. Aguarda confirmação de login concluído.
     * 2. Aciona exclusão da conta.
     * 3. Valida tela de "Account Deleted".
     * 4. Continua após exclusão.
     *
     * @returns {Promise<void>}
     */
    async deleteCurrentAccount() {
        await HomePage.waitUntilLoggedIn();  // garante que login finalizou
        await HomePage.deleteAccount();
        await AccountDeletedPage.assertAccountDeleted();
        await AccountDeletedPage.continue();
    }
}

module.exports = new UserActions();