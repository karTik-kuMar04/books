import * as React from 'react';
import { cn } from '@/lib/cn';

export type PurposeLineProps = React.HTMLAttributes<HTMLParagraphElement>;

export function PurposeLine({ className, children, ...props }: PurposeLineProps) {
  return (
    <p className={cn('text-muted mt-1 text-sm leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}
