import { z } from 'zod';
import { UserSessionSchema, UserSettingsSchema, UsageStatsSchema } from './shared';

export const SignInWithEmailPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
});
export type SignInWithEmailPayload = z.infer<typeof SignInWithEmailPayloadSchema>;

export const AuthResponseSchema = z.object({
  session: UserSessionSchema,
  token: z.string().optional(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const GetSettingsResponseSchema = z.object({
  settings: UserSettingsSchema,
  usage: UsageStatsSchema,
});
export type GetSettingsResponse = z.infer<typeof GetSettingsResponseSchema>;

export const UpdateSettingsPayloadSchema = UserSettingsSchema.partial();
export type UpdateSettingsPayload = z.infer<typeof UpdateSettingsPayloadSchema>;
