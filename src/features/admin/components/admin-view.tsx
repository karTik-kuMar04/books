'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { StatusChip } from '@/components/patterns/status-chip';
import { api } from '@/api/client';
import type { Job } from '@/api/contracts/shared';

export function AdminView() {
  const [authorized] = React.useState(true);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [activeCount, setActiveCount] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    api.processing.getJobs().then((result) => {
      if (!active) return;
      setJobs(result.jobs);
      setActiveCount(result.activeCount);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!authorized)
    return (
      <div className="p-8">
        <PurposeLine>Open this on an authorized account.</PurposeLine>
      </div>
    );

  const totalCost = jobs.reduce((total, job) => total + job.costUsd, 0);

  return (
    <div>
      <div className="p-8 xl:hidden">
        <h1 className="font-display text-2xl font-bold">Admin jobs</h1>
        <p className="text-muted mt-2 text-sm">Open this on a larger screen.</p>
      </div>
      <div className="mx-auto hidden max-w-7xl px-4 py-8 md:px-8 xl:block">
        <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Admin jobs</h1>
        <PurposeLine>Pipeline health.</PurposeLine>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Card className="p-4">
            <p className="text-muted text-xs">Queue depth</p>
            <p className="text-text mt-1 text-2xl font-bold">{activeCount}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted text-xs">Job count</p>
            <p className="text-text mt-1 text-2xl font-bold">{jobs.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted text-xs">Mock cost</p>
            <p className="text-text mt-1 text-2xl font-bold">${totalCost.toFixed(3)}</p>
          </Card>
        </div>
        <div className="mt-6 space-y-3">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">{job.bookTitle}</h2>
                  <p className="text-muted mt-1 text-xs">
                    {job.totalDurationSeconds}s · ${job.costUsd.toFixed(3)}
                  </p>
                </div>
                <StatusChip state={job.status} />
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-5">
                {job.stages.map((stage) => (
                  <div key={stage.name} className="rounded-card border-border border p-2">
                    <p className="text-muted text-[11px]">{stage.name}</p>
                    <StatusChip state={stage.status} reason={stage.errorMessage} className="mt-2" />
                  </div>
                ))}
              </div>
              {job.status === 'failed' && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => void api.processing.retryJob({ jobId: job.id })}
                >
                  Retry
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
