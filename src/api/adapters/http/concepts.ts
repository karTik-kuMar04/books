import { NotConnectedError } from '@/api/errors';
import type {
  GetConceptsResponse,
  ToggleKeyPointImportancePayload,
} from '@/api/contracts/concepts';

export const httpConceptsAdapter = {
  async getConcepts(_bookId: string): Promise<GetConceptsResponse> {
    throw new NotConnectedError('concepts.getConcepts');
  },
  async toggleKeyPoint(_id: string, _payload: ToggleKeyPointImportancePayload): Promise<void> {
    throw new NotConnectedError('concepts.toggleKeyPoint');
  },
};
