import { NotConnectedError } from '@/api/errors';
import type {
  GetBooksParams,
  GetBooksResponse,
  GetBookResponse,
  GetChapterResponse,
  UpdateBookProgressPayload,
  UpdateBookModePayload,
} from '@/api/contracts/books';

export const httpBooksAdapter = {
  async getBooks(_params?: GetBooksParams): Promise<GetBooksResponse> {
    throw new NotConnectedError('books.getBooks');
  },
  async getBook(_id: string): Promise<GetBookResponse> {
    throw new NotConnectedError('books.getBook');
  },
  async getChapter(_bookId: string, _chapterId: string): Promise<GetChapterResponse> {
    throw new NotConnectedError('books.getChapter');
  },
  async updateProgress(_id: string, _payload: UpdateBookProgressPayload): Promise<void> {
    throw new NotConnectedError('books.updateProgress');
  },
  async updateMode(_id: string, _payload: UpdateBookModePayload): Promise<void> {
    throw new NotConnectedError('books.updateMode');
  },
};
