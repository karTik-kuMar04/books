'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { api } from '@/api/client';
import { searchDocuments, type SearchDocument } from '../model/search-engine';

export function SearchView() {
  const [query, setQuery] = React.useState('');
  const [scope, setScope] = React.useState<'Books' | 'Marks' | 'Vocabulary'>('Books');
  const [documents, setDocuments] = React.useState<SearchDocument[]>([]);

  React.useEffect(() => {
    let active = true;
    Promise.all([api.books.getBooks(), api.marks.getMarks(), api.vocabulary.getVocabulary()]).then(
      ([books, marks, vocabulary]) => {
        if (!active) return;
        setDocuments([
          ...books.books.map((book) => ({
            id: book.id,
            title: book.title,
            text: `${book.author} ${book.tags.join(' ')}`,
            scope: 'Books' as const,
            href: `/book/${book.id}`,
          })),
          ...marks.marks.map((mark) => ({
            id: mark.id,
            title: mark.chapterTitle,
            text: mark.selectedText,
            scope: 'Marks' as const,
            href: `/book/${mark.bookId}/read`,
          })),
          ...vocabulary.entries.map((entry) => ({
            id: entry.id,
            title: entry.word,
            text: entry.meaningInContext.text,
            scope: 'Vocabulary' as const,
            href: '/vocabulary',
          })),
        ]);
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const results = searchDocuments(
    documents.filter((document) => document.scope === scope),
    query,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Search</h1>
      <PurposeLine>Search your books and Marks.</PurposeLine>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search your library"
        placeholder="Search..."
        className="rounded-control border-border bg-card mt-6 h-11 w-full border px-3 text-sm"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {(['Books', 'Marks', 'Vocabulary'] as const).map((item) => (
          <Button
            key={item}
            size="sm"
            variant={scope === item ? 'primary' : 'outline'}
            onClick={() => setScope(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {results.map((result) => (
          <Link key={result.id} href={result.href}>
            <Card className="hover:bg-page p-4">
              <h2 className="text-sm font-semibold">{result.title}</h2>
              <p className="text-muted mt-1 text-sm">{result.text}</p>
            </Card>
          </Link>
        ))}
        {query && results.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted text-sm">No results. Try another search.</p>
          </Card>
        )}
        {!query && (
          <Card className="p-8 text-center">
            <p className="text-muted text-sm">
              Enter a search to find books, Marks, or vocabulary.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
