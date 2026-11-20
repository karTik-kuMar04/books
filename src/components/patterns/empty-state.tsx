import * as React from 'react';
import { Icon, type IconName } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'book-open',
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-card border-border bg-card/50 my-4 flex flex-col items-center justify-center border border-dashed p-8 text-center',
        className,
      )}
      {...props}
    >
      <div className="bg-page text-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="font-display text-text text-base font-semibold">{title}</h3>
      <p className="text-muted mt-1 max-w-sm text-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
