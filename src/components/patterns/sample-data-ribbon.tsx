import * as React from 'react';
import { isMockMode } from '@/api/client';
import { cn } from '@/lib/cn';

export interface SampleDataRibbonProps {
  className?: string;
}

export function SampleDataRibbon({ className }: SampleDataRibbonProps) {
  if (!isMockMode) return null;

  return (
    <div
      className={cn(
        'bg-amber-soft border-amber-ink/20 text-amber-ink w-full border-b px-4 py-1 text-center text-xs font-medium select-none',
        className,
      )}
    >
      <span>Sample data mode — showing mock results from public-domain literature.</span>
    </div>
  );
}
