import { describe, it, expect, beforeEach } from 'vitest';
import { useReaderStore } from '@/stores/reader-store';
import { usePanelStore } from '@/stores/panel-store';
import { useToastStore } from '@/components/ui/toast';

describe('Zustand Stores', () => {
  beforeEach(() => {
    usePanelStore.setState({ activeTab: null, isOpen: false });
    useToastStore.setState({ toasts: [] });
  });

  it('updates reading position in ReaderStore', () => {
    const store = useReaderStore.getState();
    store.setPosition({ chapterId: 'ch-4', offset: 2500 });
    expect(useReaderStore.getState().position).toEqual({
      chapterId: 'ch-4',
      offset: 2500,
    });
  });

  it('toggles focus mode in ReaderStore', () => {
    const initial = useReaderStore.getState().isFocusMode;
    useReaderStore.getState().toggleFocusMode();
    expect(useReaderStore.getState().isFocusMode).toBe(!initial);
  });

  it('manages side panel tabs in PanelStore', () => {
    const panel = usePanelStore.getState();
    panel.openPanel('ask');
    expect(usePanelStore.getState().isOpen).toBe(true);
    expect(usePanelStore.getState().activeTab).toBe('ask');

    panel.closePanel();
    expect(usePanelStore.getState().isOpen).toBe(false);
    expect(usePanelStore.getState().activeTab).toBe(null);
  });

  it('adds and dismisses toasts in ToastStore', () => {
    const toastStore = useToastStore.getState();
    const id = toastStore.addToast({
      title: 'Test Notification',
      description: 'Test detail',
    });
    expect(useToastStore.getState().toasts.length).toBe(1);

    toastStore.dismissToast(id);
    expect(useToastStore.getState().toasts.length).toBe(0);
  });
});
