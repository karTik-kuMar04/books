import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

test.describe('Design Gallery Smoke & Visual Regressions', () => {
  for (const theme of ['light', 'dark'] as const) {
    test(`smoke test on /dev/design with theme: ${theme}`, async ({
      page,
      setPageTheme,
    }, testInfo) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Exclude development server HMR websocket notices
          if (text.includes('_next/hmr') || text.includes('WebSocket')) return;
          consoleErrors.push(text);
        }
      });

      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      // Initialize stored theme before page loads
      await page.addInitScript((t) => {
        try {
          window.localStorage.setItem('folio-theme', t);
        } catch {
          // Ignore
        }
      }, theme);

      // Navigate to /dev/design
      await page.goto('/dev/design');
      await setPageTheme(theme);
      await page.waitForLoadState('networkidle');

      // Verify no console or runtime errors occurred
      expect(consoleErrors).toEqual([]);

      // Axe accessibility check: fail on critical or serious violations
      const axeResults = await new AxeBuilder({ page }).analyze();
      const criticalOrSerious = axeResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(criticalOrSerious).toEqual([]);

      // Take full-page screenshot per project and theme
      const projectName = testInfo.project.name;
      await page.screenshot({
        path: `tests/e2e/.screenshots/${projectName}-${theme}.png`,
        fullPage: true,
      });
    });
  }
});
