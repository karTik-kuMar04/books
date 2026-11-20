import React from 'react';
import { PurposeLine } from '@/components/patterns/PurposeLine';
import { Icon } from '@/components/icons/icons';

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      {/* Purpose line */}
      <PurposeLine text="Answers, and what each word means." />

      {/* FAQ Section */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">FAQ</h2>
        <ul className="space-y-4">
          <li>
            <h3 className="font-semibold">How do I upload a book?</h3>
            <p>Use the Upload button on the Library page – you can drop a PDF, EPUB, or TXT.</p>
          </li>
          <li>
            <h3 className="font-semibold">Can I read aloud?</h3>
            <p>Yes, the reader surface includes a text‑to‑speech player.</p>
          </li>
        </ul>
      </section>

      {/* Supported formats */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Supported Formats</h2>
        <p className="flex items-center">
          <Icon name="file-pdf" className="mr-2" />
          PDF, <Icon name="file-text" className="mx-2" />
          EPUB, <Icon name="file-doc" className="ml-2" />
          TXT
        </p>
      </section>

      {/* Story vs Study */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Story vs Study</h2>
        <p>
          Story mode visualises characters and relationships (rose), while Study mode extracts key
          points, concepts and AI‑generated cards (violet).
        </p>
      </section>

      {/* Glossary */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Glossary</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Chapter</strong> – A numbered segment of the book.
          </li>
          <li>
            <strong>Mark</strong> – Your personal annotation (amber).
          </li>
          <li>
            <strong>Concept</strong> – An extracted idea for study.
          </li>
          <li>
            <strong>Character</strong> – A person or entity in the story (rose).
          </li>
          <li>
            <strong>AI Insight</strong> – Generated content (violet).
          </li>
          <li>
            <strong>Action</strong> – Interactive control (primary).
          </li>
          <li>
            <strong>Bookmark</strong> – Saved reading position.
          </li>
          <li>
            <strong>Study Card</strong> – Flash‑card style review item.
          </li>
        </ul>
      </section>

      {/* Scanned PDF note */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Scanned PDFs</h2>
        <p>
          Scanned PDFs are processed with OCR; accuracy varies – you may need to edit the extracted
          text.
        </p>
      </section>

      {/* Contact / Feedback */}
      <section className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Feedback</h2>
        <p>
          If you encounter issues, please{' '}
          <a href="mailto:support@folio.app" className="text-primary underline">
            email support
          </a>{' '}
          or use the in‑app feedback button.
        </p>
      </section>
    </main>
  );
}
