// wdio.conf.js
exports.config = {

  //
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  //
  // ==================
  // Specify Test Files
  // ==================
  specs: ['./test/specs/**/*.spec.js'],

  suites: {
    smoke: ['./test/specs/smoke.spec.js'],
    regression: ['./test/specs/register-user.spec.js'],
  },

  exclude: [],

  //
  // ============
  // Capabilities
  // ============
  maxInstances: 10,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--window-size=1920,1080',
          '--disable-notifications',
          '--disable-popup-blocking',
          '--disable-infobars',
          '--disable-gcm',
          '--no-default-browser-check',
          '--disable-background-networking',
          '--disable-sync',
          '--disable-features=Translate,BackForwardCache,MediaRouter,OptimizationHints',
          '--disable-save-password-bubble',
          '--disable-extensions',
        ],
        prefs: {
          credentials_enable_service: false,
          'profile.password_manager_enabled': false,
          'profile.default_content_setting_values.notifications': 2,
          'autofill.profile_enabled': false,
          'autofill.credit_card_enabled': false,
        },
      },
    },
  ],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'warn',
  bail: 0,

  baseUrl: 'https://automationexercise.com',

  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  //
  // =====
  // Services
  // =====
  //services: ['devtools'],

  //
  // =====
  // Hooks
  // =====
  //before: async function () {
  //  try {
  //    await browser.cdp('Network', 'enable');

  //   await browser.cdp('Network', 'setBlockedURLs', {
  //      urls: [
  //        '*googlesyndication.com*',
  //        '*doubleclick.net*',
  //        '*googleadservices.com*',
  //        '*adservice.google.com*',
  //        '*adsystem.com*',
  //        '*googletagmanager.com*',
  //        '*googletagservices.com*',
  //        '*gpt.js*',
  //      ],
  //    });

  //    console.log('[CDP] Bloqueio de ads ativado com sucesso');
  //  } catch (e) {
  //    console.warn('[CDP] Não foi possível habilitar bloqueio de ads via CDP:', e?.message || e);
  //  }
  //},
};