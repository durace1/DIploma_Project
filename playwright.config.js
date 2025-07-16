// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [['line'], ['allure-playwright', {
      detail: true,
      resultsDir: "allure-results",
      suiteTitle: false
    }]
  ],
  use: {
    //baseURL: 'https://apichallenges.herokuapp.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10 * 1000, // 10 секунд на каждое действие (click, fill)
    navigationTimeout: 15 * 1000, // 15 секунд на переходы (page.goto)
    expectTimeout: 5 * 1000, // 5 секунд на ожидания (expect)
  },

  projects: [
    {
      name: 'UI',
      testMatch: '**/UI/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://realworld.qa.guru/',  
      },
    },
    {
      name: 'API',
      testMatch: '**/API/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://apichallenges.herokuapp.com/',  
      },
    },
  ],
});

