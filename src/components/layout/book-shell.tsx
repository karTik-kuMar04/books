'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/icons/icons';
import { Badge } from '@/components/ui/badge';
import { TopBar } from './top-bar';
import { BottomBar, type BottomBarItem } from './bottom-bar';
import { ToastContainer } from '@/components/ui/toast';
import { SampleDataRibbon } from '@/components/patterns/sample-data-ribbon';
import { cn } from '@/lib/cn';
import type { BookMode } from '@/api/contracts/shared';

export interface BookShellProps {
  bookId: string;
  bookTitle: string;
  author: string;
  mode: BookMode;
  children: React.ReactNode;
  sidePanelSlot?: React.ReactNode;
  audioPlayerSlot?: React.ReactNode;
}

export function BookShell({
  bookId,
  bookTitle,
  author,
  mode,
  children,
  sidePanelSlot,
  audioPlayerSlot,
}: BookShellProps) {
  const pathname = usePathname();

  // Tab definitions: Read, Characters or Concepts, Ask, Marks, Cards
  const tabs: { label: string; href: string; icon: IconName }[] = [
    { label: 'Read', href: `/book/${bookId}/read`, icon: 'book-open' },
    mode === 'story'
      ? { label: 'Characters', href: `/book/${bookId}/characters`, icon: 'characters' }
      : { label: 'Concepts', href: `/book/${bookId}/concepts`, icon: 'concepts' },
    { label: 'Ask', href: `/book/${bookId}/ask`, icon: 'ask' },
    { label: 'Marks', href: `/book/${bookId}/marks`, icon: 'marks' },
    { label: 'Cards', href: `/book/${bookId}/cards`, icon: 'cards' },
  ];

  const bottomNavItems: BottomBarItem[] = tabs.map((t) => ({
    label: t.label,
    href: t.href,
    icon: t.icon,
  }));

  return (
    <div className="bg-page text-text flex min-h-screen flex-col">
      <SampleDataRibbon />
      <TopBar />

      {/* Book Workspace Subheader */}
      <div className="border-border bg-card/95 sticky top-14 z-30 flex items-center justify-between border-b px-4 py-2 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/book/${bookId}`}
            className="text-muted hover:text-text flex shrink-0 items-center gap-1.5 text-xs transition-colors"
            title="Return to Book Hub"
          >
            <Icon name="arrow-left" size={16} />
            <span className="hidden sm:inline">Hub</span>
          </Link>

          <div className="bg-border h-4 w-px shrink-0" />

          <Link
            href={`/book/${bookId}`}
            className="font-display text-text hover:text-primary focus-visible:ring-primary rounded-control truncate text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            title={`${bookTitle} by ${author}`}
          >
            {bookTitle}
          </Link>

          <Badge variant={mode === 'story' ? 'rose' : 'primary'} className="shrink-0 text-[10px]">
            {mode === 'story' ? 'Story' : 'Study'}
          </Badge>
        </div>

        {/* Desktop / Tablet Navigation Tabs */}
        <nav aria-label="Book Workspace Tabs" className="hidden items-center gap-1 md:flex">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'rounded-control focus-visible:ring-primary flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                  isActive
                    ? 'bg-primary-soft text-primary-ink font-semibold'
                    : 'text-muted hover:text-text hover:bg-page',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area + Optional Docked Side Panel */}
      <div className="relative flex w-full flex-1 overflow-hidden">
        <main
          className="w-full flex-1 overflow-y-auto pb-20 focus:outline-none md:pb-6"
          tabIndex={-1}
        >
          {children}
        </main>

        {sidePanelSlot && (
          <aside className="border-border bg-card hidden w-96 max-w-md shrink-0 overflow-y-auto border-s lg:block">
            {sidePanelSlot}
          </aside>
        )}
      </div>

      {/* Persistent Read-Aloud player dock */}
      {audioPlayerSlot && (
        <div className="border-border bg-raised sticky bottom-16 z-35 w-full border-t p-2 shadow-sm md:bottom-0">
          {audioPlayerSlot}
        </div>
      )}

      {/* Mobile Segmented Bottom Bar for Book */}
      <BottomBar items={bottomNavItems} />

      <ToastContainer />
    </div>
  );
}
