import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_MODE: z.enum(['mock', 'http']).default('mock'),
  NEXT_PUBLIC_API_URL: z.string().optional().default(''),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
