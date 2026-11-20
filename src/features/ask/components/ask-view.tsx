'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { api } from '@/api/client';
import type { GetQaHistoryResponse } from '@/api/contracts/ask';

export function AskView({ id }: { id: string }) {
  const [data, setData] = React.useState<GetQaHistoryResponse>();
  const [question, setQuestion] = React.useState('');
  const [scope, setScope] = React.useState<'book' | 'chapter' | 'marks'>('book');
  const [passagesOnly, setPassagesOnly] = React.useState(false);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    api.ask.getHistory(id).then((result) => active && setData(result));
    return () => {
      active = false;
    };
  }, [id]);

  const submit = async (text: string) => {
    if (!text.trim() || running) return;
    setRunning(true);
    const response = await api.ask.askQuestion({
      bookId: id,
      question: text.trim(),
      scope,
      passagesOnly,
    });
    setData((current) =>
      current ? { ...current, messages: [...current.messages, response.message] } : current,
    );
    setQuestion('');
    setRunning(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Ask this book</h1>
      <PurposeLine>Ask a question. Answers point to the page.</PurposeLine>

      <Card className="mt-6 p-4">
        <SegmentedControl
          value={scope}
          onChange={setScope}
          options={[
            { value: 'book', label: 'Whole book' },
            { value: 'chapter', label: 'This chapter' },
            { value: 'marks', label: 'My Marks' },
          ]}
          className="w-full"
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-muted text-sm">
            {passagesOnly ? 'Passages only' : 'Written answer'}
          </span>
          <button
            type="button"
            role="switch"
            aria-label="Passages only"
            aria-checked={passagesOnly}
            onClick={() => setPassagesOnly(!passagesOnly)}
            className="rounded-chip bg-border relative h-7 w-12"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full transition-transform ${passagesOnly ? 'bg-primary start-6' : 'bg-card start-1'}`}
            />
          </button>
        </div>
      </Card>

      <div className="mt-6 space-y-3" aria-live="polite">
        {data?.messages.map((message) => (
          <Card
            key={message.id}
            className={
              message.role === 'assistant'
                ? 'border-violet/30 border p-4'
                : 'bg-page border-border border p-4'
            }
          >
            {message.role === 'assistant' && <AiChip label="AI" />}
            <p className="text-text mt-2 text-sm leading-relaxed">{message.content.text}</p>
            {(message.citations ?? []).map((citation) => (
              <Link
                key={citation.id}
                href={`/book/${id}/read`}
                className="text-primary mt-3 block text-xs font-semibold underline"
              >
                Evidence · {citation.chapterTitle}
              </Link>
            ))}
          </Card>
        ))}
        {running && (
          <Card className="border-violet/30 border p-4">
            <AiChip label="AI" />
            <p className="text-muted mt-2 text-sm">Finding an answer...</p>
          </Card>
        )}
      </div>

      {data?.suggestedQuestions && (
        <div className="mt-6 flex flex-wrap gap-2">
          {data.suggestedQuestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void submit(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}

      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void submit(question);
        }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about this book"
          aria-label="Your question"
          className="rounded-control border-border bg-card h-11 min-w-0 flex-1 border px-3 text-sm"
        />
        <Button type="submit" disabled={running}>
          Ask
        </Button>
      </form>
    </div>
  );
}
