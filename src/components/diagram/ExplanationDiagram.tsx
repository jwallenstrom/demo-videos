import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { DiagramNode } from './DiagramNode';
import { DiagramArrow } from './DiagramArrow';
import { colors } from '../../tokens/colors';

// Static layout: Agent → [Corridor Control Plane] → Repository
// Used in S05 and S06 to visualize the governance layer.

interface ExplanationDiagramProps {
  startFrame?: number;
  width?: number;
  height?: number;
}

export const ExplanationDiagram: React.FC<ExplanationDiagramProps> = ({
  startFrame = 0,
  width = 700,
  height = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const overallProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.natural,
  });

  if (overallProgress <= 0.01) return null;

  const nodeW = 148;
  const nodeH = 52;
  const cy = height / 2;

  const node1X = 0;
  const node2X = (width - nodeW) / 2;
  const node3X = width - nodeW;

  const arrow1StartFrame = startFrame + 6;
  const arrow2StartFrame = startFrame + 12;

  return (
    <div style={{ position: 'relative', width, height, opacity: overallProgress }}>
      {/* SVG for arrows — renders behind nodes */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
        width={width}
        height={height}
      >
        <DiagramArrow
          x1={node1X + nodeW}
          y1={cy}
          x2={node2X}
          y2={cy}
          color={colors.corridorBlue}
          startFrame={arrow1StartFrame}
        />
        <DiagramArrow
          x1={node2X + nodeW}
          y1={cy}
          x2={node3X}
          y2={cy}
          color={colors.corridorTeal}
          startFrame={arrow2StartFrame}
        />
      </svg>

      {/* Agent node */}
      <div style={{ position: 'absolute', left: node1X, top: cy - nodeH / 2 }}>
        <DiagramNode
          label="AI Agent"
          sublabel="Claude Code"
          width={nodeW}
          height={nodeH}
          borderColor={colors.agentClaudeCode}
          fill={`${colors.agentClaudeCode}14`}
          labelColor={colors.textPrimary}
          startFrame={startFrame}
          accentDot={colors.agentClaudeCode}
        />
      </div>

      {/* Corridor node */}
      <div style={{ position: 'absolute', left: node2X, top: cy - nodeH / 2 }}>
        <DiagramNode
          label="Corridor"
          sublabel="Control Plane"
          width={nodeW}
          height={nodeH}
          borderColor={colors.corridorBlue}
          fill={`${colors.corridorBlue}1A`}
          labelColor={colors.corridorCyan}
          startFrame={startFrame + 4}
        />
      </div>

      {/* Repository node */}
      <div style={{ position: 'absolute', left: node3X, top: cy - nodeH / 2 }}>
        <DiagramNode
          label="Repository"
          sublabel="Protected"
          width={nodeW}
          height={nodeH}
          borderColor={colors.signalPass}
          fill={`${colors.signalPass}0D`}
          labelColor={colors.textPrimary}
          startFrame={startFrame + 8}
          accentDot={colors.signalPass}
        />
      </div>
    </div>
  );
};
