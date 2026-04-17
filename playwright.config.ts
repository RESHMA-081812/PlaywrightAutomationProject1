import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 120000,

  outputDir: 'videos',

  workers: 1,
  fullyParallel: false,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    // ✅ Microsoft Edge only
    browserName: 'chromium',
    channel: 'msedge',

    headless: false,

    baseURL: 'https://automationexercise.com',

    // ✅ Full execution video
    video: {
      mode: 'on'
    },

    // ✅ Screenshots handled manually
    screenshot: 'off',

    // ✅ Trace for debugging
    trace: 'retain-on-failure',

    viewport: { width: 1280, height: 800 },

    actionTimeout: 15000,
    navigationTimeout: 30000,

    launchOptions: {
      slowMo: 300
    }
  },

  projects: [
    {
      name: 'Microsoft Edge - AutomationExercise E2E'
    }
  ]
});