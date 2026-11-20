'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { api } from '@/api/client';
import type { Card as StudyCard, Deck } from '@/api/contracts/shared';

export function CardsView({ id }: { id: string }) {
  const [decks, setDecks] = React.useState<Deck[]>([]);
  const [cards, setCards] = React.useState<StudyCard[]>([]);
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    api.cards.getDecks(id).then((result) => {
      if (!active) return;
      setDecks(result.decks);
      if (result.decks[0]) {
        api.cards
          .getCards(result.decks[0].id)
          .then((cardResult) => active && setCards(cardResult.cards));
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  const current = cards[index];
  const review = async (result: 'correct' | 'incorrect') => {
    if (!current) return;
    await api.cards.reviewCard({ cardId: current.id, result });
    setIndex((value) => (value + 1) % Math.max(cards.length, 1));
    setFlipped(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Study cards</h1>
      <PurposeLine>Practise what you marked.</PurposeLine>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {decks.map((deck) => (
          <Card key={deck.id} className="p-4">
            <h2 className="text-sm font-semibold">{deck.title}</h2>
            <p className="text-muted mt-1 text-xs">
              {deck.dueCount} due · {deck.cardCount} cards
            </p>
          </Card>
        ))}
      </div>

      {current ? (
        <Card className="mt-8 min-h-72 p-6 text-center">
          {current.isAiGenerated && <AiChip label="AI" />}
          <p className="text-muted mt-4 text-xs">
            Card {index + 1} of {cards.length}
          </p>
          <button
            type="button"
            onClick={() => setFlipped(!flipped)}
            className="focus-visible:ring-primary mt-8 min-h-32 w-full text-center focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="font-display text-text text-xl font-bold">
              {flipped ? current.back : current.front}
            </span>
          </button>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => void review('incorrect')}>
              Again
            </Button>
            <Button onClick={() => void review('correct')}>Correct</Button>
          </div>
        </Card>
      ) : (
        <Card className="mt-8 p-8 text-center">
          <p className="text-muted text-sm">No cards are due. Add a card to start this deck.</p>
        </Card>
      )}
    </div>
  );
}
