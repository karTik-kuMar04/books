import { NotConnectedError } from '@/api/errors';
import type {
  AskQuestionPayload,
  AskQuestionResponse,
  GetQaHistoryResponse,
} from '@/api/contracts/ask';

export const httpAskAdapter = {
  async getHistory(_bookId: string): Promise<GetQaHistoryResponse> {
    throw new NotConnectedError('ask.getHistory');
  },
  async askQuestion(_payload: AskQuestionPayload): Promise<AskQuestionResponse> {
    throw new NotConnectedError('ask.askQuestion');
  },
};
