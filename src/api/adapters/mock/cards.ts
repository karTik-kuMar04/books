import {
  GetDecksResponse,
  GetCardsResponse,
  ReviewCardPayload,
  CreateCardPayload,
  GetDecksResponseSchema,
  GetCardsResponseSchema,
} from '@/api/contracts/cards';
import { SAMPLE_DECKS, SAMPLE_CARDS } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

const decks = [...SAMPLE_DECKS];
let cards = [...SAMPLE_CARDS];

export const mockCardsAdapter = {
  async getDecks(bookId: string): Promise<GetDecksResponse> {
    await simulateDelay();
    const bookDecks = decks.filter((d) => d.bookId === bookId);
    const activeDecks = bookDecks.length > 0 ? bookDecks : SAMPLE_DECKS;
    const totalCards = activeDecks.reduce((sum, d) => sum + d.cardCount, 0);
    const totalDue = activeDecks.reduce((sum, d) => sum + d.dueCount, 0);

    return GetDecksResponseSchema.parse({
      decks: activeDecks,
      totalCards,
      totalDueCards: totalDue,
    });
  },

  async getCards(deckId: string): Promise<GetCardsResponse> {
    await simulateDelay();
    const deckCards = cards.filter((c) => c.deckId === deckId);
    return GetCardsResponseSchema.parse({
      cards: deckCards.length > 0 ? deckCards : SAMPLE_CARDS,
    });
  },

  async reviewCard(payload: ReviewCardPayload): Promise<void> {
    await simulateDelay(30);
    cards = cards.map((c) => {
      if (c.id !== payload.cardId) return c;
      const newBox = payload.result === 'correct' ? Math.min(c.box + 1, 5) : 1;
      return {
        ...c,
        box: newBox,
        lastReviewedAt: new Date().toISOString(),
      };
    });
  },

  async createCard(payload: CreateCardPayload): Promise<void> {
    await simulateDelay(50);
    cards.push({
      id: `card-${Date.now()}`,
      bookId: 'book-cognitive-science',
      deckId: payload.deckId,
      chapterId: payload.chapterId,
      front: payload.front,
      back: payload.back,
      box: 1,
      nextReviewDate: new Date().toISOString(),
      isAiGenerated: false,
    });
  },
};
