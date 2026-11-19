export type ReadingMode = 'story' | 'study';

export interface ModeConfig {
  name: string;
  description: string;
  colorToken: 'rose' | 'primary';
  features: string[];
}

export const readingModes: Record<ReadingMode, ModeConfig> = {
  story: {
    name: 'Story Mode',
    description:
      'Designed for novels and narrative literature with character maps and relationship webs.',
    colorToken: 'rose',
    features: ['characters', 'timeline', 'marks'],
  },
  study: {
    name: 'Study Mode',
    description:
      'Designed for textbooks, holy books, and technical works with key points, study cards, and Q&A.',
    colorToken: 'primary',
    features: ['concepts', 'ask', 'cards', 'marks'],
  },
};
