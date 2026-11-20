import * as React from 'react';
import { Icon } from '@/components/icons/icons';
import { ProgressRing } from '@/components/ui/progress';
import { cn } from '@/lib/cn';
import type { ProcessingState } from '@/api/contracts/shared';

export interface StatusChipProps {
  state: ProcessingState;
  stageName?: string;
  progressPercent?: number;
  reason?: string;
  onRetry?: () => void;
  className?: string;
}

export function StatusChip({
  state,
  stageName,
  progressPercent,
  reason,
  onRetry,
  className,
}: StatusChipProps) {
  switch (state) {
    case 'queued':
      return (
        <span
          className={cn(
            'rounded-chip bg-page border-border text-muted inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs',
            className,
          )}
        >
          <Icon name="clock" size={16} className="opacity-70" />
          <span>Waiting</span>
        </span>
      );

    case 'running':
      return (
        <span
          className={cn(
            'rounded-chip bg-primary-soft text-primary-ink inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium',
            className,
          )}
        >
          <ProgressRing value={progressPercent ?? 45} size={14} strokeWidth={2.5} />
          <span>
            {stageName ?? 'Processing'}
            {progressPercent !== undefined ? ` ${Math.round(progressPercent)}%` : ''}
          </span>
        </span>
      );

    case 'ready':
      return (
        <span
          className={cn(
            'rounded-chip bg-page text-success border-border inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium',
            className,
          )}
        >
          <Icon name="check" size={16} />
          <span>Ready</span>
        </span>
      );

    case 'failed':
      return (
        <span
          className={cn(
            'rounded-chip bg-page text-error border-error/30 inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium',
            className,
          )}
        >
          <Icon name="error-circle" size={16} />
          <span>{reason ?? 'Failed'}</span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="ms-1 cursor-pointer underline hover:opacity-80 focus:outline-none"
            >
              Retry
            </button>
          )}
        </span>
      );

    case 'skipped':
      return (
        <span
          className={cn(
            'rounded-chip bg-page border-border text-muted inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs',
            className,
          )}
          title={reason ?? 'Skipped'}
        >
          <span className="font-bold">—</span>
          <span>{reason ?? 'Skipped'}</span>
        </span>
      );
  }
}
