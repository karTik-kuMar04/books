'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { storage } from '@/lib/storage';
import { usageLimits } from '@/config/limits';

const sections = ['profile', 'appearance', 'read-aloud', 'ai', 'data', 'account', 'usage'] as const;
type Section = (typeof sections)[number];

function downloadFile(name: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function SettingsView({ section = 'profile' }: { section?: string }) {
  const active = sections.includes(section as Section) ? (section as Section) : 'profile';
  const [aiEnabled, setAiEnabled] = React.useState(() => storage.get('folio-ai-enabled', true));
  const [confirmType, setConfirmType] = React.useState<'book' | 'data' | 'account' | null>(null);
  const [confirmation, setConfirmation] = React.useState('');

  const setAI = (enabled: boolean) => {
    setAiEnabled(enabled);
    storage.set('folio-ai-enabled', enabled);
  };

  const destructiveConfirmed =
    confirmation ===
    (confirmType === 'book'
      ? 'DELETE BOOK'
      : confirmType === 'data'
        ? 'DELETE DATA'
        : 'DELETE ACCOUNT');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Settings</h1>
      <PurposeLine>Make it yours.</PurposeLine>
      <div className="mt-6 grid gap-6 md:grid-cols-[14rem_1fr]">
        <nav aria-label="Settings sections" className="flex flex-wrap gap-2 md:flex-col">
          {sections.map((item) => (
            <a
              key={item}
              href={`/settings/${item}`}
              className={`rounded-control border-border min-h-11 border px-3 py-2 text-sm capitalize ${active === item ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:bg-page'}`}
            >
              {item === 'read-aloud'
                ? 'Read-aloud'
                : item === 'ai'
                  ? 'AI and privacy'
                  : item === 'data'
                    ? 'Data and export'
                    : item}
            </a>
          ))}
        </nav>

        <Card className="p-5 md:p-6">
          {active === 'profile' && (
            <div>
              <h2 className="font-display text-lg font-bold">Profile</h2>
              <p className="text-muted mt-2 text-sm">
                Name and account details are stored in the mock session.
              </p>
            </div>
          )}
          {active === 'appearance' && (
            <div>
              <h2 className="font-display text-lg font-bold">Appearance and reading</h2>
              <p className="text-muted mt-2 text-sm">
                Theme, font, size, spacing, and reader width are controlled from the Reader Aa panel
                and public theme switch.
              </p>
            </div>
          )}
          {active === 'read-aloud' && (
            <div>
              <h2 className="font-display text-lg font-bold">Read-aloud</h2>
              <p className="text-muted mt-2 text-sm">
                Default speed and voice will be used by the Web Speech adapter.
              </p>
            </div>
          )}
          {active === 'ai' && (
            <div>
              <h2 className="font-display text-lg font-bold">AI and privacy</h2>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">AI features</p>
                  <p className="text-muted mt-1 text-sm">
                    {aiEnabled
                      ? 'AI insights are enabled.'
                      : 'AI features are off. AI surfaces show Skipped.'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={aiEnabled}
                  aria-label="AI features"
                  onClick={() => setAI(!aiEnabled)}
                  className="rounded-chip bg-border relative h-7 w-12"
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full transition-transform ${aiEnabled ? 'bg-primary start-6' : 'bg-card start-1'}`}
                  />
                </button>
              </div>
              <p className="text-muted mt-6 text-sm">
                No private book text, Marks, or notes leave this browser in the mock application.
              </p>
            </div>
          )}
          {active === 'data' && (
            <div>
              <h2 className="font-display text-lg font-bold">Data and export</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadFile(
                      'folio-marks.md',
                      '# Folio Marks\n\nExported locally.',
                      'text/markdown',
                    )
                  }
                >
                  Marks Markdown
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadFile(
                      'folio-marks.json',
                      JSON.stringify({ marks: [] }, null, 2),
                      'application/json',
                    )
                  }
                >
                  Marks JSON
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadFile(
                      'folio-cards.csv',
                      'front,back\nWorking memory,Active mental workspace',
                      'text/csv',
                    )
                  }
                >
                  Cards CSV
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadFile(
                      'folio-library.json',
                      JSON.stringify({ library: [] }, null, 2),
                      'application/json',
                    )
                  }
                >
                  Library JSON
                </Button>
              </div>
              <Button
                size="sm"
                variant="destructive"
                className="mt-6"
                onClick={() => setConfirmType('data')}
              >
                Delete all data
              </Button>
            </div>
          )}
          {active === 'account' && (
            <div>
              <h2 className="font-display text-lg font-bold">Account and security</h2>
              <Button
                size="sm"
                variant="destructive"
                className="mt-4"
                onClick={() => setConfirmType('account')}
              >
                Delete account
              </Button>
            </div>
          )}
          {active === 'usage' && (
            <div>
              <h2 className="font-display text-lg font-bold">Usage and limits</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <Card className="p-4">
                  <dt className="text-muted text-xs">AI questions per day</dt>
                  <dd className="text-text mt-1 text-lg font-bold">
                    {usageLimits.maxQuestionsPerDay}
                  </dd>
                </Card>
                <Card className="p-4">
                  <dt className="text-muted text-xs">Maximum upload size</dt>
                  <dd className="text-text mt-1 text-lg font-bold">
                    {usageLimits.maxUploadSizeBytes / 1024 / 1024} MB
                  </dd>
                </Card>
                <Card className="p-4">
                  <dt className="text-muted text-xs">Maximum books</dt>
                  <dd className="text-text mt-1 text-lg font-bold">
                    {usageLimits.maxBooksPerUser}
                  </dd>
                </Card>
              </dl>
            </div>
          )}
        </Card>
      </div>

      <Dialog
        open={confirmType !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmType(null);
            setConfirmation('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Type the confirmation</DialogTitle>
            <DialogDescription>
              {confirmType === 'book'
                ? 'DELETE BOOK'
                : confirmType === 'data'
                  ? 'DELETE DATA'
                  : 'DELETE ACCOUNT'}
            </DialogDescription>
          </DialogHeader>
          <input
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            aria-label="Typed confirmation"
            className="rounded-control border-border bg-card h-11 border px-3"
          />
          <DialogFooter>
            <Button
              variant="destructive"
              disabled={!destructiveConfirmed}
              onClick={() => {
                setConfirmType(null);
                setConfirmation('');
              }}
            >
              Confirm delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
