'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { StatusChip } from '@/components/patterns/status-chip';
import { Button } from '@/components/ui/button';
import { api } from '@/api/client';
import type { Job } from '@/api/contracts/shared';
import { useProcessingStore } from '@/stores/processing-store';

export function ProcessingDrawer() {
  const { isDrawerOpen, closeDrawer } = useProcessingStore();
  const [jobs, setJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    if (!isDrawerOpen) return;
    let active = true;
    api.processing.getJobs().then((result) => active && setJobs(result.jobs));
    return () => {
      active = false;
    };
  }, [isDrawerOpen]);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Background processing</SheetTitle>
          <SheetDescription>Analysis continues while you read or leave.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3" aria-live="polite">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-card border-border bg-card border p-4">
              <p className="text-text text-sm font-semibold">{job.bookTitle}</p>
              <div className="mt-3 space-y-2">
                {job.stages.map((stage) => (
                  <div key={stage.name} className="flex items-center justify-between gap-3">
                    <span className="text-muted text-xs">{stage.name}</span>
                    <StatusChip state={stage.status} reason={stage.errorMessage} />
                  </div>
                ))}
              </div>
              {job.status === 'failed' && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => api.processing.retryJob({ jobId: job.id })}
                >
                  Retry
                </Button>
              )}
            </div>
          ))}
          {jobs.length === 0 && <p className="text-muted text-sm">No analysis jobs.</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
}
