import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import type { ActivityRowDef } from '../../data/fixtures/types';

// Max count values for each event type — used to compute relative bar fill
const MAX_COUNTS: Partial<Record<string, number>> = {
  'file.read': 6,
  'mcp.tool_call': 4,
  'bash.exec': 2,
  'plan.revise': 3,
  'architectural.decision': 2,
  'alt.rejected': 4,
};

interface ExpandingActivityNodeProps {
  row: ActivityRowDef;
  startFrame: number;
  maxBarWidth?: number;
  height?: number;
}

// Single activity row with an animated fill bar that expands from 0 to full.
export const ExpandingActivityNode: React.FC<ExpandingActivityNodeProps> = ({
  row,
  startFrame,
  maxBarWidth = 280,
  height = 32,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.responsive,
  });

  const barProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame - 4),
    config: springs.natural,
  });

  // Parse the count from the "N events" string or raw number string
  const countNum = parseInt(row.count, 10) || 1;
  const maxForType = MAX_COUNTS[row.eventType] ?? 6;
  const fillFraction = Math.min(countNum / maxForType, 1);
  const barWidth = barProgress * maxBarWidth * fillFraction;

  const color = row.eventTypeColor;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height,
        gap: 10,
        opacity: enterProgress,
        transform: `translateX(${(1 - enterProgress) * -20}px)`,
      }}
    >
      {/* Color indicator dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        style={{
          ...typography.monoLabel,
          color: colors.textSecondary,
          width: 160,
          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {row.eventTypeLabel}
      </span>

      {/* Count */}
      <span
        style={{
          ...typography.monoLabel,
          color,
          width: 56,
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {row.count}
      </span>

      {/* Bar track */}
      <div
        style={{
          position: 'relative',
          width: maxBarWidth,
          height: 3,
          background: `${color}1A`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: barWidth,
            background: color,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
