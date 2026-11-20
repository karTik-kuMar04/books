'use client';

import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { AiChip } from '@/components/patterns/ai-chip';
import { Icon } from '@/components/icons/icons';
import { useReaderStore } from '@/stores/reader-store';
import { useChapter } from '../api/use-chapter';

export function ReaderView({ id }: { id: string }) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState('');
  const [meaningOpen, setMeaningOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const reader = useReaderStore();
  const setBookId = reader.setBookId;
  const { data, loading, error } = useChapter(id, reader.position.chapterId);

  React.useEffect(() => {
    setBookId(id);
  }, [id, setBookId]);

  const paragraphs = data?.chapter.paragraphs ?? [];
  const virtualizer = useVirtualizer({
    count: paragraphs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 6,
  });

  const captureSelection = () => {
    const text = window.getSelection()?.toString().trim() ?? '';
    if (text) setSelectedText(text);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-reader', reader.surface);
  }, [reader.surface]);

  if (loading)
    return (
      <div className="p-8">
        <p className="text-muted text-sm">Opening chapter...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-8">
        <p className="text-error text-sm">{error}</p>
      </div>
    );
  if (!data) return null;

  return (
    <div className="bg-reader-page text-reader-text h-[calc(100vh-3.5rem)] overflow-hidden md:h-[calc(100vh-3.5rem)]">
      <header className="border-border bg-card/95 sticky top-0 z-30 flex h-14 items-center justify-between border-b px-3 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Chapter list">
            <Icon name="chapters" size={16} />
          </Button>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{data.chapter.title}</p>
            <p className="text-muted text-[10px]">
              {data.chapter.wordCount.toLocaleString()} words
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" aria-label="Bookmark">
            <Icon name="bookmark" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Read aloud"
            onClick={() => setPlaying(!playing)}
          >
            <Icon name={playing ? 'pause' : 'play'} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Aa reader settings"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <span className="font-ui text-sm font-bold">Aa</span>
          </Button>
        </div>
      </header>

      <div className="relative flex h-[calc(100%-3.5rem)]">
        {settingsOpen && (
          <aside
            className="border-border bg-card rounded-card shadow-raised absolute inset-x-3 top-3 z-40 max-h-[28rem] overflow-y-auto border p-4 md:right-4 md:left-auto md:w-80"
            aria-label="Reader settings"
          >
            <h2 className="text-text text-sm font-semibold">Aa reader settings</h2>
            <SegmentedControl
              className="mt-4 w-full"
              value={reader.font}
              onChange={(font) => reader.setFont(font)}
              options={[
                { value: 'literata', label: 'Literata' },
                { value: 'atkinson', label: 'Atkinson' },
                { value: 'inter', label: 'Inter' },
              ]}
            />
            <label className="text-muted mt-4 block text-xs">
              Text size: {reader.fontSize}px
              <Slider
                value={[reader.fontSize]}
                min={14}
                max={24}
                step={1}
                onValueChange={(values) => reader.setFontSize(values[0] ?? 18)}
                className="mt-2"
              />
            </label>
            <label className="text-muted mt-4 block text-xs">
              Column width: {reader.columnWidth}
              <Slider
                value={[reader.columnWidth]}
                min={48}
                max={78}
                step={2}
                onValueChange={(values) => reader.setColumnWidth(values[0] ?? 66)}
                className="mt-2"
              />
            </label>
            <p className="text-muted mt-4 text-xs">Reader surface</p>
            <SegmentedControl
              className="mt-2 w-full"
              size="sm"
              value={reader.surface}
              onChange={(surface) => reader.setSurface(surface)}
              options={[
                { value: 'paper', label: 'Paper' },
                { value: 'sepia', label: 'Sepia' },
                { value: 'dusk', label: 'Dusk' },
                { value: 'ember', label: 'Ember' },
                { value: 'black', label: 'Pure black' },
              ]}
            />
          </aside>
        )}

        <div
          ref={parentRef}
          tabIndex={0}
          role="region"
          aria-label="Reader text"
          onMouseUp={captureSelection}
          onKeyUp={captureSelection}
          className="h-full w-full overflow-y-auto px-4 py-8 md:px-8"
        >
          <article
            lang={id === 'book-scripts-test' ? 'hi' : 'en'}
            dir={id === 'book-scripts-test' ? 'ltr' : 'ltr'}
            className="reader-font mx-auto"
            style={{
              maxWidth: `${reader.columnWidth}ch`,
              fontSize: `${reader.fontSize}px`,
              lineHeight: reader.lineHeight,
            }}
          >
            <h1 className="font-display mb-8 text-3xl font-bold">{data.chapter.title}</h1>
            <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
              {virtualizer.getVirtualItems().map((item) => {
                const paragraph = paragraphs[item.index];
                if (!paragraph) return null;
                return (
                  <p
                    key={paragraph.offset}
                    style={{
                      position: 'absolute',
                      top: 0,
                      transform: `translateY(${item.start}px)`,
                      width: '100%',
                    }}
                    className="pb-6"
                  >
                    {paragraph.text}
                  </p>
                );
              })}
            </div>
          </article>
        </div>

        {selectedText && (
          <div className="border-border bg-raised rounded-card shadow-raised absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 border p-2">
            <Button size="sm" variant="ghost" onClick={() => setMeaningOpen(true)}>
              <Icon name="highlighter" size={16} />
              Meaning
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedText('')}>
              <Icon name="close" size={16} />
              Close
            </Button>
          </div>
        )}
      </div>

      {meaningOpen && (
        <Card className="fixed right-4 bottom-4 z-50 max-w-sm p-4">
          <div className="flex items-center justify-between gap-3">
            <AiChip label="Meaning" />
            <button type="button" aria-label="Close Meaning" onClick={() => setMeaningOpen(false)}>
              <Icon name="close" size={16} />
            </button>
          </div>
          <p className="text-text mt-3 text-sm font-semibold">“{selectedText}”</p>
          <p className="text-muted mt-2 text-xs">
            Context meaning is available after text analysis. Evidence opens the cited passage.
          </p>
        </Card>
      )}

      {playing && (
        <div className="border-border bg-card rounded-card fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between border p-3 md:left-auto md:w-96">
          <span className="text-sm font-semibold">Read-aloud</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label="Pause" onClick={() => setPlaying(false)}>
              <Icon name="pause" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close player"
              onClick={() => setPlaying(false)}
            >
              <Icon name="close" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
