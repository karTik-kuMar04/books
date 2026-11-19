# Playbook: System Architecture & Dependency Direction

## Rule

Follow strict unidirectional dependencies: `app` -> `features` -> `components`, `lib`, `api`, `stores`, `hooks`, `config`. Features must never import internal files from other features; consume another feature only via its public `index.ts`. Primitives in `components/ui` import only `lib` and `components/icons`.

## Layer Responsibilities

- `src/app/`: Thin route shells only (<40 lines). No business logic, data fetching orchestration, or direct state mutation.
- `src/features/<name>/`: Cohesive domain features. Internal folders: `components/`, `hooks/`, `api/`, `model/`. Only export public interfaces from `index.ts`.
- `src/components/ui/`: Headless or styled presentation primitives built with Radix and CVA.
- `src/lib/`: Domain-agnostic utilities (`cn`, `storage`, `theme`). Imports nothing from `features` or `components`.

## Examples

### Right

```ts
// In src/app/(app)/library/page.tsx:
import { LibraryView } from '@/features/library';

export default function LibraryPage() {
  return <LibraryView />;
}

// In src/features/reader/components/ReaderToolbar.tsx:
import { Icon } from '@/components/icons/icons';
import { cn } from '@/lib/cn';
import { useMarks } from '@/features/marks'; // Imported from public index.ts
```

### Wrong

```ts
// Direct internal cross-feature import (Strictly Banned by ESLint):
import { MarkButton } from '@/features/marks/components/MarkButton';

// Business logic inside route:
export default async function Page() {
  const data = await fetch('/api/books'); // Wrong: components never call fetch
  return <div>{/* 100+ lines of UI */}</div>;
}
```
