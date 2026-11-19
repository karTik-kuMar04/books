export const siteConfig = {
  name: 'Folio',
  description: 'A private book reader that also explains the book.',
  url: 'https://folio.app',
} as const;

export type SiteConfig = typeof siteConfig;
