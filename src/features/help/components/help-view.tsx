'use client';

import * as React from 'react';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { Icon } from '@/components/icons/icons';

const glossary = [
  ['Characters map', 'Who is in a story and how they connect.'],
  ['Concepts map', 'The key ideas in a study text and how they relate.'],
  ['Key points', 'Important ideas grouped by chapter.'],
  ['Ask this book', 'Questions answered with passages from the book.'],
  ['Study cards', 'Practice cards made from important text.'],
  ['Marks', 'Your highlights, notes, and bookmarks.'],
  ['Meaning', 'A word explained in the context of the passage.'],
  ['Author’s idea', 'A plain summary of what the chapter suggests.'],
];

export function HelpView() {
  const [open, setOpen] = React.useState<number | null>(0);
  const faqs = [
    [
      'How do I upload a book?',
      'Use Upload in the Library and choose an EPUB, searchable PDF, or TXT file.',
    ],
    [
      'Why can’t Folio read a scanned PDF?',
      'A scanned PDF contains images of pages, not text. Use an OCR tool to create a searchable PDF, then upload that file.',
    ],
    [
      'What is the difference between Story and Study mode?',
      'Story mode shows characters and relationships. Study mode shows key points, concepts, questions, and cards.',
    ],
    [
      'How can I check an AI answer?',
      'Every AI claim has an Evidence link. Open it to read the cited passage in context.',
    ],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-text text-3xl font-bold">Help</h1>
      <PurposeLine>Answers, and what each word means.</PurposeLine>

      <section className="mt-10">
        <h2 className="font-display text-text text-xl font-bold">FAQ</h2>
        <div className="divide-border mt-4 divide-y">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="focus-visible:ring-primary flex min-h-11 w-full items-center justify-between gap-4 py-3 text-start focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-expanded={open === index}
              >
                <span className="text-sm font-semibold">{question}</span>
                <Icon name={open === index ? 'chevron-up' : 'chevron-down'} size={16} />
              </button>
              {open === index && (
                <p className="text-muted pb-4 text-sm leading-relaxed">{answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-text text-xl font-bold">The eight plain names</h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2">
          {glossary.map(([term, definition]) => (
            <div key={term} className="rounded-card border-border bg-card border p-4">
              <dt className="text-text text-sm font-semibold">{term}</dt>
              <dd className="text-muted mt-1 text-sm">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-text text-xl font-bold">Supported files</h2>
        <p className="text-muted mt-3 text-sm">
          EPUB, searchable PDF, and TXT. Protected EPUB files and scanned PDFs need action before
          upload.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-text text-xl font-bold">Contact</h2>
        <p className="text-muted mt-3 text-sm">
          <a href="mailto:support@folio.app" className="text-primary underline">
            Email support
          </a>
        </p>
      </section>
    </div>
  );
}
