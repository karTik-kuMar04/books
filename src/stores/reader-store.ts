import { create } from 'zustand';
import { storage } from '@/lib/storage';
import type { ReaderFont, ReaderSurface, TextPosition } from '@/api/contracts/shared';

export interface ReaderState {
  currentBookId: string | null;
  position: TextPosition;
  font: ReaderFont;
  fontSize: number;
  lineHeight: number;
  columnWidth: number;
  surface: ReaderSurface;
  matchAppTheme: boolean;
  autoNightSurface: boolean;
  isFocusMode: boolean;

  setBookId: (bookId: string) => void;
  setPosition: (pos: TextPosition) => void;
  setFont: (font: ReaderFont) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setColumnWidth: (width: number) => void;
  setSurface: (surface: ReaderSurface) => void;
  setMatchAppTheme: (match: boolean) => void;
  setAutoNightSurface: (auto: boolean) => void;
  toggleFocusMode: () => void;
  setFocusMode: (focus: boolean) => void;
}

const STORAGE_PREFIX = 'folio-reader';

export const useReaderStore = create<ReaderState>((set, get) => ({
  currentBookId: null,
  position: { chapterId: 'ch-1', offset: 0 },
  font: storage.getString(`${STORAGE_PREFIX}-font`, 'literata') as ReaderFont,
  fontSize: storage.get(`${STORAGE_PREFIX}-size`, 18),
  lineHeight: storage.get(`${STORAGE_PREFIX}-line-height`, 1.65),
  columnWidth: storage.get(`${STORAGE_PREFIX}-width`, 66),
  surface: storage.getString(`${STORAGE_PREFIX}-surface`, 'paper') as ReaderSurface,
  matchAppTheme: storage.get(`${STORAGE_PREFIX}-match-theme`, true),
  autoNightSurface: storage.get(`${STORAGE_PREFIX}-auto-night`, false),
  isFocusMode: false,

  setBookId: (bookId) => {
    const savedPos = storage.get<TextPosition>(`folio-pos-${bookId}`, {
      chapterId: 'ch-1',
      offset: 0,
    });
    set({ currentBookId: bookId, position: savedPos });
  },

  setPosition: (pos) => {
    const { currentBookId } = get();
    if (currentBookId) {
      storage.set(`folio-pos-${currentBookId}`, pos);
    }
    set({ position: pos });
  },

  setFont: (font) => {
    storage.set(`${STORAGE_PREFIX}-font`, font);
    set({ font });
  },

  setFontSize: (fontSize) => {
    storage.set(`${STORAGE_PREFIX}-size`, fontSize);
    set({ fontSize });
  },

  setLineHeight: (lineHeight) => {
    storage.set(`${STORAGE_PREFIX}-line-height`, lineHeight);
    set({ lineHeight });
  },

  setColumnWidth: (columnWidth) => {
    storage.set(`${STORAGE_PREFIX}-width`, columnWidth);
    set({ columnWidth });
  },

  setSurface: (surface) => {
    storage.set(`${STORAGE_PREFIX}-surface`, surface);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-reader', surface);
    }
    set({ surface });
  },

  setMatchAppTheme: (matchAppTheme) => {
    storage.set(`${STORAGE_PREFIX}-match-theme`, matchAppTheme);
    set({ matchAppTheme });
  },

  setAutoNightSurface: (autoNightSurface) => {
    storage.set(`${STORAGE_PREFIX}-auto-night`, autoNightSurface);
    set({ autoNightSurface });
  },

  toggleFocusMode: () => {
    set((state) => ({ isFocusMode: !state.isFocusMode }));
  },

  setFocusMode: (isFocusMode) => {
    set({ isFocusMode });
  },
}));
