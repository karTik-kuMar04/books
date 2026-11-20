'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/theme-provider';
import { Icon, ICON_NAMES, type IconName } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Progress, ProgressRing } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Kbd } from '@/components/ui/kbd';
import { Banner } from '@/components/ui/banner';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AiChip } from '@/components/patterns/ai-chip';
import { StatusChip } from '@/components/patterns/status-chip';
import { EvidenceLink } from '@/components/patterns/evidence-link';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { EmptyState } from '@/components/patterns/empty-state';
import { SystemState } from '@/components/patterns/system-state';

type ReaderSurface = 'paper' | 'sepia' | 'dusk' | 'ember' | 'black';

const READER_SURFACES: ReaderSurface[] = ['paper', 'sepia', 'dusk', 'ember', 'black'];

const TOKEN_CATEGORIES = [
  {
    category: 'Surfaces & Neutral Content',
    tokens: [
      { name: 'page', bgClass: 'bg-page', fgClass: 'text-text', desc: 'App background' },
      { name: 'card', bgClass: 'bg-card', fgClass: 'text-text', desc: 'Panels, tiles' },
      {
        name: 'raised',
        bgClass: 'bg-raised',
        fgClass: 'text-text',
        desc: 'Menus, dialogs, sheets',
      },
      { name: 'border', bgClass: 'bg-border', fgClass: 'text-text', desc: 'Dividers, outlines' },
      { name: 'muted', bgClass: 'bg-card', fgClass: 'text-muted', desc: 'Captions, hints' },
    ],
  },
  {
    category: 'Primary & Actions (Study Mode)',
    tokens: [
      {
        name: 'primary',
        bgClass: 'bg-primary',
        fgClass: 'text-primary-fg',
        desc: 'Buttons, links, rings, Study',
      },
      {
        name: 'primary-soft',
        bgClass: 'bg-primary-soft',
        fgClass: 'text-primary-ink',
        desc: 'Selected rows, chips',
      },
    ],
  },
  {
    category: 'Amber (User Marks)',
    tokens: [
      { name: 'amber', bgClass: 'bg-amber', fgClass: 'text-amber-fg', desc: 'User marks fill' },
      {
        name: 'amber-soft',
        bgClass: 'bg-amber-soft',
        fgClass: 'text-amber-ink',
        desc: 'Tint behind marks',
      },
    ],
  },
  {
    category: 'Violet (AI Content)',
    tokens: [
      {
        name: 'violet-soft',
        bgClass: 'bg-violet-soft',
        fgClass: 'text-violet-ink',
        desc: 'AI chip background and text',
      },
    ],
  },
  {
    category: 'Rose (Story Mode & Characters)',
    tokens: [
      {
        name: 'rose-soft',
        bgClass: 'bg-rose-soft',
        fgClass: 'text-rose-ink',
        desc: 'Story chip background and text',
      },
    ],
  },
  {
    category: 'Feedback & States',
    tokens: [
      { name: 'success', bgClass: 'bg-page', fgClass: 'text-success', desc: 'Done, ready' },
      { name: 'error', bgClass: 'bg-page', fgClass: 'text-error', desc: 'Failed, destructive' },
    ],
  },
];

function parseRgb(colorStr: string): [number, number, number] | null {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match || !match[1] || !match[2] || !match[3]) return null;
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

function luminanceFromRgb(r: number, g: number, b: number): number {
  const [rL, gL, bL] = [r / 255, g / 255, b / 255].map((v) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * (rL ?? 0) + 0.7152 * (gL ?? 0) + 0.0722 * (bL ?? 0);
}

function contrastFromRgb(c1: string, c2: string): string {
  const rgb1 = parseRgb(c1);
  const rgb2 = parseRgb(c2);
  if (!rgb1 || !rgb2) return '--';
  const l1 = luminanceFromRgb(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = luminanceFromRgb(rgb2[0], rgb2[1], rgb2[2]);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio.toFixed(2);
}

export function DesignGallery() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [activeSurface, setActiveSurface] = useState<ReaderSurface>('paper');
  const [iconFilter, setIconFilter] = useState('');
  const [contrastMap, setContrastMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const newMap: Record<string, string> = {};
      const swatches = document.querySelectorAll<HTMLElement>('[data-swatch-key]');
      swatches.forEach((swatch) => {
        const key = swatch.getAttribute('data-swatch-key');
        if (!key) return;
        const fg = window.getComputedStyle(swatch).color;
        const bg = window.getComputedStyle(swatch).backgroundColor;
        newMap[key] = contrastFromRgb(fg, bg);
      });
      setContrastMap(newMap);
    });
    return () => cancelAnimationFrame(frame);
  }, [theme, resolvedTheme, activeSurface]);

  const filteredIcons = ICON_NAMES.filter((name) =>
    name.toLowerCase().includes(iconFilter.toLowerCase()),
  );

  return (
    <div className="bg-page text-text selection:bg-primary-soft selection:text-primary-ink min-h-screen">
      {/* Top control bar */}
      <header className="border-border bg-card shadow-raised border-b px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="rounded-control bg-primary text-primary-fg flex h-10 w-10 items-center justify-center">
              <Icon name="sparkle" size={24} />
            </span>
            <div>
              <h1 className="font-display text-xl leading-tight font-bold md:text-2xl">
                Folio Design System
              </h1>
              <p className="text-muted text-sm">Foundation tokens, typography & icons</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme switcher */}
            <div className="rounded-control border-border bg-page flex items-center gap-1 border p-1">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`rounded-control focus:ring-primary flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors focus:ring-2 focus:outline-none ${
                    theme === t ? 'bg-primary text-primary-fg' : 'text-muted hover:text-text'
                  }`}
                >
                  <Icon
                    name={t === 'light' ? 'sun' : t === 'dark' ? 'moon' : 'monitor'}
                    size={16}
                  />
                  <span className="capitalize">{t}</span>
                </button>
              ))}
            </div>

            {/* Reader surface switcher */}
            <div className="rounded-control border-border bg-page flex items-center gap-1 border p-1">
              <span className="text-muted px-2 text-xs font-semibold">Surface:</span>
              {READER_SURFACES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSurface(s)}
                  className={`rounded-control focus:ring-primary min-h-[36px] px-3 py-1.5 text-xs font-semibold capitalize transition-colors focus:ring-2 focus:outline-none ${
                    activeSurface === s
                      ? 'bg-primary text-primary-fg'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-8 md:px-8">
        {/* Section 1: Typography */}
        <section aria-labelledby="typography-heading" className="space-y-6">
          <div className="border-border border-b pb-3">
            <h2 id="typography-heading" className="font-display text-text text-2xl font-bold">
              1. Typography & Font Roles
            </h2>
            <p className="text-muted text-sm">
              Loaded exclusively via next/font with zero external network requests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Display / Fraunces */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Headings & Book Titles
                </span>
                <span className="text-muted font-mono text-xs">Fraunces (--nf-display)</span>
              </div>
              <p className="font-display text-text mt-3 text-2xl leading-snug font-bold">
                The Private Book Reader That Explains The Story
              </p>
              <p className="text-muted mt-2 text-sm">
                Latin: The quick brown fox jumps over the lazy dog.
              </p>
            </div>

            {/* UI / Inter */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Interface & System
                </span>
                <span className="text-muted font-mono text-xs">Inter (--nf-ui)</span>
              </div>
              <p className="text-text mt-3 text-base leading-relaxed">
                Clear UI labels, crisp navigation, and comfortable layout text.
              </p>
              <p className="text-muted mt-2 text-sm">
                Tabular figures:{' '}
                <span className="tabular text-text font-medium">0123456789 (ch. 4, p. 112)</span>
              </p>
            </div>

            {/* Reader Default / Literata */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Reading Default
                </span>
                <span className="text-muted font-mono text-xs">Literata (--nf-reading-serif)</span>
              </div>
              <p
                className="text-text mt-3 text-lg leading-relaxed"
                style={{ fontFamily: 'var(--nf-reading-serif, Georgia, serif)' }}
              >
                Call me Ishmael. Some years ago—never mind how long precisely—having little or no
                money in my purse, and nothing particular to interest me on shore.
              </p>
            </div>

            {/* Reader Hyperlegible / Atkinson Hyperlegible Next */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Reading High-Legibility
                </span>
                <span className="text-muted font-mono text-xs">Atkinson Hyperlegible Next</span>
              </div>
              <p
                className="text-text mt-3 text-base leading-relaxed"
                style={{ fontFamily: 'var(--nf-reading-hyper, system-ui, sans-serif)' }}
              >
                Designed for optimal distinction between ambiguous characters: 0 O Q, 1 I l, 8 B.
              </p>
            </div>

            {/* Devanagari */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Devanagari (Hindi, Marathi, Sanskrit, Nepali)
                </span>
                <span className="text-muted font-mono text-xs">Noto Serif & Sans Devanagari</span>
              </div>
              <p
                lang="hi"
                className="text-text mt-3 text-lg leading-relaxed"
                style={{ fontFamily: 'var(--nf-deva-serif, Georgia, serif)' }}
              >
                सभी मनुष्यों को गौरव और अधिकारों के मामले में जन्मजात स्वतन्त्रता प्राप्त है।
              </p>
              <p
                lang="mr"
                className="text-muted mt-2 text-base"
                style={{ fontFamily: 'var(--nf-deva-sans, system-ui, sans-serif)' }}
              >
                सर्व मानवी व्यक्ती जन्मतःच स्वतंत्र आहेत व त्यांना समान प्रतिष्ठा व अधिकार आहेत.
              </p>
            </div>

            {/* Arabic */}
            <div className="rounded-card border-border bg-card border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Arabic, Urdu, Persian
                </span>
                <span className="text-muted font-mono text-xs">Noto Naskh Arabic</span>
              </div>
              <p
                lang="ar"
                dir="rtl"
                className="text-text mt-3 text-right text-xl leading-relaxed"
                style={{ fontFamily: 'var(--nf-arabic, system-ui, sans-serif)' }}
              >
                يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق. وقد وهبوا عقلاً وضميراً وعليهم أن
                يعامل بعضهم بعضاً بروح الإخاء.
              </p>
            </div>

            {/* Admin Mono / JetBrains Mono */}
            <div className="rounded-card border-border bg-card border p-5 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Admin & Code
                </span>
                <span className="text-muted font-mono text-xs">JetBrains Mono (--nf-mono)</span>
              </div>
              <pre
                tabIndex={0}
                aria-label="Code sample"
                className="rounded-control bg-page text-text border-border focus:ring-primary mt-3 overflow-x-auto border p-3 text-xs focus:ring-2 focus:outline-none"
                style={{ fontFamily: 'var(--nf-mono, monospace)' }}
              >
                {`position = { chapterId: "ch-04", startOffset: 1420, endOffset: 1580 };
status = { mode: "study", activeTokens: 24, contrastScore: 7.2 };`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 2: Colour Tokens & Contrast */}
        <section aria-labelledby="tokens-heading" className="space-y-6">
          <div className="border-border border-b pb-3">
            <h2 id="tokens-heading" className="font-display text-text text-2xl font-bold">
              2. Semantic Colour Tokens & Contrast Ratios
            </h2>
            <p className="text-muted text-sm">
              Runtime contrast computed live in active theme ({resolvedTheme}). Target &ge; 4.5.
            </p>
          </div>

          <div className="space-y-8">
            {TOKEN_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-3">
                <h3 className="text-text text-sm font-bold">{cat.category}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.tokens.map((token) => {
                    const swatchKey = `${token.name}-${token.bgClass}-${token.fgClass}`;
                    const ratio = contrastMap[swatchKey];
                    return (
                      <div
                        key={token.name}
                        className="rounded-card border-border bg-card border p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-text font-mono text-sm font-bold">
                            --color-{token.name}
                          </span>
                          {ratio && (
                            <span className="rounded-control bg-page text-text border-border border px-2 py-0.5 text-xs font-bold">
                              {ratio}:1
                            </span>
                          )}
                        </div>
                        <p className="text-muted mt-1 text-xs">{token.desc}</p>
                        <div
                          data-swatch-key={swatchKey}
                          className={`rounded-control border-border mt-3 flex h-12 w-full items-center justify-center border text-xs font-medium ${token.bgClass} ${token.fgClass}`}
                        >
                          <span>Sample text</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Reader Surfaces */}
        <section aria-labelledby="surfaces-heading" className="space-y-6">
          <div className="border-border border-b pb-3">
            <h2 id="surfaces-heading" className="font-display text-text text-2xl font-bold">
              3. Reader Surfaces & Highlight Tints
            </h2>
            <p className="text-muted text-sm">
              Five reader environments. Body text contrast &ge; 7:1; highlight contrast &ge; 4.5:1.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {READER_SURFACES.map((surface) => (
              <div
                key={surface}
                data-reader={surface}
                className="reader-surface rounded-card border-border border p-6 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-current/20 pb-2">
                  <span className="font-display text-base font-bold capitalize">
                    {surface} surface
                  </span>
                  <span className="font-mono text-xs tracking-wider uppercase opacity-80">
                    [data-reader=&apos;{surface}&apos;]
                  </span>
                </div>

                <div className="reader-container mt-4 space-y-3 px-0">
                  <p className="leading-relaxed">
                    A reader lives a thousand lives before he dies.{' '}
                    <span className="hl-important font-semibold">
                      The man who never reads lives only one.
                    </span>{' '}
                    Reading is the{' '}
                    <span className="hl-definition font-semibold">
                      primary vessel of human understanding
                    </span>
                    , asking us{' '}
                    <span className="hl-question font-semibold">
                      what truths lie beyond the visible page?
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-current/20 pt-3 text-xs">
                  <span className="hl-important px-2 py-0.5 font-medium">Important (Star)</span>
                  <span className="hl-definition px-2 py-0.5 font-medium">Definition (Book)</span>
                  <span className="hl-question px-2 py-0.5 font-medium">Question (?)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Custom Icons Gallery */}
        <section aria-labelledby="icons-heading" className="space-y-6">
          <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-3">
            <div>
              <h2 id="icons-heading" className="font-display text-text text-2xl font-bold">
                4. Custom SVG Icon System ({ICON_NAMES.length} icons)
              </h2>
              <p className="text-muted text-sm">
                Defined exclusively in src/components/icons/icons.tsx. Displayed at 16, 20 and 24px.
              </p>
            </div>
            <div className="relative w-full max-w-xs">
              <span className="text-muted absolute inset-y-0 left-2.5 flex items-center">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                aria-label="Search icons by name"
                placeholder="Search icons..."
                value={iconFilter}
                onChange={(e) => setIconFilter(e.target.value)}
                className="rounded-control border-border bg-card text-text placeholder:text-muted focus:ring-primary w-full border py-2 pr-3 pl-8 text-xs focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredIcons.map((name) => (
              <div
                key={name}
                className="rounded-card border-border bg-card flex flex-col items-center justify-between border p-3 text-center"
              >
                <div className="text-text flex w-full items-center justify-center gap-3 py-3">
                  <span title={`${name} (16px)`} className="text-muted">
                    <Icon name={name as IconName} size={16} />
                  </span>
                  <span title={`${name} (20px)`} className="text-text">
                    <Icon name={name as IconName} size={20} />
                  </span>
                  <span title={`${name} (24px)`} className="text-primary">
                    <Icon name={name as IconName} size={24} />
                  </span>
                </div>
                <span className="text-text mt-2 block w-full truncate font-mono text-xs font-semibold">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Core UI Primitives */}
        <section aria-labelledby="ui-heading" className="space-y-6">
          <div className="border-border border-b pb-3">
            <h2 id="ui-heading" className="font-display text-text text-2xl font-bold">
              5. Core UI Primitives
            </h2>
            <p className="text-muted text-sm">
              Accessible buttons, inputs, segmented controls, toggles, badges, and feedback
              components.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Buttons & Icon Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons & Icon Controls</CardTitle>
                <CardDescription>
                  All 44px min touch target with 2px primary focus rings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="border-border flex items-center gap-2 border-t pt-2">
                  <IconButton icon="book-open" label="Open book" />
                  <IconButton icon="bookmark" label="Bookmark" />
                  <IconButton icon="search" label="Search" />
                  <IconButton icon="settings" label="Settings" />
                  <IconButton icon="sparkle" label="AI Insight" />
                </div>
              </CardContent>
            </Card>

            {/* Form Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Inputs & Selection</CardTitle>
                <CardDescription>Semantic token styled form primitives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter book title or author..." aria-label="Sample input" />
                <div className="flex items-center justify-between">
                  <span className="text-text text-sm">Match app theme</span>
                  <Switch defaultChecked aria-label="Match theme toggle" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="demo-check" defaultChecked />
                  <label htmlFor="demo-check" className="text-text cursor-pointer text-sm">
                    Enable high-contrast graph nodes
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Segmented Control & Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Selection & Badges</CardTitle>
                <CardDescription>Mode switches and semantic chips</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SegmentedControl
                  options={[
                    { value: 'story', label: 'Story Mode' },
                    { value: 'study', label: 'Study Mode' },
                  ]}
                  value="story"
                  onChange={() => {}}
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Study: Concepts</Badge>
                  <Badge variant="rose">Story: Characters</Badge>
                  <Badge variant="amber">User Note</Badge>
                  <Badge variant="violet">AI Synthesis</Badge>
                  <Badge variant="success">Extracted</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Progress & Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Progress & Navigation</CardTitle>
                <CardDescription>Reading percentage, rings, and breadcrumbs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-muted flex justify-between text-xs">
                    <span>Reading Progress</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} max={100} />
                </div>
                <div className="flex items-center gap-3">
                  <ProgressRing value={75} size={28} />
                  <span className="text-text text-xs">Stage progress: 75% complete</span>
                </div>
                <Breadcrumbs
                  items={[
                    { label: 'Library', href: '/library' },
                    { label: 'Pride and Prejudice', href: '/book/1' },
                    { label: 'Chapter 2' },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Feedback Banners & Shortcuts */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Announcements & Keybindings</CardTitle>
                <CardDescription>Alerts, accessible banners, and keyboard cues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Banner variant="info" icon="info">
                  Processing chapter summaries in background. You can continue reading.
                </Banner>
                <div className="text-muted flex items-center gap-4 pt-2 text-xs">
                  <span>Quick shortcuts:</span>
                  <span className="flex items-center gap-1">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd> Command palette
                  </span>
                  <span className="flex items-center gap-1">
                    <Kbd>B</Kbd> Bookmark
                  </span>
                  <span className="flex items-center gap-1">
                    <Kbd>F</Kbd> Focus mode
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Pattern Composites & System States */}
        <section aria-labelledby="patterns-heading" className="space-y-6">
          <div className="border-border border-b pb-3">
            <h2 id="patterns-heading" className="font-display text-text text-2xl font-bold">
              6. Pattern Composites & System States
            </h2>
            <PurposeLine>
              Universal patterns: AiChip, 5-state StatusChip, EvidenceLink, EmptyState, and
              SystemState.
            </PurposeLine>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* AI Chips & Status Chips */}
            <Card>
              <CardHeader>
                <CardTitle>Universal Processing Chips</CardTitle>
                <CardDescription>The 5 required states and violet AI tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <AiChip />
                  <AiChip label="AI Summary" />
                  <EvidenceLink
                    evidence={{
                      id: 'demo-ev',
                      bookId: 'b1',
                      chapterId: 'ch1',
                      chapterTitle: 'Chapter 1',
                      startOffset: 0,
                      endOffset: 50,
                      passage: 'Sample passage text.',
                    }}
                  />
                </div>
                <div className="border-border flex flex-wrap gap-2 border-t pt-2">
                  <StatusChip state="queued" />
                  <StatusChip
                    state="running"
                    stageName="Extracting characters"
                    progressPercent={48}
                  />
                  <StatusChip state="ready" />
                  <StatusChip state="failed" reason="DRM protected" />
                  <StatusChip state="skipped" reason="AI features off" />
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State Pattern</CardTitle>
                <CardDescription>
                  Always states what it holds and the exact action that fills it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState
                  icon="marks"
                  title="No marks saved yet"
                  description="Select any passage while reading to add a highlight, question, or private note."
                  actionLabel="Go to Library"
                  onAction={() => {}}
                />
              </CardContent>
            </Card>
          </div>

          {/* System State Variant Previews */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SystemState
              type="offline"
              title="You are offline"
              description="Downloaded books remain fully readable in your local workspace."
              className="min-h-0 py-2"
            />
            <SystemState
              type="limit-reached"
              title="Daily questions limit"
              description="Free quota reached. New AI questions reset at midnight."
              className="min-h-0 py-2"
            />
            <SystemState
              type="unsupported-file"
              title="Scanned PDF detected"
              description="Only digital PDFs with selectable text can be analyzed."
              className="min-h-0 py-2"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
