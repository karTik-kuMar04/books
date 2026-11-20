'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { PurposeLine } from '@/components/patterns/purpose-line';
import { AiChip } from '@/components/patterns/ai-chip';
import { Icon } from '@/components/icons/icons';
import { api } from '@/api/client';
import { useToastStore } from '@/components/ui/toast';
import type { Character, Evidence } from '@/api/contracts/shared';
import { useCharacters } from '../api/use-characters';

const GraphCanvas = dynamic(
  () => import('@/components/graph/graph-canvas').then((module) => module.GraphCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="bg-card text-muted rounded-card flex h-96 items-center justify-center border text-sm">
        Loading Characters map...
      </div>
    ),
  },
);

export function CharactersView({ id }: { id: string }) {
  const { data, loading, error, refresh } = useCharacters(id);
  const [chapter, setChapter] = React.useState(6);
  const [role, setRole] = React.useState<'all' | 'main' | 'supporting' | 'minor'>('all');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<Character | null>(null);
  const [evidence, setEvidence] = React.useState<Evidence | null>(null);
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState('');
  const [mergeOpen, setMergeOpen] = React.useState(false);
  const [mergeTarget, setMergeTarget] = React.useState('');
  const addToast = useToastStore((state) => state.addToast);

  if (loading)
    return (
      <div className="p-8">
        <p className="text-muted text-sm">Loading Characters map...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-8">
        <p className="text-error text-sm">{error}</p>
      </div>
    );
  if (!data) return null;

  const characters = data.characters.filter(
    (character) =>
      character.firstAppearanceChapter <= chapter && (role === 'all' || character.role === role),
  );
  const characterIds = new Set(characters.map((character) => character.id));
  const relationships = data.relationships.filter(
    (relationship) =>
      relationship.firstObservedChapter <= chapter &&
      characterIds.has(relationship.sourceCharacterId) &&
      characterIds.has(relationship.targetCharacterId),
  );
  const nodes = characters.map((character) => ({
    id: character.id,
    name: character.name,
    role: character.role,
    mentionCount: character.mentionCount,
    importanceScore: character.importanceScore,
  }));
  const edges = relationships.map((relationship) => ({
    id: relationship.id,
    source: relationship.sourceCharacterId,
    target: relationship.targetCharacterId,
    type: relationship.type,
    strength: relationship.strength,
  }));

  const openProfile = (character: Character) => {
    setProfile(character);
    setSelectedId(character.id);
    setRenameValue(character.name);
  };

  const hideCharacter = async (character: Character) => {
    await api.characters.updateCharacter(character.id, { isHidden: true });
    setProfile(null);
    refresh();
    addToast({
      title: 'Character hidden',
      description: character.name,
      action: {
        label: 'Undo',
        onClick: async () => {
          await api.characters.updateCharacter(character.id, { isHidden: false });
          refresh();
        },
      },
    });
  };

  const renameCharacter = async () => {
    if (!profile || !renameValue.trim()) return;
    await api.characters.updateCharacter(profile.id, { name: renameValue.trim() });
    setRenameOpen(false);
    setProfile(null);
    refresh();
  };

  const mergeCharacter = async () => {
    if (!profile || !mergeTarget) return;
    await api.characters.mergeCharacters({
      sourceCharacterId: profile.id,
      targetCharacterId: mergeTarget,
    });
    setMergeOpen(false);
    setProfile(null);
    refresh();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-text text-2xl font-bold md:text-3xl">Characters map</h1>
          <PurposeLine>Who is in this story and how they connect.</PurposeLine>
        </div>
        <Link href={`/book/${id}/read`}>
          <Button variant="outline">
            <Icon name="arrow-left" size={16} />
            Return to Reader
          </Button>
        </Link>
      </div>

      <Card className="mt-6 p-4">
        <div className="grid gap-4 md:grid-cols-[1fr_18rem]">
          <div>
            <p className="text-muted text-xs">Role</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['all', 'main', 'supporting', 'minor'] as const).map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={role === item ? 'primary' : 'outline'}
                  onClick={() => setRole(item)}
                >
                  {item === 'all' ? 'All' : item}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted text-xs">Up to chapter {chapter}</p>
            <Slider
              aria-label="Up to chapter"
              value={[chapter]}
              min={1}
              max={data.maxChapter}
              step={1}
              onValueChange={(values) => setChapter(values[0] ?? 1)}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          selectedNodeId={selectedId}
          onSelectNode={(nodeId) => {
            setSelectedId(nodeId);
            const character = characters.find((item) => item.id === nodeId);
            if (character) openProfile(character);
          }}
          listTwin={({ nodes: listNodes, onSelectNode }) => (
            <div className="grid gap-2">
              {listNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelectNode(node.id)}
                  className="rounded-card border-border hover:bg-page focus-visible:ring-primary flex min-h-11 items-center justify-between border px-4 text-start focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="text-text text-sm font-semibold">{node.name}</span>
                  <span className="text-muted text-xs capitalize">{node.role}</span>
                </button>
              ))}
            </div>
          )}
        />
      </div>

      <Sheet open={profile !== null} onOpenChange={(open) => !open && setProfile(null)}>
        <SheetContent side="right">
          {profile && (
            <>
              <SheetHeader>
                <SheetTitle>{profile.name}</SheetTitle>
                <SheetDescription>
                  {profile.role} character · first appears in chapter{' '}
                  {profile.firstAppearanceChapter}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-muted text-xs">Traits</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-chip bg-page border-border border px-2 py-1 text-xs"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted mb-2 text-xs">Relationships</p>
                  {relationships
                    .filter(
                      (relationship) =>
                        relationship.sourceCharacterId === profile.id ||
                        relationship.targetCharacterId === profile.id,
                    )
                    .map((relationship) => {
                      const otherId =
                        relationship.sourceCharacterId === profile.id
                          ? relationship.targetCharacterId
                          : relationship.sourceCharacterId;
                      const other = characters.find((character) => character.id === otherId);
                      return (
                        <button
                          key={relationship.id}
                          type="button"
                          onClick={() => setEvidence(relationship.evidence)}
                          className="rounded-card border-border hover:bg-page mb-2 flex w-full items-start justify-between gap-3 border p-3 text-start"
                        >
                          <div>
                            <AiChip label="AI" />
                            <p className="text-text mt-1 text-sm font-semibold">
                              {other?.name} · {relationship.type}
                            </p>
                          </div>
                          <span className="text-primary text-xs underline">Evidence</span>
                        </button>
                      );
                    })}
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" onClick={() => setRenameOpen(true)}>
                    Rename
                  </Button>
                  <Button variant="outline" onClick={() => setMergeOpen(true)}>
                    Merge
                  </Button>
                  <Button variant="ghost" onClick={() => void hideCharacter(profile)}>
                    Hide character
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={evidence !== null} onOpenChange={(open) => !open && setEvidence(null)}>
        <DialogContent>
          {evidence && (
            <>
              <DialogHeader>
                <DialogTitle>{evidence.chapterTitle}</DialogTitle>
                <DialogDescription>
                  Cited passage with character offset {evidence.startOffset}–{evidence.endOffset}
                </DialogDescription>
              </DialogHeader>
              <blockquote className="rounded-card border-border bg-page border p-4 text-sm leading-relaxed">
                {evidence.passage}
              </blockquote>
              <DialogFooter>
                <Link href={`/book/${id}/read`}>
                  <Button>Open in Reader</Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename character</DialogTitle>
            <DialogDescription>Edit wins over later analysis.</DialogDescription>
          </DialogHeader>
          <input
            value={renameValue}
            onChange={(event) => setRenameValue(event.target.value)}
            className="rounded-control border-border bg-card h-11 border px-3"
            aria-label="Character name"
          />
          <DialogFooter>
            <Button onClick={() => void renameCharacter()}>Save name</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={mergeOpen} onOpenChange={setMergeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge character</DialogTitle>
            <DialogDescription>Choose the character to keep.</DialogDescription>
          </DialogHeader>
          <select
            value={mergeTarget}
            onChange={(event) => setMergeTarget(event.target.value)}
            className="rounded-control border-border bg-card h-11 border px-3"
            aria-label="Merge target"
          >
            <option value="">Select character</option>
            {characters
              .filter((character) => character.id !== profile?.id)
              .map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
          </select>
          <DialogFooter>
            <Button onClick={() => void mergeCharacter()} disabled={!mergeTarget}>
              Merge characters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
