'use client';

import { Icon } from '@/components/icons/icons';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-page text-text flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="rounded-card border-border bg-card max-w-md border p-8">
          <div className="text-error mb-4 flex justify-center">
            <Icon name="error-circle" size={24} />
          </div>
          <h2 className="font-display text-xl font-bold">Application Error</h2>
          <p className="text-muted mt-2 text-sm">A critical application error occurred.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-control bg-primary text-primary-fg mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
          >
            <Icon name="retry" size={16} />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
