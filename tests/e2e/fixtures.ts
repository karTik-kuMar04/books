import { test as base, expect } from '@playwright/test';

type Theme = 'light' | 'dark';

export type ThemedFixtures = {
  setPageTheme: (theme: Theme) => Promise<void>;
  themes: Theme[];
};

export const test = base.extend<ThemedFixtures>({
  setPageTheme: async ({ page }, use) => {
    const setPageTheme = async (theme: Theme) => {
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('folio-theme', t);
      }, theme);
    };
    await use(setPageTheme);
  },
  themes: async ({}, use) => {
    await use(['light', 'dark']);
  },
});

export { expect };
