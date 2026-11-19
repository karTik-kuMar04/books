import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icon } from '@/components/icons/icons';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="rounded-card border-border bg-card shadow-raised max-w-md border p-8">
        <div className="text-primary mb-4 flex justify-center">
          <Icon name="book-open" size={24} />
        </div>
        <h1 className="font-display text-text text-2xl font-bold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="text-muted mt-2 text-sm">{siteConfig.description}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dev/design"
            className="rounded-control bg-primary text-primary-fg focus:ring-primary inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Icon name="sparkle" size={16} />
            Design System Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
