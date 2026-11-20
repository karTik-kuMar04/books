import { z } from 'zod';
import {
  BookSchema,
  ChapterSchema,
  RelatedBookSchema,
  ShelfSchema,
  BookModeSchema,
} from './shared';

export const GetBooksParamsSchema = z.object({
  shelf: ShelfSchema.optional(),
  mode: BookModeSchema.optional(),
  search: z.string().optional(),
});
export type GetBooksParams = z.infer<typeof GetBooksParamsSchema>;

export const GetBooksResponseSchema = z.object({
  books: z.array(BookSchema),
  total: z.number(),
});
export type GetBooksResponse = z.infer<typeof GetBooksResponseSchema>;

export const GetBookResponseSchema = z.object({
  book: BookSchema,
  chapters: z.array(ChapterSchema),
  relatedBooks: z.array(RelatedBookSchema),
});
export type GetBookResponse = z.infer<typeof GetBookResponseSchema>;

export const GetChapterResponseSchema = z.object({
  chapter: ChapterSchema,
  prevChapterId: z.string().nullable(),
  nextChapterId: z.string().nullable(),
});
export type GetChapterResponse = z.infer<typeof GetChapterResponseSchema>;

export const UpdateBookProgressPayloadSchema = z.object({
  chapterId: z.string(),
  offset: z.number(),
  progressPercent: z.number().min(0).max(100),
});
export type UpdateBookProgressPayload = z.infer<typeof UpdateBookProgressPayloadSchema>;

export const UpdateBookModePayloadSchema = z.object({
  mode: BookModeSchema,
});
export type UpdateBookModePayload = z.infer<typeof UpdateBookModePayloadSchema>;
