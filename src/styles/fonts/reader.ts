import {
  Literata,
  Atkinson_Hyperlegible_Next,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari,
  Noto_Naskh_Arabic,
  JetBrains_Mono,
} from 'next/font/google';
import { inter } from './ui';

export const literata = Literata({
  variable: '--nf-reading-serif',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const atkinsonHyperlegibleNext = Atkinson_Hyperlegible_Next({
  variable: '--nf-reading-hyper',
  subsets: ['latin', 'latin-ext'],
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export { inter };

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: '--nf-deva-serif',
  subsets: ['devanagari'],
  preload: false,
  fallback: ['Georgia', 'serif'],
});

export const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: '--nf-deva-sans',
  subsets: ['devanagari'],
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--nf-arabic',
  subsets: ['arabic'],
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--nf-mono',
  subsets: ['latin'],
  preload: false,
  fallback: ['ui-monospace', 'monospace'],
});
