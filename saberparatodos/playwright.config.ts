import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4399';
const useWebServer = process.env.PLAYWRIGHT_USE_WEBSERVER
  ? process.env.PLAYWRIGHT_USE_WEBSERVER === '1'
  : baseURL.includes('localhost') || baseURL.includes('127.0.0.1');

export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: ['**/unit/**', '**/validation/**', '**/integration/**', '**/e2e-exhaustive-matrix.spec.ts'], // vitest tests live under these folders
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  timeout: 120000, // 2 minutes per test
  expect: {
    timeout: 30000
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
  },
  webServer: process.env.CI || !useWebServer ? undefined : {
    command: 'node ../node_modules/astro/bin/astro.mjs dev --port 4399',
    port: 4399,
    reuseExistingServer: false,
    timeout: 120000,
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
