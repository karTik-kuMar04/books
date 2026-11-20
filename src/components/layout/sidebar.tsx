'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

interface RailItem {
  label: string;
  href: string;
  icon: IconName;
}

const RAIL_ITEMS: RailItem[] = [
  { label: 'Library', href: '/library', icon: 'library' },
  { label: 'Discover', href: '/discover', icon: 'discover' },
  { label: 'Search', href: '/search', icon: 'search' },
  { label: 'Marks', href: '/marks', icon: 'marks' },
  { label: 'Vocabulary', href: '/vocabulary', icon: 'meaning' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
];

export function IconRail({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar Icon Rail"
      className={cn(
        'border-border bg-card hidden w-16 shrink-0 flex-col items-center gap-4 border-e py-4 md:flex xl:hidden',
        className,
      )}
    >
      {RAIL_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/library' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={cn(
              'rounded-control focus-visible:ring-primary flex h-11 w-11 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none',
              isActive
                ? 'bg-primary-soft text-primary-ink font-semibold'
                : 'text-muted hover:text-text hover:bg-page',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon name={item.icon} size={20} />
            <span className="sr-only">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Application Sidebar"
      className={cn(
        'border-border bg-card hidden w-64 shrink-0 flex-col justify-between border-e p-4 xl:flex',
        className,
      )}
    >
      <div className="space-y-1">
        <p className="text-muted mb-2 px-3 text-[11px] font-bold tracking-wider uppercase">
          Workspace
        </p>
        {RAIL_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/library' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-control focus-visible:ring-primary flex min-h-[44px] items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                isActive
                  ? 'bg-primary-soft text-primary-ink font-semibold'
                  : 'text-muted hover:text-text hover:bg-page',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom info section */}
      <div className="rounded-card border-border bg-page text-muted border p-3 text-xs">
        <p className="text-text font-semibold">Folio Reader</p>
        <p className="mt-1">Private, local-first reader that explains your books.</p>
        <Link
          href="/help"
          className="text-primary mt-2 inline-flex items-center gap-1 hover:underline"
        >
          <Icon name="help" size={16} />
          Help & Glossary
        </Link>
      </div>
    </aside>
  );
}
