// wdio.conf.js
const fs = require('fs');
const path = require('path');

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
  // Hooks
  // =====

afterTest: async function (test, context, { error }) {
  if (error) {
    const dir = path.resolve(__dirname, 'errorShots');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const safeTitle = String(test.title).replace(/[<>:"/\\|?*\s]+/g, '_');
    const screenshotPath = path.join(dir, `${Date.now()}-${safeTitle}.png`);

    await browser.saveScreenshot(screenshotPath);
    console.log(`📸 Screenshot salvo em: ${screenshotPath}`);
  }
}

};