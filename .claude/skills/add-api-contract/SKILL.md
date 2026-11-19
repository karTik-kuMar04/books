---
name: add-api-contract
description: Define type-safe endpoint contracts, mock fixtures, and TanStack Query hooks.
---

# Adding an API Contract

Follow this guide to define a complete type-safe API endpoint in Folio:

1. **Define Schema Contract**:
   - Create `src/api/contracts/<entity>.schema.ts`.
   - Build request and response schemas using Zod.
   - Export inferred TypeScript types via `z.infer<typeof schema>`.
   - Never use `any` or loose untyped objects.

2. **Implement Mock Data Adapter**:
   - Create `src/api/adapters/mock/<entity>.mock.ts`.
   - Provide realistic fixtures reflecting domain models (e.g. realistic book excerpts, chapters, characters).
   - Support standard AI processing states: `queued`, `running`, `ready`, `failed`, `skipped`.

3. **Implement HTTP Client Adapter**:
   - Create `src/api/adapters/http/<entity>.http.ts`.
   - Implement the network call using `src/api/client.ts`.
   - Parse and validate the response payload with your Zod schema before returning.

4. **Register Query Keys**:
   - In `src/api/query-keys.ts`, define factory functions for the query key hierarchy.
   - Ensure keys support selective invalidation (e.g., `books.all`, `books.detail(id)`).

5. **Expose Feature Hook**:
   - In `src/features/<feature>/hooks/use-<entity>.ts`, wrap calls in TanStack Query (`useQuery`, `useMutation`).
   - The unified client automatically routes between mock and http based on `NEXT_PUBLIC_API_MODE`.

6. **Register Feature Flags**:
   - If introducing experimental endpoints, add a toggle in `src/api/flags.ts`.
   - Reference: [docs/ai/data-and-mocks.md](file:///Users/kartikkumar/projects/Personal/book/docs/ai/data-and-mocks.md).
