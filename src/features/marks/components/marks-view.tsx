'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { api } from '@/api/client';
import type { Mark } from '@/api/contracts/shared';

export function MarksView({ id }: { id?: string }) {
  const [marks, setMarks] = React.useState<Mark[]>([]);
  const [tab, setTab] = React.useState<'bookmark' | 'highlight' | 'note'>('bookmark');

  const load = React.useCallback(() => {
    let active = true;
    api.marks
      .getMarks({ bookId: id, type: tab })
      .then((result) => active && setMarks(result.marks));
    return () => {
      active = false;
    };
  }, [id, tab]);

  React.useEffect(() => {
    load();
  }, [load]);

  const remove = async (markId: string) => {
    await api.marks.deleteMark(markId);
    load();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Marks</h1>
      <PurposeLine>Everything you saved.</PurposeLine>
      <div className="mt-6 flex gap-2">
        {(['bookmark', 'highlight', 'note'] as const).map((item) => (
          <Button
            key={item}
            size="sm"
            variant={tab === item ? 'primary' : 'outline'}
            onClick={() => setTab(item)}
          >
            {item === 'bookmark' ? 'Bookmarks' : item === 'highlight' ? 'Highlights' : 'Notes'}
          </Button>
        ))}
      </div>
      <div className="mt-6 grid gap-3">
        {marks.map((mark) => (
          <Card key={mark.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-muted text-xs">{mark.chapterTitle}</p>
                <p className="text-text mt-1 text-sm">{mark.selectedText}</p>
                {mark.noteText && <p className="text-muted mt-2 text-xs">{mark.noteText}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/book/${mark.bookId}/read`}
                  className="text-primary min-h-11 text-xs font-semibold underline"
                >
                  Jump
                </Link>
                <Button variant="ghost" size="sm" onClick={() => void remove(mark.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {marks.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted text-sm">
              Select text while reading to add a{' '}
              {tab === 'highlight' ? 'highlight' : tab === 'note' ? 'note' : 'bookmark'}.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
