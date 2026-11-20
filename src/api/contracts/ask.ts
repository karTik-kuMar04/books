import { z } from 'zod';
import { QaMessageSchema, QaScopeSchema } from './shared';

export const AskQuestionPayloadSchema = z.object({
  bookId: z.string(),
  question: z.string().min(1),
  scope: QaScopeSchema.default('book'),
  chapterId: z.string().optional(),
  passagesOnly: z.boolean().default(false),
});
export type AskQuestionPayload = z.infer<typeof AskQuestionPayloadSchema>;

export const AskQuestionResponseSchema = z.object({
  message: QaMessageSchema,
});
export type AskQuestionResponse = z.infer<typeof AskQuestionResponseSchema>;

export const GetQaHistoryResponseSchema = z.object({
  messages: z.array(QaMessageSchema),
  suggestedQuestions: z.array(z.string()),
});
export type GetQaHistoryResponse = z.infer<typeof GetQaHistoryResponseSchema>;
