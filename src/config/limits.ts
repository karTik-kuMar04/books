export const usageLimits = {
  maxUploadSizeBytes: 50 * 1024 * 1024, // 50MB
  supportedFormats: ['pdf', 'epub', 'txt'] as const,
  maxQuestionsPerDay: 50,
  maxBooksPerUser: 100,
} as const;

export type SupportedFormat = (typeof usageLimits.supportedFormats)[number];
