import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles conditional classes and falsy values', () => {
    expect(cn('base', false && 'hidden', null, undefined, 'active')).toBe('base active');
  });
});
