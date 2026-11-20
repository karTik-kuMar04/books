'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { Icon } from '@/components/icons/icons';

type AuthMode = 'sign-in' | 'sign-up';
type AuthState = 'form' | 'forgot' | 'reset-sent';

export function AuthView() {
  const router = useRouter();
  const [mode, setMode] = React.useState<AuthMode>('sign-in');
  const [state, setState] = React.useState<AuthState>('form');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('reset-sent');
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-[1fr_1.1fr] md:px-8">
      <aside className="hidden md:block">
        <h1 className="font-display text-text text-3xl font-bold">
          Keep every book in one private library.
        </h1>
        <PurposeLine>Sign in to keep your library.</PurposeLine>
        <ul className="text-muted mt-8 space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-primary" /> Resume your exact reading
            position
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-primary" /> Keep Marks and Vocabulary
            together
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-primary" /> Export or delete your data
            anytime
          </li>
        </ul>
      </aside>

      <main className="rounded-card border-border bg-card mx-auto w-full max-w-md border p-6 shadow-sm">
        <div className="mb-6 md:hidden">
          <h1 className="font-display text-text text-2xl font-bold">Folio</h1>
          <PurposeLine>Sign in to keep your library.</PurposeLine>
        </div>

        {state === 'form' ? (
          <>
            <SegmentedControl
              value={mode}
              onChange={setMode}
              options={[
                { value: 'sign-in', label: 'Sign in' },
                { value: 'sign-up', label: 'Sign up' },
              ]}
              className="mb-6 w-full"
            />
            <form className="space-y-4" onSubmit={submit}>
              {mode === 'sign-up' && (
                <label className="block text-sm font-medium">
                  Name
                  <Input
                    className="mt-2"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>
              )}
              <label className="block text-sm font-medium">
                Email
                <Input
                  className="mt-2"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                Password
                <Input
                  className="mt-2"
                  name="password"
                  type="password"
                  autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                  placeholder="At least 8 characters"
                  required
                />
              </label>
              <Button type="submit" className="w-full">
                {mode === 'sign-in' ? 'Sign in' : 'Create account'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push('/library')}
              >
                Continue with Google
              </Button>
              {mode === 'sign-in' && (
                <button
                  type="button"
                  onClick={() => setState('forgot')}
                  className="text-primary min-h-11 w-full text-sm font-medium underline"
                >
                  Forgot password?
                </button>
              )}
            </form>
          </>
        ) : (
          <div className="space-y-4 text-center">
            <div className="bg-primary-soft text-primary-ink mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <Icon name="evidence" size={24} />
            </div>
            <h2 className="font-display text-text text-xl font-bold">
              {state === 'forgot' ? 'Reset link ready' : 'Signed in in this demo'}
            </h2>
            <p className="text-muted text-sm">
              {state === 'forgot'
                ? 'Enter your email again and we will show the reset state.'
                : 'This mock session is ready. You can open your library.'}
            </p>
            <Button
              className="w-full"
              onClick={() =>
                state === 'forgot' ? setState('reset-sent') : router.push('/library')
              }
            >
              {state === 'forgot' ? 'Send reset link' : 'Open Library'}
            </Button>
            <button
              type="button"
              onClick={() => setState('form')}
              className="text-muted min-h-11 text-sm underline"
            >
              Back to sign in
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
