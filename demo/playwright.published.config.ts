import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: '../tests/published-e2e',
  fullyParallel: false,
  workers: 1,
  webServer: {
    command: 'vite ../published-demo --host 127.0.0.1 --port 4174',
    url: 'http://127.0.0.1:4174/',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://127.0.0.1:4174/',
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROME_PATH
      ? {executablePath: process.env.PLAYWRIGHT_CHROME_PATH}
      : {},
  },
  projects: [
    {
      name: 'mobile-published',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 390, height: 844},
        deviceScaleFactor: 1,
        hasTouch: true,
      },
    },
    {name: 'desktop-published', use: {...devices['Desktop Chrome']}},
  ],
});
