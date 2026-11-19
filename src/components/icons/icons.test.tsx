import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon, ICON_NAMES } from './icons';

describe('Icon component and icon system', () => {
  it('has no duplicate icon names', () => {
    const uniqueNames = new Set(ICON_NAMES);
    expect(uniqueNames.size).toBe(ICON_NAMES.length);
  });

  it('renders all icons with a 24 by 24 viewBox and required attributes', () => {
    for (const name of ICON_NAMES) {
      const { container } = render(<Icon name={name} />);
      const svg = container.querySelector('svg');
      expect(svg, `Icon ${name} must render an svg element`).not.toBeNull();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('renders with title and role="img" when title is provided', () => {
    const { container } = render(<Icon name="library" title="Library" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('role')).toBe('img');
    const title = container.querySelector('title');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Library');
  });

  it('contains no hex colors in any icon definition or rendered output', () => {
    const hexRegex = /#[0-9a-fA-F]{3,8}\b/;
    for (const name of ICON_NAMES) {
      const { container } = render(<Icon name={name} />);
      const html = container.innerHTML;
      expect(hexRegex.test(html), `Icon ${name} contains hardcoded hex color: ${html}`).toBe(false);
    }
  });

  it('contains only valid fill attributes (none or currentColor)', () => {
    for (const name of ICON_NAMES) {
      const { container } = render(<Icon name={name} />);
      const elementsWithFill = container.querySelectorAll('[fill]');
      elementsWithFill.forEach((el) => {
        const fill = el.getAttribute('fill');
        expect(
          fill === 'none' || fill === 'currentColor',
          `Icon ${name} element <${el.tagName}> has disallowed fill: ${fill}`,
        ).toBe(true);
      });
    }
  });

  it('supports sizes 16, 20, 24', () => {
    const sizes = [16, 20, 24] as const;
    for (const size of sizes) {
      const { container } = render(<Icon name="library" size={size} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe(String(size));
      expect(svg?.getAttribute('height')).toBe(String(size));
    }
  });
});
