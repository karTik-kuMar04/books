import * as React from 'react';
import { Icon } from '@/components/icons/icons';
import { cn } from '@/lib/cn';
import type { Evidence } from '@/api/contracts/shared';

export interface EvidenceLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  evidence: Evidence;
  onOpen?: (evidence: Evidence) => void;
  showIcon?: boolean;
}

export function EvidenceLink({
  evidence,
  onOpen,
  showIcon = true,
  className,
  children,
  ...props
}: EvidenceLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(evidence)}
      className={cn(
        'text-primary focus:ring-primary rounded-control inline-flex cursor-pointer items-center gap-1 text-xs font-medium hover:underline focus:ring-2 focus:ring-offset-1 focus:outline-none',
        className,
      )}
      title={`Source: ${evidence.chapterTitle}`}
      {...props}
    >
      {showIcon && <Icon name="evidence" size={16} className="shrink-0" />}
      <span>{children ?? 'Evidence'}</span>
    </button>
  );
}
