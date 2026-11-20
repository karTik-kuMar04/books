'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

export interface BottomBarItem {
  label: string;
  href: string;
  icon: IconName;
}

export const MAIN_BOTTOM_NAV: BottomBarItem[] = [
  { label: 'Library', href: '/library', icon: 'library' },
  { label: 'Discover', href: '/discover', icon: 'discover' },
  { label: 'Search', href: '/search', icon: 'search' },
  { label: 'Marks', href: '/marks', icon: 'marks' },
  { label: 'Me', href: '/settings', icon: 'user' },
];

export interface BottomBarProps {
  className?: string;
  items?: BottomBarItem[];
}

export function BottomBar({ className, items = MAIN_BOTTOM_NAV }: BottomBarProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Bottom Navigation"
      className={cn(
        'border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 flex h-16 w-full items-center justify-around border-t px-2 backdrop-blur-md md:hidden',
        className,
      )}
    >
      {items.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/library' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'focus-visible:ring-primary rounded-control flex h-full flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
              isActive ? 'text-primary font-semibold' : 'text-muted hover:text-text',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon name={item.icon} size={20} />
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
