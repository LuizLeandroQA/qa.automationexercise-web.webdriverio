// src/pages/home.page.js
const BasePage = require('./base.page');

/**
 * HomePage
 *
 * Representa a página inicial da aplicação.
 * Implementa ações de navegação principal (Login, Delete Account)
 * e validações relacionadas ao estado de usuário autenticado.
 *
 * Estende BasePage para reutilizar:
 * - navegação
 * - tratamento de overlays/interstitials
 * - cliques seguros
 */
class HomePage extends BasePage {

  // ===== Selectors (strings) para evitar stale/BiDi =====

  /**
   * Seletor do header principal da aplicação.
   * Utilizado como indicador de que a Home foi carregada.
   * @returns {string}
   */
  get headerSelector() {
    return 'header';
  }

  /**
   * Seletor do link de navegação para Login/Signup.
   * @returns {string}
   */
  get signupLoginSelector() {
    return 'a[href="/login"]';
  }

  /**
   * Seletor do link para exclusão de conta.
   * @returns {string}
   */
  get deleteAccountSelector() {
    return 'a[href="/delete_account"]';
  }

  /**
   * Seletor parcial que identifica o estado logado do usuário.
   * Compatível com estratégia WDIO de match parcial.
   * @returns {string}
   */
  get loggedInAsSelector() {
    return 'a*=Logged in as'; // compatível com WDIO
  }

  // ===== Element getters =====

  /**
   * Retorna o elemento header já resolvido pelo WDIO.
   * @returns {import('webdriverio').Element}
   */
  get header() {
    return $(this.headerSelector);
  }

  // ===== Navegação =====

  /**
   * Abre a página inicial da aplicação.
   * Garante que o header esteja visível e remove possíveis overlays.
   *
   * @returns {Promise<void>}
   */
  async open() {
    await super.open('/');
    await $(this.headerSelector).waitForDisplayed({ timeout: 60000 });
    await this.dismissOverlays(); // 👈 já limpa overlay ao abrir
  }

  /**
   * Garante que o usuário está na Home aguardando o header.
   *
   * @returns {Promise<void>}
   */
  async ensureOnHome() {
    await $(this.headerSelector).waitForDisplayed({ timeout: 60000 });
  }

  // ===== Helpers =====

  /**
   * Remove iframes da página via execução JavaScript.
   * Utilizado como mitigação adicional contra anúncios/interstitials.
   *
   * @returns {Promise<void>}
   */
  async removeAdIframes() {
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach((f) => f.remove());
    });
  }

  /**
   * Move o scroll para o topo da página.
   * Útil antes de interações com elementos no header.
   *
   * @returns {Promise<void>}
   */
  async goTop() {
    await browser.execute(() => window.scrollTo(0, 0));
  }

  // ===== Ações =====

  /**
   * Navega para a página de Login/Signup.
   * Executa:
   * - validação de que está na Home
   * - limpeza de overlays
   * - scroll para topo
   * - clique seguro no botão
   *
   * @returns {Promise<void>}
   */
  async goToSignupLogin() {
    await this.ensureOnHome();
    await this.dismissOverlays();   // ✅ agora usa o método robusto
    await this.goTop();

    await this.clickWhenClickable(this.signupLoginSelector, 60000);
  }

  /**
   * Executa a ação de exclusão de conta.
   * Garante estado estável antes do clique.
   *
   * @returns {Promise<void>}
   */
  async deleteAccount() {
    await this.ensureOnHome();
    await this.dismissOverlays();   // ✅ remove banner
    await this.goTop();

    await this.clickWhenClickable(this.deleteAccountSelector, 60000);
  }

  /**
   * Aguarda até que o usuário esteja autenticado,
   * validando a presença do texto "Logged in as".
   *
   * Inclui:
   * - limpeza de overlays
   * - correção de rota caso esteja preso em interstitial
   *
   * @param {number} [timeout=60000] Tempo máximo de espera.
   * @returns {Promise<void>}
   */
  async waitUntilLoggedIn(timeout = 60000) {
    await this.dismissOverlays();
    await browser.url('/');              // ✅ sai do /account_created#google_vignette
    await this.dismissOverlays();

    const el = await $('a*=Logged in as'); // ✅ o que você disse que funcionou
    await el.waitForDisplayed({ timeout });
  }
}

module.exports = new HomePage();