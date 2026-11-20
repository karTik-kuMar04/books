'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { Icon } from '@/components/icons/icons';
import { HeroPreview } from './hero-preview';

export function LandingView() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      step: '01',
      title: 'Upload your book',
      description:
        'Drop any EPUB, PDF, or TXT file into Folio. Your files stay private to you and never leave your control.',
      icon: 'upload' as const,
    },
    {
      step: '02',
      title: 'Read with calm focus',
      description:
        'Clean typography, five dedicated reader surfaces, instant chapter navigation, and offline reading capability.',
      icon: 'book-open' as const,
    },
    {
      step: '03',
      title: 'Understand deeply',
      description:
        'Follow characters and relationships in Story mode, or explore key concepts, flashcards, and Q&A in Study mode.',
      icon: 'sparkle' as const,
    },
  ];

  const faqs = [
    {
      q: 'Is my book safe and private?',
      a: 'Yes. Only you can see this book. Your text is processed in your isolated session and we never use your private uploads or notes to train AI models. You can export or delete your books and data at any time.',
    },
    {
      q: 'What is the difference between Story mode and Study mode?',
      a: 'Story mode is designed for fiction and narrative works: it provides a Characters map, tracks relationship dynamics across chapters, and includes a spoiler slider up to what you have read. Study mode is built for non-fiction, textbooks, and treatises: it generates a Concepts map, chapter Key points, an Ask this book assistant with page citations, and active recall Study cards.',
    },
    {
      q: 'Which file formats are supported?',
      a: 'Folio natively supports EPUB, searchable PDF, and plain text (TXT) files. Scanned image-only PDFs without an embedded text layer require OCR before upload.',
    },
    {
      q: 'Can I verify the AI insights against the real text?',
      a: 'Every single insight, relationship link, and answer includes an Evidence link pointing to the exact chapter and sentence in the book. You can also edit, rename, merge, or hide any character or concept if you disagree.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <Badge variant="primary">Private Book Reader & Explainer</Badge>
          </div>

          <h1 className="font-display text-text text-hero mb-4 font-bold tracking-tight">
            Read deeply. See who is in it and what it teaches.
          </h1>

          <div className="mb-8 flex justify-center">
            <PurposeLine className="text-base sm:text-lg">
              Upload a book, read it, and see who is in it or what it teaches.
            </PurposeLine>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="px-6">
                <Icon name="book-open" size={20} className="me-2" />
                Try a sample book
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="px-6">
                Sign in to your library
              </Button>
            </Link>
          </div>

          {/* Interactive Hero Preview */}
          <div className="mx-auto max-w-4xl">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="border-border bg-card border-t px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-text text-2xl font-bold md:text-3xl">
              How Folio works
            </h2>
            <p className="text-muted mt-2 text-sm md:text-base">
              From raw file to profound comprehension in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <Card key={item.step} className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-primary text-2xl font-bold">{item.step}</span>
                  <div className="rounded-control bg-primary-soft text-primary-ink flex h-10 w-10 items-center justify-center">
                    <Icon name={item.icon} size={20} />
                  </div>
                </div>
                <h3 className="text-text mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two Modes: Story vs Study */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-text text-2xl font-bold md:text-3xl">
              Two thoughtful modes for every genre
            </h2>
            <p className="text-muted mt-2 text-sm md:text-base">
              Tailored comprehension tools whether reading classic literature or rigorous research.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Story Mode */}
            <div className="rounded-card border-border bg-card border p-6 shadow-sm md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="rose">Story Mode</Badge>
                <span className="text-muted text-xs">For novels, biographies, and epics</span>
              </div>
              <h3 className="font-display text-text mb-3 text-xl font-bold">Characters map</h3>
              <p className="text-muted mb-6 text-sm leading-relaxed">
                Explore an interactive map of characters, family dynasties, allies, and rivals.
                Includes a spoiler-safe slider that shows connections only up to your current
                reading position.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-rose mt-1 shrink-0" />
                  <span>Interactive relationship graph with an accessible list twin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-rose mt-1 shrink-0" />
                  <span>Profile panel with traits, first appearance, and cited Evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-rose mt-1 shrink-0" />
                  <span>Full control to rename, merge, or hide character records.</span>
                </li>
              </ul>
            </div>

            {/* Study Mode */}
            <div className="rounded-card border-border bg-card border p-6 shadow-sm md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="primary">Study Mode</Badge>
                <span className="text-muted text-xs">For textbooks, science, and sacred texts</span>
              </div>
              <h3 className="font-display text-text mb-3 text-xl font-bold">
                Concepts map & Ask this book
              </h3>
              <p className="text-muted mb-6 text-sm leading-relaxed">
                Master complex domains with structured concept hierarchies, chapter key points,
                grounded question answering with direct page citations, and spaced-repetition study
                cards.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-primary mt-1 shrink-0" />
                  <span>Key points and Author&apos;s idea summarized per chapter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-primary mt-1 shrink-0" />
                  <span>Ask this book assistant with verified passage citations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check" size={16} className="text-primary mt-1 shrink-0" />
                  <span>Turn marked passages into interactive Study cards flashcards.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Promise & Supported Formats */}
      <section className="border-border bg-card border-t px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 inline-flex items-center gap-2">
                <Icon name="lock" size={20} className="text-primary" />
                <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                  Privacy First
                </span>
              </div>
              <h2 className="font-display text-text mb-4 text-2xl font-bold md:text-3xl">
                Only you can see this book. Delete it any time.
              </h2>
              <p className="text-muted mb-6 text-sm leading-relaxed">
                Your reading life is intimate. Folio is designed with zero-knowledge principles. We
                do not sell reading habits, we do not inspect your library, and your uploads are
                never used to train artificial intelligence models.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium">
                <div className="rounded-control border-border bg-page flex items-center gap-2 border px-3 py-2">
                  <Icon name="check" size={16} className="text-success" />
                  <span>Export your data anytime</span>
                </div>
                <div className="rounded-control border-border bg-page flex items-center gap-2 border px-3 py-2">
                  <Icon name="check" size={16} className="text-success" />
                  <span>One-click permanent deletion</span>
                </div>
                <div className="rounded-control border-border bg-page flex items-center gap-2 border px-3 py-2">
                  <Icon name="check" size={16} className="text-success" />
                  <span>Offline local cache</span>
                </div>
              </div>
            </div>

            <Card className="p-6 md:p-8">
              <h3 className="text-text mb-4 text-base font-semibold">Supported book formats</h3>
              <div className="space-y-4">
                <div className="border-border bg-page/60 flex items-start gap-3 rounded-md border p-3">
                  <Icon name="file-text" size={20} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-text text-sm font-medium">EPUB (.epub)</h4>
                    <p className="text-muted text-xs">
                      Standard reflowable e-books with chapters and images.
                    </p>
                  </div>
                </div>
                <div className="border-border bg-page/60 flex items-start gap-3 rounded-md border p-3">
                  <Icon name="file-text" size={20} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-text text-sm font-medium">Searchable PDF (.pdf)</h4>
                    <p className="text-muted text-xs">
                      Documents with extractable text layers. Scanned PDFs require OCR.
                    </p>
                  </div>
                </div>
                <div className="border-border bg-page/60 flex items-start gap-3 rounded-md border p-3">
                  <Icon name="file-text" size={20} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-text text-sm font-medium">Plain Text (.txt)</h4>
                    <p className="text-muted text-xs">
                      Lightweight, universally compatible raw UTF-8 text.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-text text-2xl font-bold md:text-3xl">
              Frequently asked questions
            </h2>
            <p className="text-muted mt-2 text-sm">
              Everything you need to know about Folio&apos;s features and privacy.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-card border-border bg-card border transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="text-text focus-visible:ring-primary rounded-card flex w-full items-center justify-between p-4 text-start text-sm font-medium focus-visible:ring-2 focus-visible:outline-none sm:text-base"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <Icon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      className="text-muted ms-2 shrink-0 transition-transform"
                    />
                  </button>
                  {isOpen && (
                    <div className="border-border text-muted border-t px-4 pt-3 pb-4 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-border bg-primary-soft/30 border-t px-4 py-16 text-center md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <AiChip label="Folio Reading Intelligence" className="mb-4" />
          <h2 className="font-display text-text mb-4 text-3xl font-bold md:text-4xl">
            Start exploring books like never before
          </h2>
          <p className="text-muted mb-8 text-base">
            No credit card or setup required. Experience the interactive sample library now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="px-6">
                Try the interactive demo
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="px-6">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
