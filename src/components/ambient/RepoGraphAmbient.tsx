import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { mulberry32, SEEDS } from '../../lib/seed';
import { colors } from '../../tokens/colors';
import { canvas } from '../../tokens/spacing';

interface GraphNode {
  x: number;
  y: number;
  r: number;
  color: string;
  pulseOffset: number;
}

interface GraphEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

const NODE_COLORS: string[] = [
  colors.corridorBlue,
  colors.corridorTeal,
  colors.agentCopilot,
  colors.signalInfo,
  colors.textTertiary,
];

function buildGraph(seed: number, nodeCount: number): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const rng = mulberry32(seed);
  const next = () => rng();

  const nodes: GraphNode[] = Array.from({ length: nodeCount }, () => ({
    x: 60 + next() * (canvas.width - 120),
    y: 60 + next() * (canvas.height - 120),
    r: 2 + next() * 3,
    color: NODE_COLORS[Math.floor(next() * NODE_COLORS.length)] ?? colors.textTertiary,
    pulseOffset: next() * Math.PI * 2,
  }));

  const edges: GraphEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    if (!nodeA) continue;

    const candidates = nodes
      .map((n, j) => {
        const nodeI = nodes[i];
        if (!nodeI) return null;
        return { j, dist: Math.hypot(n.x - nodeI.x, n.y - nodeI.y) };
      })
      .filter((c): c is { j: number; dist: number } => c !== null && c.j !== i && c.dist < 300)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2 + Math.floor(next() * 2));

    for (const { j } of candidates) {
      if (j > i) {
        const nodeB = nodes[j];
        if (!nodeB) continue;
        edges.push({
          x1: nodeA.x,
          y1: nodeA.y,
          x2: nodeB.x,
          y2: nodeB.y,
          opacity: 0.04 + next() * 0.05,
        });
      }
    }
  }

  return { nodes, edges };
}

const GRAPH = buildGraph(SEEDS.V01_REPO_GRAPH, 40);

interface RepoGraphAmbientProps {
  opacity: number;
}

export const RepoGraphAmbient: React.FC<RepoGraphAmbientProps> = ({ opacity }) => {
  const frame = useCurrentFrame();
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg
        width={canvas.width}
        height={canvas.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {GRAPH.edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={colors.borderSubtle}
            strokeWidth={0.5}
            opacity={edge.opacity}
          />
        ))}
        {GRAPH.nodes.map((node, i) => {
          const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 + node.pulseOffset);
          const r = node.r * (1 + pulse * 0.3);
          const nodeOpacity = 0.15 + pulse * 0.2;
          return (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={r}
              fill={node.color}
              opacity={nodeOpacity}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
