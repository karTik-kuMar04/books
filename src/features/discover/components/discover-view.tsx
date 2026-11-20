'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { api } from '@/api/client';
import type { Book } from '@/api/contracts/shared';

export function DiscoverView() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [mode, setMode] = React.useState<'all' | 'story' | 'study'>('all');
  const [added, setAdded] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    let active = true;
    api.books.getBooks().then((result) => active && setBooks(result.books));
    return () => {
      active = false;
    };
  }, []);

  const visible = books.filter((book) => mode === 'all' || book.mode === mode);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Discover</h1>
      <PurposeLine>Find what to read next.</PurposeLine>
      <div className="mt-6 flex gap-2">
        {(['all', 'story', 'study'] as const).map((item) => (
          <Button
            key={item}
            size="sm"
            variant={mode === item ? 'primary' : 'outline'}
            onClick={() => setMode(item)}
          >
            {item === 'all' ? 'All' : item === 'story' ? 'Story' : 'Study'}
          </Button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((book) => (
          <Card key={book.id} className="p-5">
            <p className="text-muted text-xs">{book.author}</p>
            <h2 className="font-display text-text mt-1 text-lg font-bold">{book.title}</h2>
            <p className="text-muted mt-2 text-sm">
              {book.mode === 'story' ? 'Story mode' : 'Study mode'} · {book.format.toUpperCase()}
            </p>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => setAdded((current) => new Set(current).add(book.id))}
            >
              {added.has(book.id) ? 'Added to Library' : 'Add to Library'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
