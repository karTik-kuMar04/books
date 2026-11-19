export type BookId = string;
export type ChapterId = string;

export interface TextPosition {
  chapterId: ChapterId;
  offset: number;
}

export type ProcessingState = 'queued' | 'running' | 'ready' | 'failed' | 'skipped';
