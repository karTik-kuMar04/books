'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { EvidenceLink } from '@/components/patterns/evidence-link';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Icon } from '@/components/icons/icons';
import { HeroPreview } from '@/features/landing';
import { SAMPLE_BOOKS, SAMPLE_CHAPTERS } from '@/mocks/sample-data';
import { storage } from '@/lib/storage';

export function DemoView() {
  const [selectedBookIndex, setSelectedBookIndex] = React.useState<number>(0);
  const [activeTab, setActiveTab] = React.useState<'reader' | 'map' | 'ask'>('reader');
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const [askedQuestions, setAskedQuestions] = React.useState<string[]>([]);
  const [showSignupCard, setShowSignupCard] = React.useState<boolean>(() => {
    return !storage.get<boolean>('folio-demo-banner-dismissed', false);
  });

  const currentBook = SAMPLE_BOOKS[selectedBookIndex] ?? SAMPLE_BOOKS[0]!;
  const currentChapter =
    SAMPLE_CHAPTERS.find((c) => c.bookId === currentBook.id) ?? SAMPLE_CHAPTERS[0]!;

  const isStory = currentBook.mode === 'story';

  const storyQuestions = [
    {
      q: 'Why did Darcy snub Elizabeth at the Meryton assembly ball?',
      a: 'Mr. Darcy declared Elizabeth "tolerable; but not handsome enough to tempt me," refusing Bingley\'s suggestion to ask her to dance because he was in no humor to give consequence to young ladies slighted by other men.',
      evidence: 'Chapter 1, para 4',
      offset: 120,
    },
    {
      q: "What is Mrs. Bennet's primary obsession throughout the novel?",
      a: 'Mrs. Bennet is single-mindedly consumed with marrying off her five daughters to wealthy men of good fortune, as the Longbourn estate is entailed away from female heirs.',
      evidence: 'Chapter 1, para 1',
      offset: 0,
    },
    {
      q: 'How does Mr. Bennet respond to his wife’s excitement about Mr. Bingley?',
      a: 'Mr. Bennet responds with dry, sarcastic detachment, teasing Mrs. Bennet about her nerves and feigning indifference before revealing he has already paid a courtesy visit.',
      evidence: 'Chapter 1, para 3',
      offset: 80,
    },
  ];

  const studyQuestions = [
    {
      q: 'What is Working Memory Capacity and how is it limited?',
      a: 'Working memory capacity represents the limited cognitive buffer capable of maintaining and manipulating about 4 to 7 discrete chunks of novel information simultaneously without rehearsal.',
      evidence: 'Chapter 1, para 2',
      offset: 50,
    },
    {
      q: 'How does Cognitive Load Theory distinguish intrinsic and extraneous load?',
      a: 'Intrinsic load is dictated by the inherent difficulty and element interactivity of the material, whereas extraneous load stems from ineffective instructional presentation that consumes working memory without aiding schema formation.',
      evidence: 'Chapter 1, para 4',
      offset: 140,
    },
    {
      q: 'What is Dual Coding Theory?',
      a: 'Dual Coding Theory posits that memory operates via two separate but interconnected systems: nonverbal (visual representations) and verbal (linguistic propositions), leading to additive recall when both channels are engaged.',
      evidence: 'Chapter 1, para 6',
      offset: 210,
    },
  ];

  const questionsList = isStory ? storyQuestions : studyQuestions;

  const handleAsk = (questionText: string) => {
    if (askedQuestions.length >= 3) return;
    if (!askedQuestions.includes(questionText)) {
      setAskedQuestions((prev) => [...prev, questionText]);
    }
  };

  const handleDismissBanner = () => {
    setShowSignupCard(false);
    storage.set('folio-demo-banner-dismissed', true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="primary">Interactive Demo</Badge>
            <span className="text-muted text-xs">Public Domain Library</span>
          </div>
          <h1 className="font-display text-text text-2xl font-bold md:text-3xl">
            Demo Book Experience
          </h1>
          <PurposeLine
            purpose="Try it on a public-domain book. No account needed."
            className="mt-1"
          />
        </div>

        {/* Book Selector */}
        <div className="flex items-center gap-2">
          <SegmentedControl
            size="md"
            value={selectedBookIndex === 0 ? 'story' : 'study'}
            onChange={(val) => {
              setSelectedBookIndex(val === 'story' ? 0 : 1);
              setAskedQuestions([]);
            }}
            options={[
              { value: 'story', label: 'Pride & Prejudice (Story)' },
              { value: 'study', label: 'Cognitive Science (Study)' },
            ]}
          />
        </div>
      </div>

      {/* Main Demo Workspace Card */}
      <div className="rounded-card border-border bg-card border shadow-sm">
        {/* Navigation Tabs */}
        <div className="border-border flex flex-wrap items-center justify-between border-b px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('reader')}
              className={`rounded-control focus-visible:ring-primary flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                activeTab === 'reader'
                  ? 'bg-primary-soft text-primary-ink font-semibold'
                  : 'text-muted hover:text-text hover:bg-page'
              }`}
            >
              <Icon name="book-open" size={16} />
              <span>Reader Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('map')}
              className={`rounded-control focus-visible:ring-primary flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                activeTab === 'map'
                  ? 'bg-primary-soft text-primary-ink font-semibold'
                  : 'text-muted hover:text-text hover:bg-page'
              }`}
            >
              <Icon name={isStory ? 'characters' : 'concepts'} size={16} />
              <span>{isStory ? 'Characters Map' : 'Concepts Map'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ask')}
              className={`rounded-control focus-visible:ring-primary flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                activeTab === 'ask'
                  ? 'bg-primary-soft text-primary-ink font-semibold'
                  : 'text-muted hover:text-text hover:bg-page'
              }`}
            >
              <Icon name="ask" size={16} />
              <span>Ask this book</span>
              {askedQuestions.length > 0 && (
                <span className="bg-violet-soft text-violet-ink rounded-full px-1.5 text-[10px] font-bold">
                  {askedQuestions.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/auth">
              <Button size="sm" variant="outline">
                Open in Full App
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab 1: Reader Preview */}
        {activeTab === 'reader' && (
          <div className="p-4 sm:p-8">
            <div className="border-border mb-6 flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-muted text-xs tracking-wider uppercase">
                  {currentBook.author} · {currentBook.format}
                </p>
                <h2 className="font-display text-text text-xl font-bold">{currentChapter.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`rounded-control focus-visible:ring-primary flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                  isBookmarked
                    ? 'border-amber bg-amber-soft text-amber-ink'
                    : 'border-border bg-page text-muted hover:text-text'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Icon
                  name={isBookmarked ? 'bookmark-filled' : 'bookmark'}
                  size={16}
                  className={isBookmarked ? 'text-amber' : ''}
                />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark chapter'}</span>
              </button>
            </div>

            {/* Reading Column */}
            <article className="font-display text-text mx-auto max-w-2xl space-y-4 text-base leading-relaxed sm:text-lg">
              {currentChapter.content ? (
                currentChapter.content
                  .split('\n\n')
                  .slice(0, 5)
                  .map((paragraph, idx) => (
                    <p key={idx} className="indent-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
              ) : (
                <p>No preview text available for this chapter.</p>
              )}
            </article>

            <div className="border-border mt-8 border-t pt-4 text-center">
              <p className="text-muted text-xs">
                Showing excerpt of Chapter 1. Reading position: Chapter 1, offset 0.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Map Preview */}
        {activeTab === 'map' && (
          <div className="p-4 sm:p-6">
            <HeroPreview />
          </div>
        )}

        {/* Tab 3: Ask this book */}
        {activeTab === 'ask' && (
          <div className="space-y-6 p-4 sm:p-6">
            <div className="border-border flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-display text-text text-lg font-bold">Ask this book</h3>
                <p className="text-muted text-xs">
                  Ground questions in the text. Cites chapter and offset.
                </p>
              </div>
              <Badge variant={askedQuestions.length >= 3 ? 'error' : 'secondary'}>
                {askedQuestions.length} / 3 demo questions used
              </Badge>
            </div>

            {/* Suggested Question Chips */}
            <div className="space-y-2">
              <p className="text-muted text-xs font-semibold tracking-wider uppercase">
                Click a sample question:
              </p>
              <div className="flex flex-col gap-2">
                {questionsList.map((item) => {
                  const isAsked = askedQuestions.includes(item.q);
                  return (
                    <button
                      key={item.q}
                      type="button"
                      disabled={askedQuestions.length >= 3 && !isAsked}
                      onClick={() => handleAsk(item.q)}
                      className={`rounded-control focus-visible:ring-primary border p-3 text-start text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none sm:text-sm ${
                        isAsked
                          ? 'border-violet bg-violet-soft/30 text-text font-medium'
                          : askedQuestions.length >= 3
                            ? 'border-border bg-page text-muted cursor-not-allowed opacity-50'
                            : 'border-border bg-card hover:bg-page text-text'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2">
                          <Icon name="ask" size={16} className="text-primary" />
                          {item.q}
                        </span>
                        {isAsked ? (
                          <span className="text-violet text-xs font-semibold">Answered</span>
                        ) : (
                          <Icon name="arrow-right" size={16} className="text-muted" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Display */}
            {askedQuestions.length > 0 && (
              <div className="border-border space-y-4 border-t pt-4">
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">
                  Answers with Evidence:
                </p>
                {questionsList
                  .filter((item) => askedQuestions.includes(item.q))
                  .map((item) => (
                    <Card key={item.q} className="border-violet/30 bg-page border p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <AiChip label="Folio Answer" />
                          <span className="text-text text-xs font-semibold">{item.q}</span>
                        </div>
                        <EvidenceLink
                          passage={item.evidence}
                          chapterId="ch-1"
                          characterOffset={item.offset}
                        />
                      </div>
                      <p className="text-text text-sm leading-relaxed">{item.a}</p>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dismissible Gentle Sign-Up Card */}
      {showSignupCard && (
        <div className="rounded-card border-border bg-raised shadow-raised mt-8 flex flex-col items-center justify-between gap-4 border p-4 sm:flex-row sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-control bg-primary text-primary-fg flex h-10 w-10 shrink-0 items-center justify-center">
              <Icon name="sparkle" size={20} />
            </div>
            <div>
              <h4 className="text-text text-sm font-semibold sm:text-base">
                Enjoying the demo? Sign up to upload your own books.
              </h4>
              <p className="text-muted mt-1 text-xs sm:text-sm">
                Your private library stores books locally, keeps your bookmarks, and unlocks
                unlimited AI questions.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleDismissBanner}
              className="rounded-control text-muted hover:text-text hover:bg-page px-3 py-1.5 text-xs transition-colors"
            >
              Maybe later
            </button>
            <Link href="/auth">
              <Button size="sm">Create Free Account</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
