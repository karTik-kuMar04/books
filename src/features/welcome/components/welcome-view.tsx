'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { Icon } from '@/components/icons/icons';
import { storage } from '@/lib/storage';

type Mode = 'story' | 'study' | 'both';
type Theme = 'light' | 'dark';
type Font = 'literata' | 'atkinson' | 'inter';

export function WelcomeView() {
  const router = useRouter();

  // Step 1: Choose reading mode
  const [mode, setMode] = React.useState<Mode>('story');
  // Step 2: Add first book (sample or skip)
  const [bookAdded, setBookAdded] = React.useState<boolean>(false);
  // Step 3: Pick look (theme & font)
  const [theme, setTheme] = React.useState<Theme>('light');
  const [font, setFont] = React.useState<Font>('literata');

  const handleFinish = () => {
    // Persist selections
    storage.set('folio-mode', mode);
    storage.set('folio-theme', theme);
    storage.set('folio-font', font);
    // In a real app we would also add a sample book to the library if not skipped
    router.push('/library');
  };

  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <Badge variant="primary">Welcome</Badge>
        <h1 className="font-display text-text mt-2 text-2xl font-bold md:text-3xl">
          Set up in three steps
        </h1>
        <PurposeLine className="mt-2">Set up in three steps</PurposeLine>
      </div>

      {/* Step 1 – What do you read */}
      <Card className="mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-text text-lg font-semibold">1. What do you read?</h2>
          <Button variant="ghost" size="sm" onClick={() => setMode('story')}>
            Skip
          </Button>
        </div>
        <div className="space-y-2">
          <SegmentedControl
            size="default"
            value={mode}
            onChange={(v) => setMode(v as Mode)}
            options={[
              { value: 'story', label: 'Stories' },
              { value: 'study', label: 'Study' },
              { value: 'both', label: 'Both' },
            ]}
          />
        </div>
      </Card>

      {/* Step 2 – Add first book */}
      <Card className="mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-text text-lg font-semibold">2. Add a first book</h2>
          <Button variant="ghost" size="sm" onClick={() => setBookAdded(true)}>
            Skip
          </Button>
        </div>
        {bookAdded ? (
          <p className="text-muted">You can add books later from the Library.</p>
        ) : (
          <Button size="lg" onClick={() => setBookAdded(true)}>
            <Icon name="book-open" size={20} className="me-2" />
            Add a sample book
          </Button>
        )}
      </Card>

      {/* Step 3 – Pick a look */}
      <Card className="mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-text text-lg font-semibold">3. Pick a look</h2>
          <Button variant="ghost" size="sm" onClick={handleFinish}>
            Skip
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-muted mb-2">Theme</p>
            <SegmentedControl
              size="sm"
              value={theme}
              onChange={(v) => setTheme(v as Theme)}
              options={[
                { value: 'light', label: 'Stone' },
                { value: 'dark', label: 'Night' },
              ]}
            />
          </div>
          <div>
            <p className="text-muted mb-2">Font</p>
            <SegmentedControl
              size="sm"
              value={font}
              onChange={(v) => setFont(v as Font)}
              options={[
                { value: 'literata', label: 'Literata' },
                { value: 'atkinson', label: 'Atkinson' },
                { value: 'inter', label: 'Inter' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Finish button */}
      <div className="mt-8 text-center">
        <Button size="lg" onClick={handleFinish}>
          Go to Library
        </Button>
      </div>
    </div>
  );
}
