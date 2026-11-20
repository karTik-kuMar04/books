import * as React from 'react';
import { Icon, type IconName } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  icon?: IconName;
  onDismiss?: () => void;
}

export function Banner({
  variant = 'info',
  icon,
  onDismiss,
  children,
  className,
  ...props
}: BannerProps) {
  const defaultIcons: Record<string, IconName> = {
    info: 'info',
    warning: 'alert-triangle',
    error: 'error-circle',
    success: 'check-circle',
  };

  const iconName = icon ?? defaultIcons[variant] ?? 'info';

  const variantStyles = {
    info: 'bg-primary-soft text-primary-ink border-primary/20',
    warning: 'bg-amber-soft text-amber-ink border-amber/30',
    error: 'bg-page text-error border-error/30',
    success: 'bg-primary-soft text-success border-success/30',
  };

  return (
    <div
      role="alert"
      className={cn(
        'rounded-card flex items-center justify-between gap-3 border px-4 py-3 text-sm',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <Icon name={iconName} size={20} className="shrink-0" />
        <div>{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-control focus:ring-primary cursor-pointer p-1 opacity-70 hover:opacity-100 focus:ring-2 focus:outline-none"
          aria-label="Dismiss banner"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}
