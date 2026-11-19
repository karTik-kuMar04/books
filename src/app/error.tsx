'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/icons/icons';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-card border-border bg-card max-w-md border p-8">
        <div className="text-error mb-4 flex justify-center">
          <Icon name="alert-triangle" size={24} />
        </div>
        <h2 className="font-display text-text text-xl font-bold">Something went wrong</h2>
        <p className="text-muted mt-2 text-sm">An error occurred while loading this page.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-control bg-primary text-primary-fg mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Icon name="retry" size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
