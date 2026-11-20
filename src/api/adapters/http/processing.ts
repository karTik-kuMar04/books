import { NotConnectedError } from '@/api/errors';
import type { GetProcessingJobsResponse, RetryJobPayload } from '@/api/contracts/processing';

export const httpProcessingAdapter = {
  async getJobs(): Promise<GetProcessingJobsResponse> {
    throw new NotConnectedError('processing.getJobs');
  },
  async retryJob(_payload: RetryJobPayload): Promise<void> {
    throw new NotConnectedError('processing.retryJob');
  },
};
