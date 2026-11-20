import { z } from 'zod';
import { JobSchema } from './shared';

export const GetProcessingJobsResponseSchema = z.object({
  jobs: z.array(JobSchema),
  activeCount: z.number(),
});
export type GetProcessingJobsResponse = z.infer<typeof GetProcessingJobsResponseSchema>;

export const RetryJobPayloadSchema = z.object({
  jobId: z.string(),
  stageName: z.string().optional(),
});
export type RetryJobPayload = z.infer<typeof RetryJobPayloadSchema>;
