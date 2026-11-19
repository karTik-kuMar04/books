# Playbook: Data Layer, Contracts & Mock Adapters

## Rule

Every endpoint must have a Zod schema in `src/api/contracts/`. TypeScript types are derived strictly using `z.infer`. Components never call `fetch`; they invoke feature hooks that consume `src/api/client.ts`. The client transparently routes between `mock` and `http` adapters via `NEXT_PUBLIC_API_MODE`.

## Processing States

All AI processing features must handle five standardized states: `queued`, `running`, `ready`, `failed`, `skipped`. When operating on mock data, render a prominent "Sample data" ribbon.

## Examples

### Right

```ts
// Contract in src/api/contracts/book.schema.ts
import { z } from 'zod';

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  mode: z.enum(['story', 'study']),
});

export type Book = z.infer<typeof bookSchema>;

// Feature hook consuming API client
export function useBook(id: string) {
  return useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => apiClient.getBook(id),
  });
}
```

### Wrong

```tsx
// Calling fetch directly inside components (Banned):
export function BookView({ id }: { id: string }) {
  const [data, setData] = useState<any>(null); // Banned: any type + raw fetch
  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);
}
```
