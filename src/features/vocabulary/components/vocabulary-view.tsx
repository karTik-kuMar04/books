'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { api } from '@/api/client';
import type { VocabEntry } from '@/api/contracts/shared';

export function VocabularyView() {
  const [entries, setEntries] = React.useState<VocabEntry[]>([]);
  const [query, setQuery] = React.useState('');

  const load = React.useCallback(() => {
    let active = true;
    api.vocabulary.getVocabulary().then((result) => active && setEntries(result.entries));
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const visible = entries.filter((entry) => entry.word.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Vocabulary</h1>
      <PurposeLine>Words you looked up.</PurposeLine>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search Vocabulary"
        placeholder="Search words"
        className="rounded-control border-border bg-card mt-6 h-11 w-full max-w-md border px-3 text-sm"
      />
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {visible.map((entry) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-text text-lg font-bold">{entry.word}</h2>
                <p className="text-muted mt-1 text-sm">{entry.meaningInContext.text}</p>
                <blockquote className="text-muted border-border mt-3 border-s-2 ps-3 text-xs">
                  {entry.sourcePassage.passage}
                </blockquote>
              </div>
              <AiChip label="AI" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-muted text-xs">Mastery: {entry.mastery}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  void api.vocabulary.updateMastery(entry.id, {
                    mastery: entry.mastery === 'mastered' ? 'learning' : 'mastered',
                  })
                }
              >
                Update mastery
              </Button>
            </div>
          </Card>
        ))}
        {visible.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted text-sm">Look up a word while reading to add it here.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
