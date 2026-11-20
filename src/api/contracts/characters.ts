import { z } from 'zod';
import { CharacterSchema, RelationshipSchema } from './shared';

export const GetCharactersResponseSchema = z.object({
  characters: z.array(CharacterSchema),
  relationships: z.array(RelationshipSchema),
  maxChapter: z.number(),
});
export type GetCharactersResponse = z.infer<typeof GetCharactersResponseSchema>;

export const UpdateCharacterPayloadSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(['main', 'supporting', 'minor']).optional(),
  isHidden: z.boolean().optional(),
});
export type UpdateCharacterPayload = z.infer<typeof UpdateCharacterPayloadSchema>;

export const MergeCharactersPayloadSchema = z.object({
  sourceCharacterId: z.string(),
  targetCharacterId: z.string(),
});
export type MergeCharactersPayload = z.infer<typeof MergeCharactersPayloadSchema>;

export const UpdateRelationshipPayloadSchema = z.object({
  type: z.enum(['family', 'allies', 'romance', 'rivals', 'co_occurrence']),
  strength: z.number().min(1).max(10).optional(),
});
export type UpdateRelationshipPayload = z.infer<typeof UpdateRelationshipPayloadSchema>;
