import { env } from '@/lib/env';
import { mockBooksAdapter } from './adapters/mock/books';
import { mockCharactersAdapter } from './adapters/mock/characters';
import { mockConceptsAdapter } from './adapters/mock/concepts';
import { mockAskAdapter } from './adapters/mock/ask';
import { mockCardsAdapter } from './adapters/mock/cards';
import { mockMarksAdapter } from './adapters/mock/marks';
import { mockVocabularyAdapter } from './adapters/mock/vocabulary';
import { mockProcessingAdapter } from './adapters/mock/processing';
import { mockAuthAdapter } from './adapters/mock/auth';

import { httpBooksAdapter } from './adapters/http/books';
import { httpCharactersAdapter } from './adapters/http/characters';
import { httpConceptsAdapter } from './adapters/http/concepts';
import { httpAskAdapter } from './adapters/http/ask';
import { httpCardsAdapter } from './adapters/http/cards';
import { httpMarksAdapter } from './adapters/http/marks';
import { httpVocabularyAdapter } from './adapters/http/vocabulary';
import { httpProcessingAdapter } from './adapters/http/processing';
import { httpAuthAdapter } from './adapters/http/auth';

export interface ApiClientConfig {
  mode: 'mock' | 'http';
  baseUrl: string;
}

export const apiConfig: ApiClientConfig = {
  mode: env.NEXT_PUBLIC_API_MODE,
  baseUrl: env.NEXT_PUBLIC_API_URL,
};

export const isMockMode = apiConfig.mode === 'mock';

export const api = {
  books: isMockMode ? mockBooksAdapter : httpBooksAdapter,
  characters: isMockMode ? mockCharactersAdapter : httpCharactersAdapter,
  concepts: isMockMode ? mockConceptsAdapter : httpConceptsAdapter,
  ask: isMockMode ? mockAskAdapter : httpAskAdapter,
  cards: isMockMode ? mockCardsAdapter : httpCardsAdapter,
  marks: isMockMode ? mockMarksAdapter : httpMarksAdapter,
  vocabulary: isMockMode ? mockVocabularyAdapter : httpVocabularyAdapter,
  processing: isMockMode ? mockProcessingAdapter : httpProcessingAdapter,
  auth: isMockMode ? mockAuthAdapter : httpAuthAdapter,
};
