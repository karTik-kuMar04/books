import {
  GetVocabResponse,
  UpdateVocabMasteryPayload,
  GetVocabResponseSchema,
} from '@/api/contracts/vocabulary';
import { SAMPLE_VOCABULARY } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

let vocabulary = [...SAMPLE_VOCABULARY];

export const mockVocabularyAdapter = {
  async getVocabulary(bookId?: string): Promise<GetVocabResponse> {
    await simulateDelay();
    const entries = bookId ? vocabulary.filter((v) => v.bookId === bookId) : vocabulary;

    return GetVocabResponseSchema.parse({
      entries,
      total: entries.length,
    });
  },

  async updateMastery(id: string, payload: UpdateVocabMasteryPayload): Promise<void> {
    await simulateDelay(30);
    vocabulary = vocabulary.map((v) => {
      if (v.id !== id) return v;
      return { ...v, mastery: payload.mastery };
    });
  },
};
