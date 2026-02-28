// src/pages/home.page.js
const BasePage = require('./base.page');

class HomePage extends BasePage {

  // ===== Selectors (strings) para evitar stale/BiDi =====
    get headerSelector() {
    return 'header';
    }

    get signupLoginSelector() {
    return 'a[href="/login"]';
    }

    get deleteAccountSelector() {
    return 'a[href="/delete_account"]';
    }

    get loggedInAsSelector() {
    return 'a*=Logged in as'; // compatível com WDIO
    }

  // ===== Element getters =====
    get header() {
    return $(this.headerSelector);
    }

  // ===== Navegação =====
    async open() {
    await super.open('/');
    await $(this.headerSelector).waitForDisplayed({ timeout: 60000 });
    await this.dismissOverlays(); // 👈 já limpa overlay ao abrir
    }

    async ensureOnHome() {
    await $(this.headerSelector).waitForDisplayed({ timeout: 60000 });
    }

  // ===== Helpers =====

    async removeAdIframes() {
    await browser.execute(() => {
        document.querySelectorAll('iframe').forEach((f) => f.remove());
    });
    }

    async goTop() {
    await browser.execute(() => window.scrollTo(0, 0));
    }

  // ===== Ações =====

    async goToSignupLogin() {
    await this.ensureOnHome();
    await this.dismissOverlays();   // ✅ agora usa o método robusto
    await this.goTop();

    await this.clickWhenClickable(this.signupLoginSelector, 60000);
    }

    async deleteAccount() {
    await this.ensureOnHome();
    await this.dismissOverlays();   // ✅ remove banner
    await this.goTop();

    await this.clickWhenClickable(this.deleteAccountSelector, 60000);
    }

    async waitUntilLoggedIn(timeout = 60000) {
    await this.dismissOverlays();
  await browser.url('/');              // ✅ sai do /account_created#google_vignette
    await this.dismissOverlays();

  const el = await $('a*=Logged in as'); // ✅ o que você disse que funcionou
    await el.waitForDisplayed({ timeout });
}
}

module.exports = new HomePage();