import { create } from 'zustand';
import { storage } from '@/lib/storage';

export type SidePanelTab = 'ask' | 'characters' | 'concepts' | 'marks' | 'meaning' | null;

export interface PanelState {
  activeTab: SidePanelTab;
  panelWidth: number;
  isOpen: boolean;

  openPanel: (tab: SidePanelTab) => void;
  closePanel: () => void;
  togglePanel: (tab: SidePanelTab) => void;
  setPanelWidth: (width: number) => void;
}

const STORAGE_KEY_WIDTH = 'folio-panel-width';

export const usePanelStore = create<PanelState>((set) => ({
  activeTab: null,
  panelWidth: storage.get(STORAGE_KEY_WIDTH, 380),
  isOpen: false,

  openPanel: (tab) => set({ activeTab: tab, isOpen: true }),
  closePanel: () => set({ isOpen: false, activeTab: null }),
  togglePanel: (tab) =>
    set((state) => {
      if (state.isOpen && state.activeTab === tab) {
        return { isOpen: false, activeTab: null };
      }
      return { isOpen: true, activeTab: tab };
    }),
  setPanelWidth: (width) => {
    storage.set(STORAGE_KEY_WIDTH, width);
    set({ panelWidth: width });
  },
}));
