import * as React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn('text-muted flex items-center text-xs', className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-text focus-visible:ring-primary rounded-control transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? 'text-text font-medium' : '')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <Icon name="chevron-right" size={16} className="opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
