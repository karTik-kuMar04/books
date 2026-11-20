import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-chip px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-page text-muted border border-border',
        primary: 'bg-primary-soft text-primary-ink',
        amber: 'bg-amber-soft text-amber-ink',
        violet: 'bg-violet-soft text-violet-ink',
        rose: 'bg-rose-soft text-rose-ink',
        success: 'bg-page text-success border border-border',
        error: 'bg-page text-error border border-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
