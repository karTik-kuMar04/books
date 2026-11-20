import { z } from 'zod';
import { ConceptSchema, ConceptLinkSchema, KeyPointSchema } from './shared';

export const GetConceptsResponseSchema = z.object({
  concepts: z.array(ConceptSchema),
  links: z.array(ConceptLinkSchema),
  keyPoints: z.array(KeyPointSchema),
});
export type GetConceptsResponse = z.infer<typeof GetConceptsResponseSchema>;

export const ToggleKeyPointImportancePayloadSchema = z.object({
  isImportant: z.boolean(),
});
export type ToggleKeyPointImportancePayload = z.infer<typeof ToggleKeyPointImportancePayloadSchema>;
