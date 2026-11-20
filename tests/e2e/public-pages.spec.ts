import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

const routes = [
  '/',
  '/demo',
  '/help',
  '/legal',
  '/auth',
  '/welcome',
  '/library',
  '/book/book-pride-and-prejudice',
  '/book/book-pride-and-prejudice/read',
  '/book/book-pride-and-prejudice/characters',
  '/book/book-cognitive-science/concepts',
  '/book/book-cognitive-science/ask',
  '/book/book-cognitive-science/cards',
  '/marks',
  '/vocabulary',
  '/search',
  '/discover',
  '/settings/profile',
  '/settings/ai',
  '/admin',
];

test.describe('Public pages and Welcome', () => {
  for (const theme of ['light', 'dark'] as const) {
    for (const route of routes) {
      test(`${route} renders in ${theme}`, async ({ page, setPageTheme }, testInfo) => {
        await page.addInitScript((storedTheme) => {
          localStorage.setItem('folio-theme', storedTheme);
        }, theme);

        await page.goto(route);
        await setPageTheme(theme);
        await page.waitForLoadState('networkidle');

        await expect(page.locator('h1:visible').first()).toBeVisible();

        const axeResults = await new AxeBuilder({ page }).analyze();
        const criticalOrSerious = axeResults.violations.filter(
          (violation) => violation.impact === 'critical' || violation.impact === 'serious',
        );
        expect(criticalOrSerious).toEqual([]);

        await page.screenshot({
          path: `tests/e2e/.screenshots/${testInfo.project.name}-${theme}-${route === '/' ? 'landing' : route.slice(1)}.png`,
          fullPage: true,
        });
      });
    }
  }
});
