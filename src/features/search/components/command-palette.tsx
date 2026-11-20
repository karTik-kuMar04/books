'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search Folio"
      className={cn(
        'rounded-dialog border-border bg-raised shadow-raised fixed inset-x-3 top-20 z-[70] mx-auto max-w-lg border p-2 md:inset-x-auto md:w-[32rem]',
      )}
    >
      <div className="border-border flex items-center gap-2 border-b px-3">
        <Icon name="search" size={16} />
        <Command.Input
          placeholder="Search pages and books..."
          className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="text-muted p-6 text-center text-sm">No results.</Command.Empty>
        <Command.Group heading="Pages">
          {(
            [
              ['Library', '/library'],
              ['Characters map', '/book/book-pride-and-prejudice/characters'],
              ['Ask this book', '/book/book-cognitive-science/ask'],
              ['Marks', '/marks'],
              ['Vocabulary', '/vocabulary'],
              ['Search', '/search'],
              ['Settings', '/settings'],
            ] as [string, string][]
          ).map(([label, href]) => (
            <Command.Item
              key={href}
              onSelect={() => go(href)}
              className="rounded-control data-[selected=true]:bg-primary-soft data-[selected=true]:text-primary-ink flex min-h-11 cursor-pointer items-center gap-2 px-3 text-sm"
            >
              <Icon name="arrow-right" size={16} />
              {label}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
