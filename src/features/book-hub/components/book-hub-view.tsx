'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { StatusChip } from '@/components/patterns/status-chip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/icons/icons';
import { useBook } from '../api/use-book';

export function BookHubView({ id }: { id: string }) {
  const { data, loading, error } = useBook(id);
  const [deleted, setDeleted] = React.useState(false);

  if (loading)
    return (
      <div className="p-8">
        <p className="text-muted text-sm">Loading book...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-8">
        <p className="text-error text-sm">{error}</p>
      </div>
    );
  if (!data || deleted)
    return (
      <div className="mx-auto max-w-3xl p-8 text-center">
        <h1 className="font-display text-text text-2xl font-bold">
          {deleted ? 'Book deleted' : 'Book not found'}
        </h1>
        <Link href="/library">
          <Button className="mt-6">Back to Library</Button>
        </Link>
      </div>
    );

  const { book, chapters } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <PurposeLine>Everything about this book.</PurposeLine>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm">{book.author}</p>
          <h1 className="font-display text-text mt-1 text-3xl font-bold">{book.title}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this book?</DialogTitle>
              <DialogDescription>This removes the mock book and its saved Marks.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button variant="destructive" onClick={() => setDeleted(true)}>
                Delete book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(book.featureStatuses).map(([name, status]) => (
          <StatusChip key={name} state={status} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_20rem]">
        <Card className="p-5">
          <h2 className="font-display text-text text-xl font-bold">Chapters</h2>
          <div className="mt-4 space-y-3">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/book/${book.id}/read`}
                className="rounded-card border-border hover:bg-page flex items-start justify-between gap-3 border p-4"
              >
                <div>
                  <p className="text-text text-sm font-semibold">{chapter.title}</p>
                  <p className="text-muted mt-1 text-xs">
                    {chapter.summary?.text ?? 'Summary appears as analysis finishes.'}
                  </p>
                  {chapter.authorIdea && (
                    <p className="text-violet-ink mt-2 text-xs">
                      <span className="bg-violet-soft mr-1 rounded-full px-2 py-0.5 text-xs font-semibold">
                        AI
                      </span>
                      Author’s idea: {chapter.authorIdea.text}
                    </p>
                  )}
                </div>
                <Icon name="chevron-right" size={16} className="text-muted mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="text-text text-sm font-semibold">Quick actions</h2>
            <div className="mt-3 grid gap-2">
              <Link href={`/book/${book.id}/read`}>
                <Button className="w-full">Read</Button>
              </Link>
              <Link href={`/book/${book.id}/${book.mode === 'story' ? 'characters' : 'concepts'}`}>
                <Button variant="outline" className="w-full">
                  {book.mode === 'story' ? 'Characters map' : 'Concepts map'}
                </Button>
              </Link>
              <Link href={`/book/${book.id}/ask`}>
                <Button variant="outline" className="w-full">
                  Ask this book
                </Button>
              </Link>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="text-text text-sm font-semibold">Progress</h2>
            <div className="bg-primary-soft mt-3 h-2 overflow-hidden rounded-full">
              <div className="bg-primary h-full" style={{ width: `${book.progressPercent}%` }} />
            </div>
            <p className="text-muted mt-2 text-xs">{book.progressPercent}% complete</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
