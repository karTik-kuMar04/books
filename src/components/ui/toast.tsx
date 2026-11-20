'use client';

import * as React from 'react';
import { create } from 'zustand';
import { Icon } from '@/components/icons/icons';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  durationMs?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, toast.durationMs ?? 4000);
    return id;
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function ToastContainer() {
  const { toasts, dismissToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex max-w-sm flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-card border-border bg-raised shadow-raised animate-in slide-in-from-bottom-5 pointer-events-auto flex items-start justify-between gap-3 border p-4 duration-200"
        >
          <div className="space-y-1">
            <p className="text-text text-sm font-medium">{toast.title}</p>
            {toast.description && <p className="text-muted text-xs">{toast.description}</p>}
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  dismissToast(toast.id);
                }}
                className="text-primary mt-2 text-xs font-semibold hover:underline focus:outline-none"
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="rounded-control text-muted hover:text-text cursor-pointer p-1 focus:outline-none"
            aria-label="Dismiss toast"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
