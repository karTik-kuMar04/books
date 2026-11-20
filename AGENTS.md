# AGENTS.md — Folio Architecture & Engineering Standards

## 1. Project

Folio is a private book reader that explains the book. Users upload a PDF, EPUB, or TXT, read and listen, and explore Characters maps (Story mode) or Concepts, Key points, Ask this book, and Study cards (Study mode).

- Development: `pnpm dev`
- Production Build: `pnpm build`
- Production Start: `pnpm start`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Unit Tests: `pnpm test` (or `pnpm test:watch`)
- End-to-End Tests: `pnpm e2e`
- Quality Verification: `pnpm check` (runs lint, typecheck, and unit tests)

## 2. Stack & Versions

- Runtime: Node >=20 (pinned `24.15.0` in `.nvmrc`), pnpm `11.10.0`
- Framework: Next.js `16.4.6` (App Router)
- UI: React `19.3.0`, React DOM `19.3.0`
- Styling: Tailwind CSS `4.3.3`
- Language: TypeScript `5.9.3` (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`)
- State & Data: `@tanstack/react-query` `5.108.0`, `zustand` `5.1.0`, `zod` `4.6.7`
- Class Utilities: `clsx` `2.1.1`, `tailwind-merge` `3.7.0`, `class-variance-authority` `0.7.1`
- Testing: `vitest` `5.1.1`, `@playwright/test` `1.65.1`, `@axe-core/playwright` `4.14.0`

## 3. Folder Map & Dependency Direction

- Structure:
  - `src/app/`: Thin route entry points only (<40 lines, no business logic).
  - `src/features/<name>/`: Self-contained features with `components/`, `hooks/`, `api/`, `model/`, and public `index.ts`.
  - `src/components/`: `ui/` primitives, `layout/` shells, `patterns/` composites, `graph/` canvas & list twin, `icons/icons.tsx`.
  - `src/api/`: `contracts/`, `adapters/` (`mock/`, `http/`), `client.ts`, `flags.ts`, `query-keys.ts`.
  - `src/lib/`: Shared utilities (`cn.ts`, `theme/`, `storage.ts`, `env.ts`).
  - `src/config/`: `site.ts`, `nav.ts`, `routes.ts`, `limits.ts`, `modes.ts`.
  - `src/styles/`: `globals.css`, `tokens.css`, `reader.css`, `fonts/`.
- Dependency Direction: `app` -> `features` -> `components`, `lib`, `api`, `stores`, `hooks`, `config`.
- `components/ui` imports only `lib` and `components/icons`. `components/graph` imports only `ui`, `lib`, and `components/icons`. `lib` imports nothing from higher layers.
- Cross-feature access is strictly banned: import exclusively from a feature's public `index.ts`.
- See [architecture.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/architecture.md) for details.

## 4. Styling

- Use semantic token classes exclusively (`bg-page`, `bg-card`, `text-text`, `text-muted`, `border-border`, `bg-primary`, etc.).
- Never write hard-coded hex, rgb, hsl, or arbitrary color values.
- Never write `dark:` color overrides; theme tokens automatically adapt to the active `data-theme`.
- Design mobile-first. Restrict layout breakpoints strictly to `md` (768px) and `xl` (1280px).
- Use container queries for modular panes and cards.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`).
- Maintain touch targets of at least 44px by 44px.
- Provide a visible 2px primary focus ring with a 2px offset on every interactive element.
- Use token border radii: 8px (controls), 12px (cards), 16px (dialogs/sheets), full (chips).
- Respect reduced motion (`prefers-reduced-motion: reduce`), setting transitions to 0ms.
- See [styling-and-tokens.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/styling-and-tokens.md) for details.

## 5. Colour Meaning

- `primary`: Interactive controls, buttons, links, progress indicators, and Study mode.
- `amber`: User-generated annotations and marks only.
- `violet`: Exclusively for AI-generated insights, summaries, and agent responses.
- `rose`: Story mode, characters, and narrative relationship webs.
- Never use these colors for unrelated decoration. Never convey meaning through color alone; always pair with an icon or descriptive text.
- See [styling-and-tokens.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/styling-and-tokens.md).

## 6. Typography

- Headings, book titles, and landing hero: `font-display` (Fraunces).
- Interface labels, body copy, and UI metadata: `font-ui` (Inter).
- Reader body text: reader family variables (`--reader-font-family`).
- Never define custom `font-family` strings in components or CSS; load fonts strictly via `src/styles/fonts/`.
- Scale: 12, 14, 16, 20, 24, 30, 38px, and hero (36px mobile / 48px desktop).
- Tabular figures: use the `tabular` utility class.
- See [typography.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/typography.md).

## 7. Icons

- Import icons exclusively from `src/components/icons/icons.tsx` using `<Icon name="..." />`.
- Never install or import third-party icon packages (`lucide-react`, `react-icons`, etc.).
- Follow the 24x24 viewBox, 1.75 stroke weight, round cap/join spec.
- To introduce new icons, follow the `add-icon` skill and document them in [icons.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/icons.md).

## 8. Components & State

- Default to React Server Components. Introduce `'use client'` only at interactive leaves.
- Use named exports for all components and utilities (default exports reserved for Next.js routes/layouts).
- Build component variants with `cva` and merge styles using `cn(...)`.
- Manage server state with TanStack Query and client UI state with Zustand.
- Load heavy libraries (graphs, PDF parsers) lazily with `next/dynamic`.
- Virtualize reader text. Represent reading position strictly as `(chapterId, characterOffset)`.

## 9. Data & Contracts

- Define every endpoint contract with a Zod schema in `src/api/contracts/` and derive types via `z.infer`.
- Never execute raw `fetch` calls in components; use feature hooks backed by `src/api/client.ts`.
- Automatically switch between `mock` and `http` adapters via `NEXT_PUBLIC_API_MODE`.
- Support five universal processing states with `StatusChip`: `queued`, `running`, `ready`, `failed`, `skipped`.
- Render a clear "Sample data" ribbon whenever operating in mock mode.
- See [data-and-mocks.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/data-and-mocks.md).

## 10. Accessibility

- Use semantic HTML elements (`main`, `nav`, `article`, `header`, `button`).
- Ensure every interactive control has an accessible name (`aria-label` or visible text).
- Guarantee full keyboard navigability and visible focus rings.
- Provide accessible list twin views for all visual graphs.
- Announce background AI processing updates through `aria-live` regions.
- Set explicit `lang` and `dir` attributes on reading passages.
- See [accessibility.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/accessibility.md).

## 11. Product Language & UX Copy

- Use direct product terminology: Characters map, Concepts map, Key points, Ask this book, Study cards, Marks, Meaning, Author's idea.
- Display a concise one-line purpose statement directly under every screen title.
- Empty states must explicitly state the action required to populate them.
- All AI insights must feature the violet AI chip and a verified Evidence link to the source text.
- Maintain neutral, objective language for sacred/historical texts: attribute explanations to the source text without claiming "the real meaning".
- See [copy-and-ux.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/copy-and-ux.md).

## 12. Definition of Done

- `pnpm check` passes cleanly (zero lint errors, zero type errors, all unit tests green).
- Playwright E2E visual tests pass across 390px, 820px, and 1440px viewports in both light and dark themes.
- Axe accessibility scan completes with zero serious or critical violations.
- Browser console remains free of errors and hydration warnings.
- The `/dev/design` gallery is updated whenever tokens, fonts, or icons are modified.
- See [testing.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/testing.md).

## 13. Git & Safety

- Write conventional commit messages (`feat:`, `fix:`, `chore:`, etc.) in small, focused increments.
- Never commit `.env` or sensitive credential files.
- Never add unapproved third-party dependencies.
- Immediately halt and seek clarification if a user prompt contradicts repository architecture rules.

## 14. Skills & Precedence

- This file and the internal `.claude/skills/` definitions take strict precedence over community skills.
- External community skills must never override the design tokens, fonts, or icon system.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
