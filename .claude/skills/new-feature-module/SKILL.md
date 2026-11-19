---
name: new-feature-module
description: Scaffold and configure a complete new feature domain module in Folio.
---

# Scaffolding a Feature Module

Follow this workflow to create a new domain feature module:

1. **Create the Feature Folder Structure**:
   - Create `src/features/<feature-name>/`.
   - Add standard subfolders:
     - `components/`: Feature-internal UI components.
     - `hooks/`: Feature query and UI hooks.
     - `api/`: API endpoint functions and adapter calls.
     - `model/`: Zod schemas, derived types, and pure domain logic.

2. **Establish the Public Interface**:
   - Create `src/features/<feature-name>/index.ts`.
   - Export ONLY the top-level view components, public hooks, and shared types.
   - All internal implementation details remain private to the feature.
   - External files must only import from `@/features/<feature-name>`.

3. **Add the Route Entry**:
   - Create the corresponding route in `src/app/(app)/` or `src/app/(public)/`.
   - Keep `page.tsx` thin (<40 lines). It should only compose the feature component and pass route parameters.

4. **Define Data Contracts & Adapters**:
   - If data is required, define contracts in `src/api/contracts/`.
   - Create realistic mock data in `src/api/adapters/mock/`.
   - Implement the HTTP client stub in `src/api/adapters/http/`.
   - Support standard processing states (`queued`, `running`, `ready`, `failed`, `skipped`).

5. **Register Feature Flags**:
   - Add a configuration toggle in `src/api/flags.ts` if the feature is experimental or gradual.

6. **Architecture Verification**:
   - Review [docs/ai/architecture.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/architecture.md).
   - Run `pnpm lint` to ensure strict import restrictions are respected.
