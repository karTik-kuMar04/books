'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme/theme-provider';
import { ToastContainer } from '@/components/ui/toast';
import { SampleDataRibbon } from '@/components/patterns/sample-data-ribbon';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

export interface PublicShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicShell({ children, className }: PublicShellProps) {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Demo', href: '/demo' },
    { label: 'Help', href: '/help' },
    { label: 'Legal', href: '/legal' },
  ];

  return (
    <div className="bg-page text-text flex min-h-screen flex-col">
      <SampleDataRibbon />

      {/* Public Header */}
      <header className="border-border bg-card/90 sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="focus-visible:ring-primary rounded-control flex items-center gap-2 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={`${siteConfig.name} Home`}
          >
            <div className="rounded-control bg-primary text-primary-fg flex h-9 w-9 items-center justify-center">
              <Icon name="book-open" size={20} />
            </div>
            <span className="font-display text-text text-xl font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          <nav aria-label="Public Navigation" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-control hover:text-text focus-visible:ring-primary flex min-h-[36px] items-center px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                    isActive ? 'text-primary font-semibold' : 'text-muted',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-control text-muted hover:text-text hover:bg-page focus-visible:ring-primary flex h-10 w-10 cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
            aria-label={`Current theme: ${theme}. Tap to switch.`}
            title={`Theme: ${theme}`}
          >
            <Icon name={resolvedTheme === 'dark' ? 'moon' : 'sun'} size={20} />
          </button>

          <Link href="/demo">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Try a sample book
            </Button>
          </Link>

          <Link href="/auth">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Public Page Main Body */}
      <main className={cn('w-full flex-1 focus:outline-none', className)} tabIndex={-1}>
        {children}
      </main>

      {/* Public Footer */}
      <footer className="border-border bg-card text-muted border-t px-4 py-8 text-center text-xs md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Your books stay private to you.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/help" className="hover:text-text">
              Help & FAQ
            </Link>
            <Link href="/legal" className="hover:text-text">
              Privacy & Terms
            </Link>
            <Link href="/dev/design" className="hover:text-text">
              Design System
            </Link>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
