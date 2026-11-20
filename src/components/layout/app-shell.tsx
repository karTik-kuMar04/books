'use client';

import * as React from 'react';
import { TopBar } from './top-bar';
import { BottomBar } from './bottom-bar';
import { IconRail, Sidebar } from './sidebar';
import { ToastContainer } from '@/components/ui/toast';
import { SampleDataRibbon } from '@/components/patterns/sample-data-ribbon';
import { cn } from '@/lib/cn';

export interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="bg-page text-text flex min-h-screen flex-col">
      <SampleDataRibbon />
      <TopBar />

      <div className="flex w-full flex-1 overflow-hidden">
        {/* Tablet rail (768px - 1279px) */}
        <IconRail />

        {/* Wide sidebar (1280px+) */}
        <Sidebar />

        {/* Content area */}
        <main
          className={cn(
            'w-full flex-1 overflow-y-auto pb-20 focus:outline-none md:pb-6',
            className,
          )}
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom bar (<768px) */}
      <BottomBar />

      {/* Global toasts */}
      <ToastContainer />
    </div>
  );
}
