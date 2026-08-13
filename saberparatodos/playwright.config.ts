import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321';
const useWebServer = process.env.PLAYWRIGHT_USE_WEBSERVER
  ? process.env.PLAYWRIGHT_USE_WEBSERVER === '1'
  : baseURL.includes('localhost') || baseURL.includes('127.0.0.1');

export default defineConfig({
  testDir: './tests',
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
    command: 'rm -rf node_modules/.vite && npm run dev -- --port 4321 --force',
    port: 4321,
    reuseExistingServer: true,
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
