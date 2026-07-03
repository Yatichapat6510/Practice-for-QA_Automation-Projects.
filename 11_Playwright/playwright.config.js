// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/** @see https://playwright.dev/docs/test-configuration */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.js', '**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
