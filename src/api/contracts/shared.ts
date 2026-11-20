import { z } from 'zod';

export const ProcessingStateSchema = z.enum(['queued', 'running', 'ready', 'failed', 'skipped']);
export type ProcessingState = z.infer<typeof ProcessingStateSchema>;

export const AiTextSchema = z.object({
  text: z.string(),
  status: ProcessingStateSchema.default('ready'),
  provenance: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});
export type AiText = z.infer<typeof AiTextSchema>;

export const EvidenceSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  chapterId: z.string(),
  chapterTitle: z.string(),
  startOffset: z.number(),
  endOffset: z.number(),
  passage: z.string(),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const TextPositionSchema = z.object({
  chapterId: z.string(),
  offset: z.number(),
});
export type TextPosition = z.infer<typeof TextPositionSchema>;

export const BookModeSchema = z.enum(['story', 'study']);
export type BookMode = z.infer<typeof BookModeSchema>;

export const ChapterParagraphSchema = z.object({
  offset: z.number(),
  text: z.string(),
});
export type ChapterParagraph = z.infer<typeof ChapterParagraphSchema>;

export const ChapterSchema = z.object({
  id: z.string(),
  index: z.number(),
  title: z.string(),
  summary: AiTextSchema.optional(),
  authorIdea: AiTextSchema.optional(),
  wordCount: z.number(),
  characterCount: z.number(),
  paragraphs: z.array(ChapterParagraphSchema).optional(),
});
export type Chapter = z.infer<typeof ChapterSchema>;

export const ShelfSchema = z.enum(['reading', 'want_to_read', 'finished']);
export type Shelf = z.infer<typeof ShelfSchema>;

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverUrl: z.string().optional(),
  mode: BookModeSchema,
  format: z.enum(['epub', 'pdf', 'txt']),
  language: z.string().default('en'),
  dir: z.enum(['ltr', 'rtl']).default('ltr'),
  progressPercent: z.number().min(0).max(100).default(0),
  currentPosition: TextPositionSchema.optional(),
  lastReadAt: z.string().optional(),
  totalChapters: z.number(),
  shelf: ShelfSchema.default('reading'),
  featureStatuses: z.record(z.string(), ProcessingStateSchema).default({}),
  tags: z.array(z.string()).default([]),
});
export type Book = z.infer<typeof BookSchema>;

export const CharacterRoleSchema = z.enum(['main', 'supporting', 'minor']);
export type CharacterRole = z.infer<typeof CharacterRoleSchema>;

export const CharacterSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  name: z.string(),
  role: CharacterRoleSchema,
  importanceScore: z.number().min(0).max(1),
  traits: z.array(z.string()),
  firstAppearanceChapter: z.number(),
  mentionCount: z.number(),
  isHidden: z.boolean().optional(),
  mergedIntoId: z.string().optional(),
});
export type Character = z.infer<typeof CharacterSchema>;

export const RelationshipTypeSchema = z.enum([
  'family',
  'allies',
  'romance',
  'rivals',
  'co_occurrence',
]);
export type RelationshipType = z.infer<typeof RelationshipTypeSchema>;

export const RelationshipSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  sourceCharacterId: z.string(),
  targetCharacterId: z.string(),
  type: RelationshipTypeSchema,
  strength: z.number().min(1).max(10),
  description: AiTextSchema,
  evidence: EvidenceSchema,
  firstObservedChapter: z.number(),
  isUserEdited: z.boolean().optional(),
});
export type Relationship = z.infer<typeof RelationshipSchema>;

export const ConceptSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  name: z.string(),
  description: AiTextSchema,
  chapterId: z.string(),
  chapterIndex: z.number(),
  isImportant: z.boolean().default(false),
  mentionCount: z.number(),
});
export type Concept = z.infer<typeof ConceptSchema>;

export const ConceptLinkTypeSchema = z.enum(['leads_to', 'prerequisite', 'related', 'contrasts']);
export type ConceptLinkType = z.infer<typeof ConceptLinkTypeSchema>;

export const ConceptLinkSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  sourceConceptId: z.string(),
  targetConceptId: z.string(),
  type: ConceptLinkTypeSchema,
  description: AiTextSchema,
  evidence: EvidenceSchema,
});
export type ConceptLink = z.infer<typeof ConceptLinkSchema>;

export const KeyPointSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  chapterId: z.string(),
  chapterIndex: z.number(),
  title: z.string(),
  content: AiTextSchema,
  evidence: EvidenceSchema,
  isImportant: z.boolean().default(false),
});
export type KeyPoint = z.infer<typeof KeyPointSchema>;

export const MarkTypeSchema = z.enum(['bookmark', 'highlight', 'note']);
export type MarkType = z.infer<typeof MarkTypeSchema>;

export const HighlightMeaningSchema = z.enum(['important', 'definition', 'question']);
export type HighlightMeaning = z.infer<typeof HighlightMeaningSchema>;

export const MarkSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  chapterId: z.string(),
  chapterIndex: z.number(),
  chapterTitle: z.string(),
  type: MarkTypeSchema,
  meaning: HighlightMeaningSchema.optional(),
  startOffset: z.number(),
  endOffset: z.number(),
  selectedText: z.string(),
  noteText: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Mark = z.infer<typeof MarkSchema>;

export const VocabEntrySchema = z.object({
  id: z.string(),
  bookId: z.string(),
  word: z.string(),
  meaningInContext: AiTextSchema,
  otherSenses: z.array(z.string()).default([]),
  sourcePassage: EvidenceSchema,
  mastery: z.enum(['learning', 'reviewing', 'mastered']).default('learning'),
  createdAt: z.string(),
});
export type VocabEntry = z.infer<typeof VocabEntrySchema>;

export const CardSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  deckId: z.string(),
  chapterId: z.string().optional(),
  front: z.string(),
  back: z.string(),
  evidence: EvidenceSchema.optional(),
  box: z.number().int().min(1).max(5).default(1),
  nextReviewDate: z.string(),
  lastReviewedAt: z.string().optional(),
  isAiGenerated: z.boolean().default(true),
});
export type Card = z.infer<typeof CardSchema>;

export const DeckSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  chapterId: z.string().optional(),
  title: z.string(),
  cardCount: z.number(),
  dueCount: z.number(),
});
export type Deck = z.infer<typeof DeckSchema>;

export const QaScopeSchema = z.enum(['book', 'chapter', 'marks']);
export type QaScope = z.infer<typeof QaScopeSchema>;

export const QaMessageSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  role: z.enum(['user', 'assistant']),
  content: AiTextSchema,
  citations: z.array(EvidenceSchema).optional(),
  scope: QaScopeSchema.default('book'),
  chapterId: z.string().optional(),
  createdAt: z.string(),
});
export type QaMessage = z.infer<typeof QaMessageSchema>;

export const JobStageSchema = z.object({
  name: z.string(),
  status: ProcessingStateSchema,
  progressPercent: z.number().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  errorMessage: z.string().optional(),
});
export type JobStage = z.infer<typeof JobStageSchema>;

export const JobSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  bookTitle: z.string(),
  status: ProcessingStateSchema,
  stages: z.array(JobStageSchema),
  costUsd: z.number().default(0),
  totalDurationSeconds: z.number().default(0),
  createdAt: z.string(),
});
export type Job = z.infer<typeof JobSchema>;

export const RelatedBookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverUrl: z.string().optional(),
  relationReason: z.string(),
  isPublicDomain: z.boolean().default(false),
});
export type RelatedBook = z.infer<typeof RelatedBookSchema>;

export const ReaderSurfaceSchema = z.enum(['paper', 'sepia', 'dusk', 'ember', 'black']);
export type ReaderSurface = z.infer<typeof ReaderSurfaceSchema>;

export const ReaderFontSchema = z.enum(['literata', 'atkinson', 'inter']);
export type ReaderFont = z.infer<typeof ReaderFontSchema>;

export const UserSettingsSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']).default('system'),
  readerSurface: ReaderSurfaceSchema.default('paper'),
  readerFont: ReaderFontSchema.default('literata'),
  readerFontSize: z.number().default(18),
  readerLineHeight: z.number().default(1.65),
  readerColumnWidth: z.number().default(66),
  matchAppTheme: z.boolean().default(true),
  autoNightSurface: z.boolean().default(false),
  voiceSpeed: z.number().default(1.0),
  preferredVoice: z.string().optional(),
  aiEnabled: z.boolean().default(true),
  maxDailyQuestions: z.number().default(50),
});
export type UserSettings = z.infer<typeof UserSettingsSchema>;

export const UsageStatsSchema = z.object({
  uploadedBooks: z.number(),
  storageBytes: z.number(),
  maxStorageBytes: z.number(),
  questionsAskedToday: z.number(),
  maxQuestionsPerDay: z.number(),
  resetsAt: z.string(),
});
export type UsageStats = z.infer<typeof UsageStatsSchema>;

export const UserSessionSchema = z.object({
  user: z
    .object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      avatarUrl: z.string().optional(),
      role: z.enum(['user', 'admin']).default('user'),
    })
    .nullable(),
  isAuthenticated: z.boolean(),
});
export type UserSession = z.infer<typeof UserSessionSchema>;
