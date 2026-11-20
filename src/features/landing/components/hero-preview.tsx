'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/icons/icons';
import {
  SAMPLE_CHARACTERS,
  SAMPLE_RELATIONSHIPS,
  SAMPLE_CONCEPTS,
  SAMPLE_CONCEPT_LINKS,
} from '@/mocks/sample-data';

// Dynamically import GraphCanvas to avoid bundling Cytoscape into the initial landing bundle
const GraphCanvas = dynamic(
  () => import('@/components/graph/graph-canvas').then((m) => m.GraphCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-card border-border bg-card text-muted flex h-[420px] w-full items-center justify-center border text-sm">
        <Icon name="sparkle" size={20} className="text-primary me-2 animate-spin" />
        Loading interactive map preview...
      </div>
    ),
  },
);

export function HeroPreview() {
  const [mode, setMode] = useState<'story' | 'study'>('story');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const storyNodes = SAMPLE_CHARACTERS.map((c) => ({
    id: c.id,
    name: c.name,
    role: c.role,
    mentionCount: c.mentionCount,
    importanceScore: c.importanceScore,
  }));

  const storyEdges = SAMPLE_RELATIONSHIPS.map((r) => ({
    id: r.id,
    source: r.sourceCharacterId,
    target: r.targetCharacterId,
    type: r.type,
    strength: r.strength,
  }));

  const studyNodes = SAMPLE_CONCEPTS.map((c) => ({
    id: c.id,
    name: c.name,
    role: (c.isImportant ? 'main' : 'supporting') as 'main' | 'supporting',
    mentionCount: c.mentionCount,
    importanceScore: c.isImportant ? 0.9 : 0.6,
  }));

  const studyEdges = SAMPLE_CONCEPT_LINKS.map((l) => ({
    id: l.id,
    source: l.sourceConceptId,
    target: l.targetConceptId,
    type: 'allies' as const,
    strength: 7,
  }));

  return (
    <div className="rounded-dialog border-border bg-card shadow-raised w-full border p-4 sm:p-6">
      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2">
          <Badge variant={mode === 'story' ? 'rose' : 'primary'}>
            {mode === 'story' ? 'Story Mode Preview' : 'Study Mode Preview'}
          </Badge>
          <span className="text-muted text-xs">
            {mode === 'story' ? 'Pride & Prejudice' : 'Cognitive Science'}
          </span>
        </div>

        <SegmentedControl
          size="sm"
          value={mode}
          onChange={(v) => {
            setMode(v);
            setSelectedNodeId(null);
          }}
          options={[
            { value: 'story', label: 'Characters Map' },
            { value: 'study', label: 'Concepts Map' },
          ]}
        />
      </div>

      <div className="mt-4">
        <GraphCanvas
          key={mode}
          nodes={mode === 'story' ? storyNodes : studyNodes}
          edges={mode === 'story' ? storyEdges : studyEdges}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          maxNodes={15}
          listTwin={({ nodes, selectedNodeId: selId, onSelectNode }) => (
            <div className="space-y-2">
              <p className="text-muted text-xs font-semibold tracking-wider uppercase">
                {mode === 'story' ? 'Characters list twin' : 'Concepts list twin'}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {nodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => onSelectNode(node.id === selId ? null : node.id)}
                    className={`rounded-control flex items-center justify-between border p-2 text-start text-xs transition-colors ${
                      node.id === selId
                        ? 'border-primary bg-primary-soft text-primary-ink font-semibold'
                        : 'border-border bg-card hover:bg-page text-text'
                    }`}
                  >
                    <span>{node.name}</span>
                    <span className="text-muted capitalize">{node.role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
