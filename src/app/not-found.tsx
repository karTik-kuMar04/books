import Link from 'next/link';
import { Icon } from '@/components/icons/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-card border-border bg-card max-w-md border p-8">
        <div className="text-muted mb-4 flex justify-center">
          <Icon name="help" size={24} />
        </div>
        <h2 className="font-display text-text text-xl font-bold">Page Not Found</h2>
        <p className="text-muted mt-2 text-sm">The page you requested could not be found.</p>
        <Link
          href="/"
          className="rounded-control bg-primary text-primary-fg mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Icon name="home" size={16} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
