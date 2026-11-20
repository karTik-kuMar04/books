import { describe, expect, it } from 'vitest';
import { searchDocuments, tokenise } from './search-engine';

describe('search engine', () => {
  it('tokenises and ranks title matches', () => {
    expect(tokenise('  Working Memory ')).toEqual(['working', 'memory']);
    const results = searchDocuments(
      [
        { id: '1', title: 'Memory', text: 'Cognitive process', scope: 'Books', href: '/1' },
        { id: '2', title: 'Other', text: 'Working memory', scope: 'Books', href: '/2' },
      ],
      'memory',
    );
    expect(results[0]?.id).toBe('1');
  });
});
