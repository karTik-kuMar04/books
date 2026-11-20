import { z } from 'zod';
import { VocabEntrySchema } from './shared';

export const GetVocabResponseSchema = z.object({
  entries: z.array(VocabEntrySchema),
  total: z.number(),
});
export type GetVocabResponse = z.infer<typeof GetVocabResponseSchema>;

export const UpdateVocabMasteryPayloadSchema = z.object({
  mastery: z.enum(['learning', 'reviewing', 'mastered']),
});
export type UpdateVocabMasteryPayload = z.infer<typeof UpdateVocabMasteryPayloadSchema>;
