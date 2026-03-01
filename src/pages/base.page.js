// src/pages/base.page.js

/**
 * BasePage
 *
 * Classe base do Page Object Model (POM).
 * Centraliza helpers reutilizáveis para navegação, esperas e interações com elementos
 * visando reduzir flakiness (ex.: overlays/interstitials, cliques interceptados, stale elements).
 */
class BasePage {
  /**
   * Navega para uma rota da aplicação.
   *
   * @param {string} [path='/'] Caminho relativo (ex.: '/', '/login', '/delete_account').
   * @returns {Promise<void>}
   */
  async open(path = '/') {
    await browser.url(path);
  }

  /**
   * Aguarda um elemento estar visível na tela.
   *
   * @param {import('webdriverio').Element} element Elemento WDIO previamente resolvido.
   * @param {number} [timeoutMs=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>}
   */
  async waitDisplayed(element, timeoutMs = 15000) {
    await element.waitForDisplayed({ timeout: timeoutMs });
  }

  /**
   * Mitiga overlays/ads/interstitials (ex.: "google vignette") que cobrem a tela e impedem cliques.
   * Seguro chamar antes de clicar em elementos do header/topo.
   *
   * Estratégia adotada:
   * 1) Força navegação para Home (evita ficar preso em rotas como /account_created + interstitial/hash).
   * 2) Remove iframes de anúncios e overlays comuns via JavaScript.
   * 3) Destrava scroll caso overlay tenha alterado overflow.
   * 4) Se existir um botão "Close", tenta clicar (best effort).
   *
   * @returns {Promise<void>}
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
   * Clica com segurança aguardando o elemento existir, estar visível e clicável.
   * Ajuda a reduzir falhas por:
   * - elemento ainda não renderizado
   * - clique interceptado por overlays
   * - timing de renderização
   * - casos de stale quando o elemento foi re-renderizado (preferir passar selector string)
   *
   * @param {string|import('webdriverio').Element} target
   * Seletor (string) ou Element handle. Preferir string para resolver o elemento "na hora" e evitar stale.
   * @param {number} [timeout=60000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>}
   */
  async clickWhenClickable(target, timeout = 60000) {
    const element = typeof target === 'string' ? await $(target) : target;

    await element.waitForExist({ timeout });
    await element.scrollIntoView({ block: 'center', inline: 'center' });
    await element.waitForDisplayed({ timeout });
    await element.waitForClickable({ timeout });

    try {
      await element.click();
    } catch (err) {
      // fallback para situações em que o clique padrão falha (ex.: interceptação/overlay/transição)
      console.warn('Normal click failed, trying JS click:', err?.message || err);
      await browser.execute((el) => el.click(), element);
    }
  }

  /**
   * Preenche um campo de texto garantindo visibilidade antes de setar o valor.
   * Deve permanecer fora de clickWhenClickable por responsabilidade única (Single Responsibility).
   *
   * @param {import('webdriverio').Element} element Elemento de input/textarea.
   * @param {string} value Valor a ser informado no campo.
   * @param {number} [timeoutMs=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>}
   */
  async type(element, value, timeoutMs = 15000) {
    await element.waitForDisplayed({ timeout: timeoutMs });
    await element.setValue(value);
  }
}

module.exports = BasePage;