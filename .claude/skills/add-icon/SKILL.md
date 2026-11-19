---
name: add-icon
description: Safely add a new custom SVG icon to Folio's single icon registry.
---

# Adding a Custom Icon

Follow these steps to add an icon to Folio:

1. **Verify Uniqueness**:
   - Inspect `src/components/icons/icons.tsx`.
   - Ensure an icon with the intended concept or visual metaphor does not already exist.

2. **Name by Semantic Intent**:
   - Assign a descriptive name in kebab-case representing meaning, not literal geometry (e.g. `chapter-next`, `audio-speed`).

3. **Draw According to Spec**:
   - Read the complete specification in [docs/ai/icons.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/icons.md).
   - 24 by 24 viewBox with a 2px safe margin (live drawing area 20 by 20).
   - Default stroke: `fill="none"`, `stroke="currentColor"`, strokeWidth 1.75.
   - Corners rounded with radius 2 on rectangles (`rx="2"`).
   - Round line caps (`strokeLinecap="round"`) and round line joins (`strokeLinejoin="round"`).
   - Fills permitted only on dots (radius 1.25 or less) or explicit filled variants (`bookmark-filled`, `star-filled`).
   - Never use hex codes, gradients, or opacity values. Maximum ~6 SVG path elements.

4. **Insert into Registry**:
   - Locate the appropriate category in `src/components/icons/icons.tsx` (Navigation, Reader, Understanding, Marks, Status).
   - Place the icon entry in strict alphabetical order within its group.

5. **Preview in Design Gallery**:
   - Launch dev server (`pnpm dev`) and navigate to `/dev/design`.
   - Inspect the icon rendered at 16px, 20px, and 24px across both Stone (light) and Night (dark) themes.
   - Verify optical centering and visual balance relative to surrounding icons.

6. **Verify with Tests**:
   - Run `pnpm test src/components/icons/icons.test.tsx`.
   - Confirm the icon passes viewBox, fill, uniqueness, and hex color checks.
