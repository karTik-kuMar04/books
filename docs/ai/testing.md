# Playbook: Quality Gates & Testing

## Rule

Every pull request and commit must pass `pnpm check` (ESLint, TypeScript `tsc --noEmit`, Vitest unit tests). All E2E smoke tests in `tests/e2e` must pass across three viewports (`mobile`: 390x844, `tablet`: 820x1180, `desktop`: 1440x900) in both light and dark themes.

## Test Structure

- Unit Tests: Colocate next to source files as `*.test.ts` or `*.test.tsx`.
- E2E Tests: Place in `tests/e2e/`. Run Playwright with axe-core checks on critical/serious issues.
- Console Errors: Tests must fail if any runtime error or hydration error occurs.

## Examples

### Right

```ts
// Unit test for utility (src/lib/cn.test.ts)
import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

// E2E test with theme fixture and axe
test('design gallery smoke', async ({ page, setPageTheme }) => {
  await page.goto('/dev/design');
  await setPageTheme('dark');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => v.impact === 'critical')).toHaveLength(0);
});
```

### Wrong

```ts
// Ignoring axe violations or console errors:
test('lax test', async ({ page }) => {
  await page.goto('/');
  // Missing accessibility assertion, missing error listeners
});
```
