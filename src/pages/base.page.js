// src/pages/base.page.js
class BasePage {
  async open(path = '/') {
    await browser.url(path);
  }

  async waitDisplayed(element, timeoutMs = 15000) {
    await element.waitForDisplayed({ timeout: timeoutMs });
  }

  /**
   * Mitiga overlays/ads/interstitials (google vignette) que cobrem a tela e impedem cliques.
   * Seguro chamar antes de clicar em elementos do header/topo.
   */
  async dismissOverlays() {
    // ✅ garante sair do /account_created e remove o interstitial/hash
    await browser.url('/');

    // 1) remove iframes + overlays via JS (1 única execução)
    await browser.execute(() => {
      // remove iframes (ads)
      document.querySelectorAll('iframe').forEach((f) => f.remove());

      // remove hash #google_vignette e similares (interstitial)
      try {
        if (location.hash?.includes('google_vignette')) {
  history.replaceState(null, '', location.pathname + location.search);
}
      } catch {}

      // remove overlays genéricos por seletor
      const selectors = [
        '#google_vignette',
        'div[id*="google_vignette"]',
        'div[class*="vignette"]',
        'div[aria-label="Advertisement"]',
        // remove qualquer coisa “full screen” muito comum em interstitial
        'div[style*="position: fixed"][style*="z-index"]',
      ];

      selectors.forEach((sel) => {
        try {
          document.querySelectorAll(sel).forEach((e) => e.remove());
        } catch {}
      });

      // destrava scroll caso overlay tenha travado
      try {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      } catch {}
    });

    // 2) se existir botão "Close" visível, tenta clicar (sem quebrar se não tiver)
    const closeBtn = await $('button=Close');
    if (await closeBtn.isExisting()) {
      try {
        await closeBtn.scrollIntoView();
        await closeBtn.click();
      } catch {
        // ignora
      }
    }
  }

  /**
   * Clica com segurança (evita stale/BiDi quando você passa selector string).
   * target pode ser: selector (string) ou element handle.
   */
  async clickWhenClickable(target, timeout = 60000) {
    const element = typeof target === 'string' ? await $(target) : target;

    await element.waitForExist({ timeout });
    await element.scrollIntoView();
    await element.waitForDisplayed({ timeout });
    await element.waitForClickable({ timeout });

    try {
      await element.click();
    } catch (err) {
      console.warn('Normal click failed, trying JS click:', err?.message || err);
      await browser.execute((el) => el.click(), element);
    }
  }

  // 👇 ESTE MÉTODO TEM QUE FICAR FORA DO clickWhenClickable
  async type(element, value, timeoutMs = 15000) {
    await element.waitForDisplayed({ timeout: timeoutMs });
    await element.setValue(value);
  }
}

module.exports = BasePage;