import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Progress } from '@/components/ui/progress';

describe('UI Primitives', () => {
  it('renders Button with variants', () => {
    render(<Button variant="primary">Action</Button>);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('renders Badge with correct text', () => {
    render(<Badge variant="rose">Story mode</Badge>);
    expect(screen.getByText('Story mode')).toBeInTheDocument();
  });

  it('renders SegmentedControl with options', () => {
    const options = [
      { value: 'tab1', label: 'First' },
      { value: 'tab2', label: 'Second' },
    ];
    render(<SegmentedControl options={options} value="tab1" onChange={() => {}} />);
    expect(screen.getByRole('radio', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Second' })).toBeInTheDocument();
  });

  it('renders Progress bar', () => {
    render(<Progress value={45} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45');
  });
});
