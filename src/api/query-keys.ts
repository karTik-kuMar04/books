export const queryKeys = {
  books: {
    all: (params?: Record<string, unknown>) => ['books', params ?? {}] as const,
    detail: (id: string) => ['books', id] as const,
    chapter: (bookId: string, chapterId: string) =>
      ['books', bookId, 'chapters', chapterId] as const,
    characters: (id: string) => ['books', id, 'characters'] as const,
    concepts: (id: string) => ['books', id, 'concepts'] as const,
    cards: (id: string) => ['books', id, 'cards'] as const,
    decks: (id: string) => ['books', id, 'decks'] as const,
    qa: (id: string) => ['books', id, 'qa'] as const,
    marks: (bookId?: string) => ['marks', bookId ?? 'all'] as const,
  },
  vocabulary: {
    all: () => ['vocabulary'] as const,
  },
  processing: {
    jobs: () => ['processing', 'jobs'] as const,
  },
  user: {
    session: () => ['user', 'session'] as const,
    settings: () => ['user', 'settings'] as const,
    usage: () => ['user', 'usage'] as const,
  },
} as const;
