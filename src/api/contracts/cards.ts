import { z } from 'zod';
import { CardSchema, DeckSchema } from './shared';

export const GetDecksResponseSchema = z.object({
  decks: z.array(DeckSchema),
  totalCards: z.number(),
  totalDueCards: z.number(),
});
export type GetDecksResponse = z.infer<typeof GetDecksResponseSchema>;

export const GetCardsResponseSchema = z.object({
  cards: z.array(CardSchema),
});
export type GetCardsResponse = z.infer<typeof GetCardsResponseSchema>;

export const ReviewCardPayloadSchema = z.object({
  cardId: z.string(),
  result: z.enum(['correct', 'incorrect']),
});
export type ReviewCardPayload = z.infer<typeof ReviewCardPayloadSchema>;

export const CreateCardPayloadSchema = z.object({
  deckId: z.string(),
  front: z.string().min(1),
  back: z.string().min(1),
  chapterId: z.string().optional(),
});
export type CreateCardPayload = z.infer<typeof CreateCardPayloadSchema>;
