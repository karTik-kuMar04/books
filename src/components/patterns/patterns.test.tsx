import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { AiChip } from '@/components/patterns/ai-chip';
import { StatusChip } from '@/components/patterns/status-chip';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { EmptyState } from '@/components/patterns/empty-state';
import { SystemState } from '@/components/patterns/system-state';

describe('Core Patterns', () => {
  it('renders AiChip with default label', () => {
    render(<AiChip />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders StatusChip across all 5 states', () => {
    const { rerender } = render(<StatusChip state="queued" />);
    expect(screen.getByText('Waiting')).toBeInTheDocument();

    rerender(<StatusChip state="running" stageName="Mapping people" progressPercent={65} />);
    expect(screen.getByText(/Mapping people 65%/)).toBeInTheDocument();

    rerender(<StatusChip state="ready" />);
    expect(screen.getByText('Ready')).toBeInTheDocument();

    rerender(<StatusChip state="failed" reason="Scanned PDF not extractable" />);
    expect(screen.getByText('Scanned PDF not extractable')).toBeInTheDocument();

    rerender(<StatusChip state="skipped" reason="AI features off" />);
    expect(screen.getByText('AI features off')).toBeInTheDocument();
  });

  it('renders PurposeLine accurately', () => {
    render(<PurposeLine>Everything about this book.</PurposeLine>);
    expect(screen.getByText('Everything about this book.')).toBeInTheDocument();
  });

  it('renders EmptyState with action button', () => {
    render(
      <EmptyState
        title="No bookmarks yet"
        description="Bookmark pages while reading to see them here."
        actionLabel="Start reading"
        onAction={() => {}}
      />,
    );
    expect(screen.getByText('No bookmarks yet')).toBeInTheDocument();
    expect(screen.getByText('Start reading')).toBeInTheDocument();
  });

  it('renders SystemState for error and offline', () => {
    const { rerender } = render(<SystemState type="error" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    rerender(<SystemState type="offline" />);
    expect(screen.getByText('You are offline')).toBeInTheDocument();
  });
});
