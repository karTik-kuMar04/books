---
name: ui-review
description: Comprehensive visual and accessibility review using Playwright screenshots and axe-core.
---

# UI Visual & Accessibility Review Protocol

Follow this workflow to perform an end-to-end visual and accessibility audit:

1. **Execute Test Suite**:
   - Run `pnpm e2e` to trigger the Playwright test runner.
   - Playwright automatically tests across three target viewport sizes:
     - `mobile`: 390 by 844
     - `tablet`: 820 by 1180
     - `desktop`: 1440 by 900
   - Both `light` (Stone) and `dark` (Night) themes are captured for each screen.

2. **Inspect Generated Screenshots**:
   - Open `tests/e2e/.screenshots/`.
   - Inspect the captured images across each device category and theme.
   - Verify layout responsiveness, avoiding unwanted overflow, clipping, or visual jank.
   - For reader views, test each of the five reader surfaces (`paper`, `sepia`, `dusk`, `ember`, `black`).

3. **Check Layout Hierarchy & Spacing**:
   - Verify touch targets meet the minimum 44px by 44px threshold.
   - Check that typography scale follows standards (`font-display` for headings, `font-ui` for UI).
   - Verify logical padding and margin alignment (`px`, `py`, `inline`, `block`).

4. **Audit Focus & Accessibility**:
   - Ensure all interactive elements feature visible 2px primary focus rings with 2px offset.
   - Review axe scan results; confirm 0 serious or critical accessibility violations.
   - Verify no console or hydration errors appeared during rendering.

5. **Document Results**:
   - Record any visual discrepancies, adjustments made, and before/after comparisons.
   - Reference: [docs/ai/testing.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/testing.md) and [docs/ai/accessibility.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/accessibility.md).
