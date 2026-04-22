import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  timeout: 120000,
  workers: 1,
  fullyParallel: false,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    // ✅ Always use Chromium in CI
    browserName: 'chromium',

    // ✅ Headless in CI, headed locally
    headless: isCI,

    baseURL: 'https://automationexercise.com',

    video: isCI ? 'off' : 'on',
    screenshot: 'off',
    trace: 'retain-on-failure',

    viewport: { width: 1280, height: 800 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      // ✅ Clean project naming
      name: isCI ? 'Chromium CI' : 'Microsoft Edge Local',
      use: isCI
        ? { browserName: 'chromium' }
        : { browserName: 'chromium', channel: 'msedge' },
    },
  ],
});
