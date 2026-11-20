import {
  GetMarksParams,
  GetMarksResponse,
  CreateMarkPayload,
  UpdateMarkPayload,
  GetMarksResponseSchema,
} from '@/api/contracts/marks';
import { SAMPLE_MARKS } from '@/mocks/sample-data';
import { simulateDelay } from './simulate';

let marks = [...SAMPLE_MARKS];

export const mockMarksAdapter = {
  async getMarks(params?: GetMarksParams): Promise<GetMarksResponse> {
    await simulateDelay();
    let filtered = [...marks];

    if (params?.bookId) {
      filtered = filtered.filter((m) => m.bookId === params.bookId);
    }
    if (params?.type) {
      filtered = filtered.filter((m) => m.type === params.type);
    }
    if (params?.meaning) {
      filtered = filtered.filter((m) => m.meaning === params.meaning);
    }
    if (params?.chapterId) {
      filtered = filtered.filter((m) => m.chapterId === params.chapterId);
    }

    return GetMarksResponseSchema.parse({
      marks: filtered,
      total: filtered.length,
    });
  },

  async createMark(payload: CreateMarkPayload): Promise<void> {
    await simulateDelay(40);
    marks.unshift({
      id: `mark-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },

  async updateMark(id: string, payload: UpdateMarkPayload): Promise<void> {
    await simulateDelay(30);
    marks = marks.map((m) => {
      if (m.id !== id) return m;
      return {
        ...m,
        ...(payload.noteText !== undefined ? { noteText: payload.noteText } : {}),
        ...(payload.meaning ? { meaning: payload.meaning } : {}),
        updatedAt: new Date().toISOString(),
      };
    });
  },

  async deleteMark(id: string): Promise<void> {
    await simulateDelay(30);
    marks = marks.filter((m) => m.id !== id);
  },
};
