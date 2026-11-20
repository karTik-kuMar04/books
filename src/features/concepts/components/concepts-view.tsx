'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { api } from '@/api/client';
import type { GetConceptsResponse } from '@/api/contracts/concepts';

const GraphCanvas = dynamic(
  () => import('@/components/graph/graph-canvas').then((module) => module.GraphCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="bg-card text-muted rounded-card flex h-80 items-center justify-center border text-sm">
        Loading Concepts map...
      </div>
    ),
  },
);

export function ConceptsView({ id }: { id: string }) {
  const [data, setData] = React.useState<GetConceptsResponse>();
  const [chapter, setChapter] = React.useState('all');

  React.useEffect(() => {
    let active = true;
    api.concepts.getConcepts(id).then((result) => active && setData(result));
    return () => {
      active = false;
    };
  }, [id]);

  if (!data)
    return (
      <div className="p-8">
        <p className="text-muted text-sm">Loading Concepts map...</p>
      </div>
    );

  const keyPoints = data.keyPoints.filter(
    (point) => chapter === 'all' || point.chapterId === chapter,
  );
  const nodes = data.concepts.map((concept) => ({
    id: concept.id,
    name: concept.name,
    role: concept.isImportant ? ('main' as const) : ('supporting' as const),
    mentionCount: concept.mentionCount,
    importanceScore: concept.isImportant ? 0.9 : 0.55,
  }));
  const edges = data.links.map((link) => ({
    id: link.id,
    source: link.sourceConceptId,
    target: link.targetConceptId,
    type: 'allies' as const,
    strength: 7,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Concepts map</h1>
      <PurposeLine>The key ideas and how they relate.</PurposeLine>

      <div className="mt-6">
        <h2 className="font-display text-text text-lg font-bold">Key points</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={chapter === 'all' ? 'primary' : 'outline'}
            onClick={() => setChapter('all')}
          >
            All chapters
          </Button>
          {[
            ...new Set(
              keyPoints.length
                ? keyPoints.map((point) => point.chapterId)
                : data.keyPoints.map((point) => point.chapterId),
            ),
          ].map((chapterId) => (
            <Button
              key={chapterId}
              size="sm"
              variant={chapter === chapterId ? 'primary' : 'outline'}
              onClick={() => setChapter(chapterId)}
            >
              Chapter {chapterId.replace('cog-ch-', '')}
            </Button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {keyPoints.map((point) => (
            <Card key={point.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <AiChip label="AI" />
                  <h3 className="text-text mt-2 text-sm font-semibold">{point.title}</h3>
                  <p className="text-muted mt-1 text-sm">{point.content.text}</p>
                </div>
                <button
                  type="button"
                  aria-label={point.isImportant ? 'Remove importance' : 'Mark important'}
                  onClick={() =>
                    void api.concepts.toggleKeyPoint(point.id, { isImportant: !point.isImportant })
                  }
                  className="text-amber-ink min-h-11 min-w-11"
                >
                  {point.isImportant ? '★' : '☆'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-8 p-4">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          listTwin={({ nodes: listNodes }) => (
            <div className="grid gap-2">
              {listNodes.map((node) => (
                <div
                  key={node.id}
                  className="rounded-card border-border border p-3 text-sm font-semibold"
                >
                  {node.name}
                </div>
              ))}
            </div>
          )}
        />
      </Card>

      <section className="mt-8">
        <h2 className="font-display text-text text-lg font-bold">Glossary</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {data.concepts.map((concept) => (
            <Card key={concept.id} className="p-4">
              <h3 className="text-sm font-semibold">{concept.name}</h3>
              <p className="text-muted mt-1 text-sm">{concept.description.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
