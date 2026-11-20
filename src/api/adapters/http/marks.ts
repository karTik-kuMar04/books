import { NotConnectedError } from '@/api/errors';
import type {
  GetMarksParams,
  GetMarksResponse,
  CreateMarkPayload,
  UpdateMarkPayload,
} from '@/api/contracts/marks';

export const httpMarksAdapter = {
  async getMarks(_params?: GetMarksParams): Promise<GetMarksResponse> {
    throw new NotConnectedError('marks.getMarks');
  },
  async createMark(_payload: CreateMarkPayload): Promise<void> {
    throw new NotConnectedError('marks.createMark');
  },
  async updateMark(_id: string, _payload: UpdateMarkPayload): Promise<void> {
    throw new NotConnectedError('marks.updateMark');
  },
  async deleteMark(_id: string): Promise<void> {
    throw new NotConnectedError('marks.deleteMark');
  },
};
