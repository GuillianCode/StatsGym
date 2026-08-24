import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: '../tests/e2e',
  fullyParallel: false,
  workers: 1,
  webServer: {command: 'npm run dev -- --port 4173', port: 4173, reuseExistingServer: true},
  use: {
    baseURL: 'http://127.0.0.1:4173/StatsGym/',
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROME_PATH ? {executablePath: process.env.PLAYWRIGHT_CHROME_PATH} : {},
  },
  projects: [
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 390, height: 844},
        deviceScaleFactor: 1,
        hasTouch: true,
      },
    },
    {name: 'desktop', use: {...devices['Desktop Chrome']}},
  ],
});
