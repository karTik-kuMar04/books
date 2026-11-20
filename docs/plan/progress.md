# Folio — Build Progress

> Tracks every deliverable of Step 2. Updated after every commit.

## Decisions

| #   | Decision                                                                                             | Rationale                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Where the plan says "shadcn/ui", read "Radix primitives + cva + our own styling"                     | Pre-decided correction in prompt                                                                                                                                                                                                |
| 2   | Where the plan says 4 reader surfaces, there are 5 (Paper, Sepia, Dusk, Ember, Pure black)           | Pre-decided correction in prompt (§10)                                                                                                                                                                                          |
| 3   | Community skills (frontend-design, Vercel react-best-practices, web-design-guidelines) not installed | Not available in environment; proceeding with built-in skills and AGENTS.md                                                                                                                                                     |
| 4   | Root `/` route rendered via `src/app/(public)/page.tsx`                                              | Route groups `(group)` are transparent in URL structure; `(public)/page.tsx` serves `/`                                                                                                                                         |
| 5   | Build script uses `next build --webpack`                                                             | Turbopack build in Next 16 has a known subprocess panic with `@tailwindcss/turbopack` on static assets; `next build --webpack` is fully stable and builds all static pages cleanly in 1s. `next dev` continues using Turbopack. |

## Deviations from the Plan

None so far.

## Known Gaps

None in Layer A.

---

## Layer A — Reconcile Step 1

- [x] A1: Run `pnpm e2e` — 6/6 tests passed across mobile (390×844), tablet (820×1180), and desktop (1440×900) in both light and dark themes. Fixed axe rule `scrollable-region-focusable` on `/dev/design` by adding `tabIndex={0}` and `aria-label="Code sample"` to the code `<pre>` block.
- [x] A2: Prove icon ban — added `src/scratch-icon-test.tsx` importing from `lucide-react`. ESLint correctly reported error: `'lucide-react' import is restricted from being used by a pattern. Icons live in src/components/icons/icons.tsx only no-restricted-imports`. Deleted file. Confirmed `package.json` contains zero third-party icon packages.
- [x] A3: Prove palette is closed — confirmed `--color-*: initial;` is defined in `@theme` in `src/styles/globals.css`. Standard Tailwind utility classes outside our semantic tokens (like `bg-blue-500`) are disabled.
- [x] A4: Confirm `AGENTS.md` ≤ 200 lines — confirmed 148 lines.
- [x] A5: Turn off `cacheComponents` in `next.config.ts`, remove Suspense wrappers that existed only for it, and rebuild.
- [x] A6: Remove placeholder `src/app/page.tsx` — landing page lives at `src/app/(public)/page.tsx`.
- [x] A7: First commit exists (`2c58a46`), CI runs `pnpm verify` (updated `.github/workflows/ci.yml`), working tree ready for Layer A commit.
- [x] A8: Noted community skills status in Decisions table (#3).
- [x] A9: Added `pnpm verify` script (`pnpm lint && pnpm typecheck && pnpm test && pnpm build`).
- [x] A10: Installed Step 2 dependencies:
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-tooltip`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slider`
  - `@radix-ui/react-switch`
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-select`
  - `@radix-ui/react-tabs`
  - `@radix-ui/react-avatar`
  - `cmdk`
  - `cytoscape` + `@types/cytoscape`
  - `cytoscape-fcose` + `@types/cytoscape-fcose`
  - `@tanstack/react-virtual`
- [x] Gate A: `pnpm verify` (lint + hex check + typecheck + 13 unit tests + 17-route production build) passed; `pnpm e2e` (6/6 Playwright tests with axe) passed.

---

## Layer 0 — Foundations

- [x] 0.1: Shared types & domain schemas (`AiText`, `Evidence`, `StatusChipState`, `BookMode`, domain IDs) in `src/api/contracts/shared.ts`
- [x] 0.2: API contracts (`src/api/contracts/`):
  - [x] `shared.ts`
  - [x] `books.ts`
  - [x] `characters.ts`
  - [x] `concepts.ts`
  - [x] `ask.ts`
  - [x] `cards.ts`
  - [x] `marks.ts`
  - [x] `vocabulary.ts`
  - [x] `processing.ts`
  - [x] `auth.ts`
  - [x] `index.ts`
- [x] 0.3: Mock adapters (`src/api/adapters/mock/`) with dev simulation flags (`?simulate=failed|slow|offline|limit`)
- [x] 0.4: HTTP adapter stubs (`src/api/adapters/http/`) throwing `NotConnectedError`
- [x] 0.5: Adapter factory (`src/api/client.ts`) switching on `NEXT_PUBLIC_API_MODE`
- [x] 0.6: TanStack Query provider (`src/lib/query-provider.tsx`) integrated into root layout
- [x] 0.7: Expanded query keys (`src/api/query-keys.ts`)
- [x] 0.8: Core UI components (`src/components/ui/`):
  - [x] Button, IconButton
  - [x] Input, Textarea, Select, Checkbox, Switch, Slider
  - [x] Tabs, SegmentedControl
  - [x] Chip, Badge
  - [x] StatusChip (queued, running, ready, failed, skipped)
  - [x] Card
  - [x] Dialog, Sheet (bottom sheet on mobile), Popover, Tooltip, DropdownMenu, Toast
  - [x] Skeleton, Progress, ProgressRing, Banner, Avatar, Kbd, Breadcrumbs
- [x] 0.9: Layout shells (`src/components/layout/`):
  - [x] AppShell (mobile bottom bar, tablet icon rail, desktop sidebar)
  - [x] BookShell (Read, Characters/Concepts, Ask, Marks, Cards)
  - [x] TopBar (logo, command palette trigger, Processing bell, theme toggle, avatar)
  - [x] PublicShell
- [x] 0.10: Pattern composites (`src/components/patterns/`):
  - [x] `AiChip`
  - [x] `StatusChip`
  - [x] `EvidenceLink`
  - [x] `PurposeLine`
  - [x] `SampleDataRibbon`
  - [x] `EmptyState`
  - [x] `SystemState`
- [x] 0.11: Shared graph (`src/components/graph/`):
  - [x] `GraphCanvas` (Cytoscape + fcose, node cap, neighbour highlight, reduced motion, PNG export, required `listTwin`)
- [x] 0.12: Zustand stores (`src/stores/`): reader state, panel state, processing store
- [x] 0.13: Sample data (`src/mocks/sample-data.ts`):
  - [x] Story: analysed novel (10 characters, 20 relationships, chapter 1 with 8,200 words)
  - [x] Study: analysed study text (key points, concepts, links, glossary, cards, Q&A)
  - [x] Scripts test book (Hindi Devanagari + Arabic RTL)
- [x] 0.14: `/dev/design` gallery updated with all primitives and patterns
- [x] 0.15: Unit tests for contracts, adapters, components, and stores (32 unit tests green)
- [x] Gate 0: Gallery complete; 3 layouts at 3 widths; contracts tested; `pnpm verify` & `pnpm e2e` green

---

## Layer 1 — Public Pages & Auth

- [x] 1.1: P1 Landing (`/`) — purpose line, Story/Study preview, steps, privacy, formats, FAQ, and sample/sign-up actions.
- [x] 1.2: P2 Demo (`/demo`) — sample Reader, map, limited Ask, dismissible sign-up card, and sample-book switch.
- [x] 1.3: P3 Help (`/help`) — FAQ, formats, Story/Study, eight glossary terms, scanned-PDF guidance, and contact.
- [x] 1.4: P4 Legal (`/legal`) — Privacy, Terms, retention, and copyright tabs marked as draft.
- [x] 1.5: P5 Auth (`/auth`) — Sign in/Sign up tabs, email/password form, Google mock action, forgot/reset states.
- [x] 1.6: A1 Welcome (`/welcome`) — reading mode, first book, theme, font, skip and finish actions.
- [x] Gate 1: `pnpm verify` passed (lint, hex check, typecheck, 32 unit tests, 17-route build); `pnpm e2e` passed 42/42 at 390×844, 820×1180, and 1440×900 in both themes with axe serious/critical checks. Public routes: `/`, `/demo`, `/help`, `/legal`, `/auth`, `/welcome`. Landing Cytoscape preview remains dynamically imported with `ssr: false`.

---

## Layer 2 — Library & Upload

- [x] 2.1: A2 Library (`/library`) — sample mock books, mode filters, grid/list controls, upload entry, and empty state.
- [x] 2.2: O1 Upload & analysis overlay — file action, named stages, and failed/skipped simulation controls.
- [x] 2.3: O2 Processing drawer — bell trigger, live jobs, statuses, and retry action.
- [x] 2.4: A3 Book hub (`/book/[id]`) — cover fallback, mode, chapter list, status chips, actions, progress, delete confirmation.
- [x] 2.5: System states — existing `SystemState` variants plus global, route-level not-found and error surfaces.
- [x] Gate 2: `pnpm verify` passed; `pnpm e2e` passed 54/54 across public and app routes at three widths and both themes.

---

## Layer 3 — Reader

- [x] 3.1: A4 Reader (`/book/[id]/read`) — route, mock chapter loading, virtualized paragraph body, and persisted reader position store.
- [x] 3.2: O3 Reader settings (Aa panel) — font, size, width, and five surface controls.
- [x] 3.3: Focus mode — store action exists; toolbar toggle remains a known integration gap.
- [ ] 3.4: Selection menu (Highlight, Note, Meaning, Ask, Copy) — partial text-selection Meaning/close menu only.
- [ ] 3.5: O4 Meaning overlay — partial mock context panel.
- [ ] 3.6: Bookmarks — toolbar control is present but not persisted.
- [ ] 3.7: O5 Read-aloud player — mock docked play/pause state; Web Speech sentence highlighting remains to implement.
- [ ] 3.8: End-of-chapter card — not yet implemented.
- [ ] Gate 3: `pnpm e2e` route smoke passes 60/60; full 8,000-word reflow, exact-offset, speech, and five-surface gates remain known gaps.

---

## Layer 4 — Story Mode

- [ ] 4.1: A5 Characters (`/book/[id]/characters`)
- [ ] 4.2: Character map (Cytoscape)
- [ ] 4.3: List twin
- [ ] 4.4: O6 Profile panel
- [ ] 4.5: O7 Evidence viewer
- [ ] 4.6: Chapter slider ("Up to chapter N")
- [ ] 4.7: Rename, merge, hide actions with Undo
- [ ] Gate 4: Evidence on all links; list twin keyboard-only; slider updates map + list; edits persist; verify & e2e green

---

## Layer 5 — Study Mode

- [ ] 5.1: A6 Concepts (`/book/[id]/concepts`)
- [ ] 5.2: A7 Ask (`/book/[id]/ask`)
- [ ] 5.3: A8 Study cards (`/book/[id]/cards`)
- [ ] Gate 5: Source citations on all answers/cards; no-answer state; review progress persists; Leitner & quiz unit tests; verify & e2e green

---

## Layer 6 — Cross-cutting

- [ ] 6.1: A9 Marks (`/marks`, `/book/[id]/marks`)
- [ ] 6.2: A10 Vocabulary (`/vocabulary`)
- [ ] 6.3: A12 Search (`/search`)
- [ ] 6.4: O8 Command palette (`cmdk`)
- [ ] 6.5: A11 Discover (`/discover`)
- [ ] Gate 6: Search & palette parity; exact offset jumps; search engine unit tests; verify & e2e green

---

## Layer 7 — Settings & Data

- [ ] 7.1: A13 Settings (`/settings/[section]`) — 7 sections
- [ ] 7.2: Export (PDF/MD/CSV)
- [ ] 7.3: Delete book flow
- [ ] 7.4: Usage & limits page
- [ ] Gate 7: AI toggle sets all AI to Skipped; exports valid; typed confirmations on delete; verify & e2e green

---

## Layer 8 — Ops & Polish

- [ ] 8.1: A14 Admin jobs (`/admin/jobs`)
- [ ] 8.2: Offline reading & PWA service worker
- [ ] 8.3: Accessibility pass (axe, keyboard nav, focus rings, list twins, live regions)
- [ ] 8.4: Performance pass (bundle sizes, lazy Cytoscape/cmdk, virtual Reader, node cap)
- [ ] 8.5: Visual pass (screenshots across 3 widths × 2 themes × 5 reader surfaces)
- [ ] 8.6: Final quality verification (`pnpm verify` & `pnpm e2e`)
- [ ] 8.7: `docs/plan/final-report.md`
