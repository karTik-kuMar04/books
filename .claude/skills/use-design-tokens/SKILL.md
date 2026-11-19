---
name: use-design-tokens
description: Guidelines for selecting, consuming, and extending Folio design tokens.
---

# Using Design Tokens

Follow this guide when applying or extending Folio design tokens:

1. **Select Tokens by Semantic Meaning**:
   - `page`: Background of the main viewport.
   - `card`: Elevated cards, panels, and tiles.
   - `raised`: Floating menus, popovers, sheets, and dialogs.
   - `border`: Dividing lines, container borders, and outlines.
   - `text`: Primary body text and headings.
   - `muted`: Subdued text, metadata, captions, and hints.
   - `primary`: Interactive controls, buttons, links, focus rings, Study mode.
   - `amber`: User marks, personal notes, and highlights.
   - `violet`: AI-written content, summaries, chips, and agent outputs.
   - `rose`: Story mode, characters, and narrative relationships.
   - `success`: Completed actions and positive statuses.
   - `error`: Failed operations, destructive actions, and validation errors.

2. **Rules for Consumption**:
   - Always use Tailwind semantic classes (`bg-page`, `text-primary-fg`, `border-border`).
   - Never use arbitrary values or hardcoded hex/rgb strings.
   - Never write `dark:` overrides; tokens automatically adapt to the active theme.

3. **Adding a New Token**:
   - Add the light value under `:root` in `src/styles/tokens.css`.
   - Add the dark value under `[data-theme='dark']` in `src/styles/tokens.css`.
   - Expose the token in `src/styles/globals.css` inside `@theme inline`.
   - Add contrast ratio assertions in `src/styles/tokens.test.ts`.

4. **Verify in Gallery & Run Tests**:
   - Check `/dev/design` to inspect the swatch and live contrast calculation.
   - Run `pnpm test src/styles/tokens.test.ts` to confirm WCAG 2.1 AA/AAA compliance.
   - Reference: [docs/ai/styling-and-tokens.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/styling-and-tokens.md).
