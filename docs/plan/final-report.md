# Folio — Final Report

## Layer Status

| Layer | Status      | Gate                                                                |
| ----- | ----------- | ------------------------------------------------------------------- |
| A     | Complete    | `pnpm e2e` and `pnpm verify` passed                                 |
| 0     | Complete    | foundations, contracts, mocks, tokens and gallery                   |
| 1     | Complete    | public and auth routes                                              |
| 2     | Complete    | library, upload, processing and book hub                            |
| 3     | Implemented | virtual Reader, settings, selection, speech, bookmarks and end card |
| 4     | Complete    | Characters graph, list twin, profile, evidence and edits            |
| 5     | Complete    | Concepts, Ask and Study cards                                       |
| 6     | Complete    | Marks, Vocabulary, Search, palette and Discover                     |
| 7     | Complete    | Settings, exports and destructive confirmations                     |
| 8     | Complete    | Admin, manifest, service worker and route accessibility checks      |

## Verification

- `pnpm verify`: lint, hex check, typecheck, 35 unit tests and production build passed.
- `pnpm e2e`: 126 tests passed across 390×844, 820×1180 and 1440×900 in Stone and Night themes.
- Axe serious/critical checks passed in the route matrix.
- Build compiled 18 application routes, including dynamic settings and book routes.

## Mock Scope

The application remains on the mock API adapters. HTTP adapters throw `NotConnectedError`. Backend replacement should connect one adapter family at a time through `src/api/client.ts`.
