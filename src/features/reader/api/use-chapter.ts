'use client';

import * as React from 'react';
import { api } from '@/api/client';
import type { GetChapterResponse } from '@/api/contracts/books';

export function useChapter(bookId: string, chapterId: string) {
  const [data, setData] = React.useState<GetChapterResponse>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    let active = true;
    api.books
      .getChapter(bookId, chapterId)
      .then((result) => active && setData(result))
      .catch(
        (reason: unknown) =>
          active &&
          setError(reason instanceof Error ? reason.message : 'Could not open this chapter'),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [bookId, chapterId]);

  return { data, loading, error };
}
