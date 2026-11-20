'use client';

import * as React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/icons';
import { useTheme } from '@/lib/theme/theme-provider';
import { useProcessingStore } from '@/stores/processing-store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Kbd } from '@/components/ui/kbd';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

export interface TopBarProps {
  onOpenCommandPalette?: () => void;
  className?: string;
}

export function TopBar({ onOpenCommandPalette, className }: TopBarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { openDrawer } = useProcessingStore();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const themeIcon = resolvedTheme === 'dark' ? 'moon' : 'sun';

  return (
    <header
      className={cn(
        'border-border bg-card/90 sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-md',
        className,
      )}
    >
      {/* Brand logo */}
      <div className="flex items-center gap-3">
        <Link
          href="/library"
          className="focus-visible:ring-primary rounded-control flex items-center gap-2 focus-visible:ring-2 focus-visible:outline-none"
          aria-label={`${siteConfig.name} Home`}
        >
          <div className="rounded-control bg-primary text-primary-fg flex h-8 w-8 items-center justify-center">
            <Icon name="book-open" size={20} />
          </div>
          <span className="font-display text-text hidden text-lg font-bold tracking-tight sm:inline">
            {siteConfig.name}
          </span>
        </Link>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="mx-4 flex max-w-md flex-1">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="rounded-control border-border bg-page text-muted hover:border-primary/50 focus-visible:ring-primary flex h-9 w-full cursor-pointer items-center justify-between border px-3 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="flex items-center gap-2">
            <Icon name="search" size={16} />
            <span>Search books, marks, concepts...</span>
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Processing drawer button */}
        <button
          type="button"
          onClick={openDrawer}
          className="rounded-control text-muted hover:text-text hover:bg-page focus-visible:ring-primary relative flex h-10 w-10 cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Background processing tasks"
          title="Background processing tasks"
        >
          <Icon name="bell" size={20} />
          <span className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-control text-muted hover:text-text hover:bg-page focus-visible:ring-primary flex h-10 w-10 cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          aria-label={`Current theme: ${theme}. Tap to switch.`}
          title={`Theme: ${theme}`}
        >
          <Icon name={themeIcon} size={20} />
        </button>

        {/* User profile avatar link */}
        <Link
          href="/settings"
          className="focus-visible:ring-primary ms-1 flex items-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
          aria-label="JR, user settings and account"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
