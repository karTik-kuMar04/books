'use client';

import * as React from 'react';
import { api } from '@/api/client';
import type { GetBooksParams, GetBooksResponse } from '@/api/contracts/books';

export function useBooks(params?: GetBooksParams) {
  const [data, setData] = React.useState<GetBooksResponse>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();
  const shelf = params?.shelf;
  const mode = params?.mode;
  const search = params?.search;

  React.useEffect(() => {
    let active = true;
    api.books
      .getBooks({
        shelf,
        mode,
        search,
      })
      .then((result) => active && setData(result))
      .catch(
        (reason: unknown) =>
          active &&
          setError(reason instanceof Error ? reason.message : 'Could not load your books'),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [shelf, mode, search]);

  return { data, loading, error };
}
