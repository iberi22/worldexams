import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
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
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
  },
  webServer: process.env.CI ? undefined : {
    command: 'powershell -NoProfile -Command "Remove-Item -Recurse -Force node_modules/.vite -ErrorAction SilentlyContinue; npm run dev -- --port 4321 --force"',
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
