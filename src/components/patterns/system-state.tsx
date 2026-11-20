import * as React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export type SystemStateType =
  'not-found' | 'error' | 'offline' | 'unsupported-file' | 'session-expired' | 'limit-reached';

export interface SystemStateProps extends React.HTMLAttributes<HTMLDivElement> {
  type: SystemStateType;
  title?: string;
  description?: string;
  onRetry?: () => void;
  details?: string;
}

export function SystemState({
  type,
  title,
  description,
  onRetry,
  details,
  className,
  ...props
}: SystemStateProps) {
  const configs: Record<
    SystemStateType,
    { icon: IconName; defaultTitle: string; defaultDesc: string; actionText?: string }
  > = {
    'not-found': {
      icon: 'help',
      defaultTitle: 'Page not found',
      defaultDesc: 'The page or resource you requested could not be located.',
      actionText: 'Return Home',
    },
    error: {
      icon: 'alert-triangle',
      defaultTitle: 'Something went wrong',
      defaultDesc: 'An unexpected application error occurred while processing your request.',
      actionText: 'Try Again',
    },
    offline: {
      icon: 'cloud-off',
      defaultTitle: 'You are offline',
      defaultDesc:
        'Network connection is unavailable. Downloaded books in your library remain readable offline.',
      actionText: 'View Downloaded Books',
    },
    'unsupported-file': {
      icon: 'file-text',
      defaultTitle: 'Unsupported file format',
      defaultDesc:
        'We support standard EPUB, TXT, and digital PDFs. Scanned image-only PDFs or DRM-protected files cannot be extracted.',
      actionText: 'Learn More in Help',
    },
    'session-expired': {
      icon: 'lock',
      defaultTitle: 'Session expired',
      defaultDesc:
        'Your sign-in session has expired. Please sign in again to continue accessing your library.',
      actionText: 'Sign In',
    },
    'limit-reached': {
      icon: 'clock',
      defaultTitle: 'Daily limit reached',
      defaultDesc:
        'You have reached your daily quota for AI questions. Free questions reset tomorrow at midnight.',
      actionText: 'View Usage & Limits',
    },
  };

  const config = configs[type];

  return (
    <div
      role="region"
      aria-label={config.defaultTitle}
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center p-6 text-center',
        className,
      )}
      {...props}
    >
      <div className="rounded-card border-border bg-card max-w-md border p-8 shadow-sm">
        <div className="text-muted mb-4 flex justify-center">
          <Icon name={config.icon} size={24} />
        </div>
        <h2 className="font-display text-text text-xl font-bold">{title ?? config.defaultTitle}</h2>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          {description ?? config.defaultDesc}
        </p>

        {details && (
          <div className="rounded-control bg-page border-border text-muted mt-3 border p-2.5 text-start font-mono text-xs">
            {details}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-3">
          {type === 'error' && onRetry ? (
            <Button onClick={onRetry} variant="primary">
              <Icon name="retry" size={16} />
              {config.actionText}
            </Button>
          ) : type === 'not-found' ? (
            <Link href="/library">
              <Button variant="primary">
                <Icon name="library" size={16} />
                Go to Library
              </Button>
            </Link>
          ) : type === 'offline' ? (
            <Link href="/library">
              <Button variant="primary">
                <Icon name="library" size={16} />
                My Library
              </Button>
            </Link>
          ) : type === 'unsupported-file' ? (
            <Link href="/help">
              <Button variant="primary">
                <Icon name="help" size={16} />
                View Help Guide
              </Button>
            </Link>
          ) : type === 'session-expired' ? (
            <Link href="/auth">
              <Button variant="primary">
                <Icon name="user" size={16} />
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href="/settings">
              <Button variant="primary">
                <Icon name="settings" size={16} />
                View Settings
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
