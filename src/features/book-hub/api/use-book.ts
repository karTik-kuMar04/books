'use client';

import * as React from 'react';
import { api } from '@/api/client';
import type { GetBookResponse } from '@/api/contracts/books';

export function useBook(id: string) {
  const [data, setData] = React.useState<GetBookResponse>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    let active = true;
    api.books
      .getBook(id)
      .then((result) => active && setData(result))
      .catch(
        (reason: unknown) =>
          active && setError(reason instanceof Error ? reason.message : 'Could not load this book'),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { data, loading, error };
}
