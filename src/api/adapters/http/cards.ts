import { NotConnectedError } from '@/api/errors';
import type {
  GetDecksResponse,
  GetCardsResponse,
  ReviewCardPayload,
  CreateCardPayload,
} from '@/api/contracts/cards';

export const httpCardsAdapter = {
  async getDecks(_bookId: string): Promise<GetDecksResponse> {
    throw new NotConnectedError('cards.getDecks');
  },
  async getCards(_deckId: string): Promise<GetCardsResponse> {
    throw new NotConnectedError('cards.getCards');
  },
  async reviewCard(_payload: ReviewCardPayload): Promise<void> {
    throw new NotConnectedError('cards.reviewCard');
  },
  async createCard(_payload: CreateCardPayload): Promise<void> {
    throw new NotConnectedError('cards.createCard');
  },
};
