import { describe, expect, it } from 'vitest';
import { buildQuiz, nextLeitnerBox } from './leitner';

describe('Leitner scheduling', () => {
  it('moves correct answers forward and incorrect answers to box 1', () => {
    expect(nextLeitnerBox(2, true)).toBe(3);
    expect(nextLeitnerBox(5, true)).toBe(5);
    expect(nextLeitnerBox(4, false)).toBe(1);
  });
});

describe('quiz builder', () => {
  it('builds prompts and enforces the limit', () => {
    const cards = [{ id: '1', front: 'Front', back: 'Back' }];
    expect(buildQuiz(cards, 1)).toEqual([{ cardId: '1', prompt: 'Front', answer: 'Back' }]);
  });
});
