import { NotConnectedError } from '@/api/errors';
import type { GetVocabResponse, UpdateVocabMasteryPayload } from '@/api/contracts/vocabulary';

export const httpVocabularyAdapter = {
  async getVocabulary(_bookId?: string): Promise<GetVocabResponse> {
    throw new NotConnectedError('vocabulary.getVocabulary');
  },
  async updateMastery(_id: string, _payload: UpdateVocabMasteryPayload): Promise<void> {
    throw new NotConnectedError('vocabulary.updateMastery');
  },
};
