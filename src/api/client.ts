import { env } from '@/lib/env';

export interface ApiClientConfig {
  mode: 'mock' | 'http';
  baseUrl: string;
}

export const apiConfig: ApiClientConfig = {
  mode: env.NEXT_PUBLIC_API_MODE,
  baseUrl: env.NEXT_PUBLIC_API_URL,
};

export const isMockMode = apiConfig.mode === 'mock';
