import {
  GetConceptsResponse,
  ToggleKeyPointImportancePayload,
  GetConceptsResponseSchema,
} from '@/api/contracts/concepts';
import { SAMPLE_CONCEPTS, SAMPLE_CONCEPT_LINKS, SAMPLE_KEY_POINTS } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

const concepts = [...SAMPLE_CONCEPTS];
const links = [...SAMPLE_CONCEPT_LINKS];
let keyPoints = [...SAMPLE_KEY_POINTS];

export const mockConceptsAdapter = {
  async getConcepts(bookId: string): Promise<GetConceptsResponse> {
    await simulateDelay();
    const bookConcepts = concepts.filter((c) => c.bookId === bookId);
    const bookLinks = links.filter((l) => l.bookId === bookId);
    const bookKp = keyPoints.filter((kp) => kp.bookId === bookId);

    return GetConceptsResponseSchema.parse({
      concepts: bookConcepts.length > 0 ? bookConcepts : SAMPLE_CONCEPTS,
      links: bookLinks.length > 0 ? bookLinks : SAMPLE_CONCEPT_LINKS,
      keyPoints: bookKp.length > 0 ? bookKp : SAMPLE_KEY_POINTS,
    });
  },

  async toggleKeyPoint(id: string, payload: ToggleKeyPointImportancePayload): Promise<void> {
    await simulateDelay(30);
    keyPoints = keyPoints.map((kp) => {
      if (kp.id !== id) return kp;
      return { ...kp, isImportant: payload.isImportant };
    });
  },
};
