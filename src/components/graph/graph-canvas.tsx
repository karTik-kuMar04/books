'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import cytoscape, { type Core, type NodeSingular } from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/icons';
import { cn } from '@/lib/cn';

if (typeof window !== 'undefined') {
  try {
    cytoscape.use(fcose);
  } catch {
    // Already registered
  }
}

export interface GraphNodeData {
  id: string;
  name: string;
  role: 'main' | 'supporting' | 'minor';
  mentionCount: number;
  importanceScore: number;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  type: 'family' | 'allies' | 'romance' | 'rivals' | 'co_occurrence';
  strength: number;
  isAiGenerated?: boolean;
}

export interface GraphCanvasProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  onSelectNode?: (nodeId: string | null) => void;
  selectedNodeId?: string | null;
  maxNodes?: number;
  className?: string;
  listTwin: (props: {
    nodes: GraphNodeData[];
    edges: GraphEdgeData[];
    selectedNodeId: string | null;
    onSelectNode: (id: string | null) => void;
  }) => React.ReactNode;
}

export function GraphCanvas({
  nodes,
  edges,
  onSelectNode,
  selectedNodeId = null,
  maxNodes = 25,
  className,
  listTwin,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [activeView, setActiveView] = useState<'graph' | 'list'>('graph');
  const [limit, setLimit] = useState(maxNodes);
  const graphRegionId = useId();

  // Filter nodes according to current limit
  const visibleNodes = nodes.slice(0, limit);
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target),
  );

  const hasMore = nodes.length > limit;

  // Initialize and update Cytoscape
  useEffect(() => {
    if (!containerRef.current || activeView !== 'graph') return;

    // Detect reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resolve semantic theme tokens at runtime to avoid hard-coded color literals
    const getThemeColor = (varName: string) => {
      if (typeof window === 'undefined') return 'currentColor';
      return (
        getComputedStyle(document.documentElement).getPropertyValue(varName).trim() ||
        'currentColor'
      );
    };

    const nodeColor = getThemeColor('--color-text');
    const nodeBg = getThemeColor('--color-card');
    const primaryColor = getThemeColor('--color-primary');
    const primarySoft = getThemeColor('--color-primary-soft');
    const amberColor = getThemeColor('--color-amber-strong');
    const roseColor = getThemeColor('--color-rose');
    const errorColor = getThemeColor('--color-error');
    const mutedColor = getThemeColor('--color-muted');

    // Convert data to Cytoscape format
    const elements = [
      ...visibleNodes.map((n) => ({
        data: {
          id: n.id,
          label: n.name,
          role: n.role,
          size: Math.max(28, Math.min(52, 28 + n.importanceScore * 24)),
          borderWidth: n.role === 'main' ? 3 : 1.5,
        },
      })),
      ...visibleEdges.map((e) => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          type: e.type,
          strength: e.strength,
          width: Math.max(1.5, Math.min(6, e.strength / 1.6)),
        },
      })),
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'font-family': 'var(--font-ui, sans-serif)',
            'font-size': '11px',
            'font-weight': 600,
            color: nodeColor,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': nodeBg,
            'border-color': primaryColor,
            'border-width': 'data(borderWidth)',
            width: 'data(size)',
            height: 'data(size)',
            'transition-property': 'background-color, border-color, opacity',
            'transition-duration': prefersReducedMotion ? 0 : 200,
          },
        },
        {
          selector: 'node:selected, node.selected',
          style: {
            'border-color': primaryColor,
            'border-width': 4,
            'background-color': primarySoft,
          },
        },
        {
          selector: 'node.faded',
          style: {
            opacity: 0.25,
          },
        },
        // Edge styling by relationship type
        {
          selector: 'edge[type="family"]',
          style: {
            'line-color': primaryColor,
            'line-style': 'solid',
            width: 'data(width)',
            opacity: 0.85,
          },
        },
        {
          selector: 'edge[type="allies"]',
          style: {
            'line-color': amberColor,
            'line-style': 'solid',
            width: 'data(width)',
            opacity: 0.85,
          },
        },
        {
          selector: 'edge[type="romance"]',
          style: {
            'line-color': roseColor,
            'line-style': 'solid',
            width: 'data(width)',
            opacity: 0.85,
          },
        },
        {
          selector: 'edge[type="rivals"]',
          style: {
            'line-color': errorColor,
            'line-style': 'dashed',
            width: 'data(width)',
            opacity: 0.85,
          },
        },
        {
          selector: 'edge[type="co_occurrence"]',
          style: {
            'line-color': mutedColor,
            'line-style': 'dotted',
            width: 'data(width)',
            opacity: 0.6,
          },
        },
        {
          selector: 'edge.faded',
          style: {
            opacity: 0.15,
          },
        },
      ],
      layout: {
        name: prefersReducedMotion ? 'concentric' : 'fcose',
        animate: !prefersReducedMotion,
        animationDuration: 300,
        nodeRepulsion: 4500,
        idealEdgeLength: 85,
      } as cytoscape.LayoutOptions,
      userZoomingEnabled: true,
      userPanningEnabled: true,
    });

    cyRef.current = cy;

    // Node tap handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target as NodeSingular;
      const id = node.id();
      onSelectNode?.(id);
    });

    // Background tap resets selection
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        onSelectNode?.(null);
      }
    });

    return () => {
      cy.destroy();
    };
  }, [visibleNodes, visibleEdges, activeView, onSelectNode]);

  // Update selection highlight
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    if (!selectedNodeId) {
      cy.elements().removeClass('faded selected');
      return;
    }

    const sel = cy.getElementById(selectedNodeId);
    if (sel.length === 0) return;

    const neighborhood = sel.closedNeighborhood();
    cy.elements().addClass('faded');
    neighborhood.removeClass('faded');
    sel.addClass('selected');
  }, [selectedNodeId]);

  // Export graph as PNG
  const handleExportPng = () => {
    if (!cyRef.current) return;
    const bg =
      typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue('--color-card').trim()
        : '';
    const png = cyRef.current.png({ full: true, scale: 2, bg: bg || undefined });
    const a = document.createElement('a');
    a.href = png;
    a.download = 'folio-graph.png';
    a.click();
  };

  return (
    <div
      className={cn(
        'rounded-card border-border bg-card flex flex-col overflow-hidden border',
        className,
      )}
    >
      {/* Graph Toolbar */}
      <div className="border-border bg-page/60 flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={activeView === 'graph' ? 'primary' : 'ghost'}
            onClick={() => setActiveView('graph')}
            className="h-8 min-h-[32px] text-xs"
          >
            <Icon name="characters" size={16} />
            Map
          </Button>
          <Button
            size="sm"
            variant={activeView === 'list' ? 'primary' : 'ghost'}
            onClick={() => setActiveView('list')}
            className="h-8 min-h-[32px] text-xs"
          >
            <Icon name="list" size={16} />
            List Twin
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {hasMore && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setLimit((l) => l + 15)}
              className="h-8 min-h-[32px] text-xs"
            >
              Show {Math.min(15, nodes.length - limit)} more
            </Button>
          )}

          {activeView === 'graph' && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportPng}
              className="h-8 min-h-[32px] text-xs"
              title="Export as PNG"
            >
              <Icon name="download" size={16} />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'graph' ? (
        <div
          id={graphRegionId}
          ref={containerRef}
          role="img"
          aria-label="Interactive character and concept map"
          className="bg-card h-[480px] w-full"
        />
      ) : (
        <div className="max-h-[480px] overflow-y-auto p-4">
          {listTwin({
            nodes: visibleNodes,
            edges: visibleEdges,
            selectedNodeId,
            onSelectNode: (id) => onSelectNode?.(id),
          })}
        </div>
      )}
    </div>
  );
}
