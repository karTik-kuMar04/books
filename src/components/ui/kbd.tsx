import * as React from 'react';
import { cn } from '@/lib/cn';

export type KbdProps = React.HTMLAttributes<HTMLElement>;

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'rounded-control border-border bg-page text-muted pointer-events-none inline-flex h-5 items-center gap-1 border px-1.5 font-mono text-[10px] font-medium shadow-xs select-none',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
