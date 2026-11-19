export const queryKeys = {
  books: {
    all: ['books'] as const,
    detail: (id: string) => ['books', id] as const,
    content: (id: string) => ['books', id, 'content'] as const,
    characters: (id: string) => ['books', id, 'characters'] as const,
    concepts: (id: string) => ['books', id, 'concepts'] as const,
    cards: (id: string) => ['books', id, 'cards'] as const,
    marks: (id: string) => ['books', id, 'marks'] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
    settings: ['user', 'settings'] as const,
  },
} as const;
