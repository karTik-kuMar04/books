import { z } from 'zod';
import { MarkSchema, MarkTypeSchema, HighlightMeaningSchema } from './shared';

export const GetMarksParamsSchema = z.object({
  bookId: z.string().optional(),
  type: MarkTypeSchema.optional(),
  meaning: HighlightMeaningSchema.optional(),
  chapterId: z.string().optional(),
});
export type GetMarksParams = z.infer<typeof GetMarksParamsSchema>;

export const GetMarksResponseSchema = z.object({
  marks: z.array(MarkSchema),
  total: z.number(),
});
export type GetMarksResponse = z.infer<typeof GetMarksResponseSchema>;

export const CreateMarkPayloadSchema = z.object({
  bookId: z.string(),
  chapterId: z.string(),
  chapterIndex: z.number(),
  chapterTitle: z.string(),
  type: MarkTypeSchema,
  meaning: HighlightMeaningSchema.optional(),
  startOffset: z.number(),
  endOffset: z.number(),
  selectedText: z.string(),
  noteText: z.string().optional(),
});
export type CreateMarkPayload = z.infer<typeof CreateMarkPayloadSchema>;

export const UpdateMarkPayloadSchema = z.object({
  noteText: z.string().optional(),
  meaning: HighlightMeaningSchema.optional(),
});
export type UpdateMarkPayload = z.infer<typeof UpdateMarkPayloadSchema>;
