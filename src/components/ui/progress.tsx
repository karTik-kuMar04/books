import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export function Progress({ value = 0, max = 100, className, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      role="progressbar"
      aria-label={props['aria-label'] ?? 'Progress'}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('bg-border relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <div
        className="bg-primary h-full transition-all duration-200"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export interface ProgressRingProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  value = 0,
  size = 24,
  strokeWidth = 3,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className={cn('shrink-0 -rotate-90', className)}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-border opacity-40"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="none"
        className="text-primary transition-all duration-200"
      />
    </svg>
  );
}
