import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface SyncLabelProps {
  leftLabel: string;
  rightLabel: string;
  startFrame?: number;
  style?: React.CSSProperties;
}

// Connector label used in S04 split-screen to show the two panels are in sync.
export const SyncLabel: React.FC<SyncLabelProps> = ({
  leftLabel,
  rightLabel,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.snappy,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        opacity: progress,
        ...style,
      }}
    >
      <span
        style={{
          ...typography.caption,
          color: colors.textTertiary,
          textAlign: 'right',
        }}
      >
        {leftLabel}
      </span>
      <div
        style={{
          width: 32,
          height: 1,
          background: `linear-gradient(90deg, ${colors.textTertiary}, ${colors.corridorBlue}, ${colors.textTertiary})`,
          margin: '0 8px',
          opacity: 0.6,
        }}
      />
      <span
        style={{
          ...typography.caption,
          color: colors.textTertiary,
        }}
      >
        {rightLabel}
      </span>
    </div>
  );
};
