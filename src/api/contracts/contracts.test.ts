import { describe, it, expect } from 'vitest';
import {
  BookSchema,
  CharacterSchema,
  RelationshipSchema,
  ConceptSchema,
  EvidenceSchema,
  AiTextSchema,
  MarkSchema,
  VocabEntrySchema,
  CardSchema,
  JobSchema,
} from '@/api/contracts/shared';

describe('Shared API Contracts Validation', () => {
  it('validates a valid Book object', () => {
    const validBook = {
      id: 'book-1',
      title: 'Valid Book',
      author: 'Author Name',
      mode: 'story' as const,
      format: 'epub' as const,
      language: 'en',
      dir: 'ltr' as const,
      progressPercent: 50,
      totalChapters: 10,
      shelf: 'reading' as const,
      tags: ['Test'],
    };
    const parsed = BookSchema.safeParse(validBook);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid Book progressPercent > 100', () => {
    const invalidBook = {
      id: 'book-1',
      title: 'Valid Book',
      author: 'Author Name',
      mode: 'story' as const,
      format: 'epub' as const,
      progressPercent: 120, // invalid
      totalChapters: 10,
    };
    const parsed = BookSchema.safeParse(invalidBook);
    expect(parsed.success).toBe(false);
  });

  it('validates AiText with all 5 states', () => {
    for (const status of ['queued', 'running', 'ready', 'failed', 'skipped'] as const) {
      const parsed = AiTextSchema.safeParse({ text: 'Sample insight', status });
      expect(parsed.success).toBe(true);
    }
  });

  it('validates Evidence with character offsets', () => {
    const evidence = {
      id: 'ev-1',
      bookId: 'b-1',
      chapterId: 'ch-1',
      chapterTitle: 'Chapter 1',
      startOffset: 100,
      endOffset: 250,
      passage: 'A quoted passage from the text.',
    };
    const parsed = EvidenceSchema.safeParse(evidence);
    expect(parsed.success).toBe(true);
  });

  it('validates Character and Relationship schemas', () => {
    const char = {
      id: 'char-1',
      bookId: 'b-1',
      name: 'Character One',
      role: 'main' as const,
      importanceScore: 0.9,
      traits: ['brave', 'candid'],
      firstAppearanceChapter: 1,
      mentionCount: 50,
    };
    expect(CharacterSchema.safeParse(char).success).toBe(true);

    const rel = {
      id: 'rel-1',
      bookId: 'b-1',
      sourceCharacterId: 'char-1',
      targetCharacterId: 'char-2',
      type: 'romance' as const,
      strength: 8,
      description: { text: 'Love interest', status: 'ready' as const },
      evidence: {
        id: 'ev-1',
        bookId: 'b-1',
        chapterId: 'ch-1',
        chapterTitle: 'Chapter 1',
        startOffset: 10,
        endOffset: 50,
        passage: 'They fell in love.',
      },
      firstObservedChapter: 1,
    };
    expect(RelationshipSchema.safeParse(rel).success).toBe(true);
  });

  it('validates Mark schema for bookmark, highlight, and note', () => {
    const mark = {
      id: 'm-1',
      bookId: 'b-1',
      chapterId: 'ch-1',
      chapterIndex: 1,
      chapterTitle: 'Chapter 1',
      type: 'highlight' as const,
      meaning: 'important' as const,
      startOffset: 200,
      endOffset: 300,
      selectedText: 'Highlighted text',
      noteText: 'My thoughts',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(MarkSchema.safeParse(mark).success).toBe(true);

    const concept = {
      id: 'c-1',
      bookId: 'b-1',
      name: 'Working Memory',
      description: { text: 'Memory workspace', status: 'ready' as const },
      chapterId: 'ch-1',
      chapterIndex: 1,
      mentionCount: 15,
    };
    expect(ConceptSchema.safeParse(concept).success).toBe(true);

    const vocab = {
      id: 'v-1',
      bookId: 'b-1',
      word: 'plasticity',
      meaningInContext: { text: 'Adaptation', status: 'ready' as const },
      sourcePassage: {
        id: 'ev-1',
        bookId: 'b-1',
        chapterId: 'ch-1',
        chapterTitle: 'Ch 1',
        startOffset: 0,
        endOffset: 20,
        passage: 'Neural plasticity',
      },
      createdAt: new Date().toISOString(),
    };
    expect(VocabEntrySchema.safeParse(vocab).success).toBe(true);

    const card = {
      id: 'cd-1',
      bookId: 'b-1',
      deckId: 'd-1',
      front: 'Question',
      back: 'Answer',
      nextReviewDate: new Date().toISOString(),
    };
    expect(CardSchema.safeParse(card).success).toBe(true);

    const job = {
      id: 'j-1',
      bookId: 'b-1',
      bookTitle: 'Book 1',
      status: 'ready' as const,
      stages: [{ name: 'Extract', status: 'ready' as const }],
      createdAt: new Date().toISOString(),
    };
    expect(JobSchema.safeParse(job).success).toBe(true);
  });
});
