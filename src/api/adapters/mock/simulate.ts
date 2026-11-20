import { SimulationError } from '@/api/errors';

export async function simulateDelay(ms = 80): Promise<void> {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const simulate = params.get('simulate');

    if (simulate === 'failed' || simulate === 'offline' || simulate === 'limit') {
      await new Promise((resolve) => setTimeout(resolve, 50));
      throw new SimulationError(simulate);
    }

    if (simulate === 'slow') {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, ms));
}
