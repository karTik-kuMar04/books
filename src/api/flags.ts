export const featureFlags = {
  enableAudioNarration: false,
  enableCharacterGraph: true,
  enableConceptGraph: true,
  enableStudyCards: true,
  enableAskBook: true,
} as const;

export type FeatureFlag = keyof typeof featureFlags;
