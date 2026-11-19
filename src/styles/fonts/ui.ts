import { Fraunces, Inter } from 'next/font/google';

export const fraunces = Fraunces({
  variable: '--nf-display',
  axes: ['opsz'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const inter = Inter({
  variable: '--nf-ui',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
