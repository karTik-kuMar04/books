export function nextLeitnerBox(currentBox: number, correct: boolean): number {
  if (!correct) return 1;
  return Math.min(Math.max(currentBox + 1, 1), 5);
}

export function buildQuiz(cards: Array<{ id: string; front: string; back: string }>, limit = 10) {
  return cards.slice(0, limit).map((card) => ({
    cardId: card.id,
    prompt: card.front,
    answer: card.back,
  }));
}
