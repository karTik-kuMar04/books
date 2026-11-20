import {
  GetProcessingJobsResponse,
  RetryJobPayload,
  GetProcessingJobsResponseSchema,
} from '@/api/contracts/processing';
import { SAMPLE_JOBS } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

let jobs = [...SAMPLE_JOBS];

export const mockProcessingAdapter = {
  async getJobs(): Promise<GetProcessingJobsResponse> {
    await simulateDelay();
    const active = jobs.filter((j) => j.status === 'queued' || j.status === 'running').length;

    return GetProcessingJobsResponseSchema.parse({
      jobs,
      activeCount: active,
    });
  },

  async retryJob(payload: RetryJobPayload): Promise<void> {
    await simulateDelay(50);
    jobs = jobs.map((j) => {
      if (j.id !== payload.jobId) return j;
      return {
        ...j,
        status: 'running',
        stages: j.stages.map((s) => ({
          ...s,
          status: s.status === 'failed' ? 'running' : s.status,
          errorMessage: undefined,
        })),
      };
    });
  },
};
