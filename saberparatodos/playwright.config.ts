import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://saberparatodos.space',
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
  },
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev -- --port 4333',
    port: 4333,
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
