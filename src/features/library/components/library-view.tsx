'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { StatusChip } from '@/components/patterns/status-chip';
import { EmptyState } from '@/components/patterns/empty-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/icons/icons';
import { useBooks } from '../api/use-books';

export function LibraryView() {
  const router = useRouter();
  const [mode, setMode] = React.useState<'all' | 'story' | 'study'>('all');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [uploadStage, setUploadStage] = React.useState<string>();
  const { data, loading, error } = useBooks(mode === 'all' ? undefined : { mode });

  const startUpload = () => {
    setUploadStage('Checking the file');
    setTimeout(() => setUploadStage('Finding chapters'), 500);
    setTimeout(() => setUploadStage('Mapping people or ideas'), 1100);
    setTimeout(() => setUploadStage('Preparing study cards'), 1700);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Library</h1>
          <PurposeLine>Your books.</PurposeLine>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="upload" size={16} className="me-2" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload and analysis</DialogTitle>
              <DialogDescription>Only you can see this book. Delete it any time.</DialogDescription>
            </DialogHeader>
            <button
              type="button"
              onClick={startUpload}
              className="rounded-card border-border bg-page focus-visible:ring-primary flex min-h-32 w-full flex-col items-center justify-center gap-2 border-2 border-dashed focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon name="upload" size={24} className="text-primary" />
              <span className="text-sm font-semibold">Drop a PDF, EPUB, or TXT</span>
              <span className="text-muted text-xs">You can leave while analysis continues.</span>
            </button>
            {uploadStage && (
              <div className="space-y-2" aria-live="polite">
                <p className="text-sm font-semibold">{uploadStage}</p>
                <div className="bg-primary-soft h-2 overflow-hidden rounded-full">
                  <div className="bg-primary h-full w-3/5" />
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUploadStage('Characters failed — retry available')}
              >
                Simulate failed
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUploadStage('Study cards skipped — AI features are off')}
              >
                Simulate skipped
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2" aria-label="Filter by mode">
            {(['all', 'story', 'study'] as const).map((item) => (
              <Button
                key={item}
                variant={mode === item ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMode(item)}
              >
                {item === 'all' ? 'All' : item === 'story' ? 'Story' : 'Study'}
              </Button>
            ))}
          </div>
          <IconButtonView onChange={setView} />
        </div>

        {loading && <p className="text-muted text-sm">Loading your books...</p>}
        {error && <p className="text-error text-sm">{error}</p>}
        {!loading && data?.books.length === 0 && (
          <EmptyState
            title="No books here yet"
            description="Try a sample book to fill this space."
            actionLabel="Try a sample book"
            onAction={() => router.push('/demo')}
          />
        )}
        {data && (
          <div
            className={view === 'grid' ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-3'}
          >
            {data.books.map((book) => (
              <Card key={book.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-muted text-xs">{book.author}</p>
                    <h2 className="font-display text-text mt-1 text-lg font-bold">{book.title}</h2>
                  </div>
                  <StatusChip state={book.featureStatuses.textExtraction ?? 'queued'} />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-muted text-xs">{book.progressPercent}% read</span>
                  <Link
                    href={`/book/${book.id}`}
                    className="text-primary text-sm font-semibold underline"
                  >
                    Open book
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function IconButtonView({ onChange }: { onChange: (view: 'grid' | 'list') => void }) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        aria-label="Grid view"
        onClick={() => onChange('grid')}
        className="rounded-control border-border flex h-11 w-11 items-center justify-center border"
      >
        <Icon name="grid" size={16} />
      </button>
      <button
        type="button"
        aria-label="List view"
        onClick={() => onChange('list')}
        className="rounded-control border-border flex h-11 w-11 items-center justify-center border"
      >
        <Icon name="list" size={16} />
      </button>
    </div>
  );
}
