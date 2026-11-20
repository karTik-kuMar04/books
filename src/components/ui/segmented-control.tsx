'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'default';
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = 'default',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'rounded-control bg-page border-border inline-flex items-center border p-1 select-none',
        size === 'sm' ? 'h-9 text-xs' : 'h-11 text-sm',
        className,
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-control focus-visible:ring-primary flex flex-1 cursor-pointer items-center justify-center gap-1.5 px-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              size === 'sm' ? 'h-7 px-2' : 'h-9 min-h-[36px] px-3',
              isSelected ? 'bg-card text-text shadow-sm' : 'text-muted hover:text-text',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
