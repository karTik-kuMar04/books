import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

function parseCSSVariables(css: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
  surfaces: Record<string, Record<string, string>>;
} {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  const surfaces: Record<string, Record<string, string>> = {};

  // Extract :root block
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
  if (rootMatch && rootMatch[1]) {
    for (const line of rootMatch[1].split('\n')) {
      const match = line.match(/--([\w-]+):\s*(#[0-9a-fA-F]{6});/);
      if (match && match[1] && match[2]) {
        light[match[1]] = match[2];
      }
    }
  }

  // Extract [data-theme='dark'] block
  const darkMatch = css.match(/\[data-theme=['"]dark['"]\]\s*\{([^}]+)\}/);
  if (darkMatch && darkMatch[1]) {
    for (const line of darkMatch[1].split('\n')) {
      const match = line.match(/--([\w-]+):\s*(#[0-9a-fA-F]{6});/);
      if (match && match[1] && match[2]) {
        dark[match[1]] = match[2];
      }
    }
  }

  // Extract surfaces
  const surfaceNames = ['paper', 'sepia', 'dusk', 'ember', 'black'];
  for (const name of surfaceNames) {
    const regex = new RegExp(`\\[data-reader=['"]${name}['"]\\]\\s*\\{([^}]+)\\}`);
    const match = css.match(regex);
    if (match && match[1]) {
      surfaces[name] = {};
      for (const line of match[1].split('\n')) {
        const varMatch = line.match(/--([\w-]+):\s*(#[0-9a-fA-F]{6});/);
        if (varMatch && varMatch[1] && varMatch[2]) {
          surfaces[name][varMatch[1]] = varMatch[2];
        }
      }
    }
  }

  return { light, dark, surfaces };
}

function getRelativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const [rLinear, gLinear, bLinear] = [r, g, b].map((val) =>
    val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4),
  );

  return 0.2126 * (rLinear ?? 0) + 0.7152 * (gLinear ?? 0) + 0.0722 * (bLinear ?? 0);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Theme tokens and contrast ratios', () => {
  const tokensPath = path.resolve(__dirname, './tokens.css');
  const css = fs.readFileSync(tokensPath, 'utf-8');
  const { light, dark, surfaces } = parseCSSVariables(css);

  const themePairs = [
    { name: 'text/page', fg: 'color-text', bg: 'color-page' },
    { name: 'text/card', fg: 'color-text', bg: 'color-card' },
    { name: 'muted/card', fg: 'color-muted', bg: 'color-card' },
    { name: 'primary/page', fg: 'color-primary', bg: 'color-page' },
    { name: 'primary-fg/primary', fg: 'color-primary-fg', bg: 'color-primary' },
    { name: 'amber-fg/amber', fg: 'color-amber-fg', bg: 'color-amber' },
    { name: 'violet/page', fg: 'color-violet', bg: 'color-page' },
    { name: 'violet-ink/violet-soft', fg: 'color-violet-ink', bg: 'color-violet-soft' },
    { name: 'rose-ink/rose-soft', fg: 'color-rose-ink', bg: 'color-rose-soft' },
    { name: 'error/page', fg: 'color-error', bg: 'color-page' },
    { name: 'success/page', fg: 'color-success', bg: 'color-page' },
  ];

  it('Stone (light theme) satisfies WCAG contrast of at least 4.5 for required token pairs', () => {
    for (const pair of themePairs) {
      const fgHex = light[pair.fg];
      const bgHex = light[pair.bg];
      expect(fgHex, `Missing ${pair.fg} in light tokens`).toBeDefined();
      expect(bgHex, `Missing ${pair.bg} in light tokens`).toBeDefined();
      const ratio = getContrastRatio(fgHex!, bgHex!);
      expect(
        ratio,
        `Light theme ${pair.name} contrast ratio ${ratio} < 4.5`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('Night (dark theme) satisfies WCAG contrast of at least 4.5 for required token pairs', () => {
    for (const pair of themePairs) {
      const fgHex = dark[pair.fg];
      const bgHex = dark[pair.bg];
      expect(fgHex, `Missing ${pair.fg} in dark tokens`).toBeDefined();
      expect(bgHex, `Missing ${pair.bg} in dark tokens`).toBeDefined();
      const ratio = getContrastRatio(fgHex!, bgHex!);
      expect(ratio, `Dark theme ${pair.name} contrast ratio ${ratio} < 4.5`).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  it('All reader surfaces satisfy WCAG contrast of at least 7 for reader text on reader page', () => {
    const surfaceNames = ['paper', 'sepia', 'dusk', 'ember', 'black'];
    for (const surface of surfaceNames) {
      const surfaceTokens = surfaces[surface];
      expect(surfaceTokens, `Missing surface ${surface}`).toBeDefined();
      const text = surfaceTokens!['reader-text'];
      const page = surfaceTokens!['reader-page'];
      expect(text, `Missing reader-text on ${surface}`).toBeDefined();
      expect(page, `Missing reader-page on ${surface}`).toBeDefined();
      const ratio = getContrastRatio(text!, page!);
      expect(ratio, `Surface ${surface} text/page ratio ${ratio} < 7`).toBeGreaterThanOrEqual(7);
    }
  });

  it('All reader surfaces satisfy WCAG contrast of at least 4.5 for reader text on each highlight tint', () => {
    const surfaceNames = ['paper', 'sepia', 'dusk', 'ember', 'black'];
    const tints = ['hl-important', 'hl-definition', 'hl-question'];

    for (const surface of surfaceNames) {
      const surfaceTokens = surfaces[surface];
      const text = surfaceTokens!['reader-text'];
      expect(text).toBeDefined();

      for (const tint of tints) {
        const tintHex = surfaceTokens![tint];
        expect(tintHex, `Missing ${tint} on ${surface}`).toBeDefined();
        const ratio = getContrastRatio(text!, tintHex!);
        expect(
          ratio,
          `Surface ${surface} text/${tint} ratio ${ratio} < 4.5`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
