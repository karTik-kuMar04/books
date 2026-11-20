'use client';

import * as React from 'react';
import { api } from '@/api/client';
import type { GetCharactersResponse } from '@/api/contracts/characters';

export function useCharacters(bookId: string) {
  const [data, setData] = React.useState<GetCharactersResponse>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();
  const [revision, setRevision] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    api.characters
      .getCharacters(bookId)
      .then((result) => active && setData(result))
      .catch(
        (reason: unknown) =>
          active &&
          setError(reason instanceof Error ? reason.message : 'Could not load characters'),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [bookId, revision]);

  return {
    data,
    loading,
    error,
    refresh: () => setRevision((value) => value + 1),
  };
}
