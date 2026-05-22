import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { hexToRgba } from '../../lib/color';

interface AnnotationBadgeProps {
  text: string;
  color?: string;
  startFrame?: number;
  style?: React.CSSProperties;
  // Pointing line: coordinates relative to this element
  lineToX?: number;
  lineToY?: number;
}

// Highlighted badge for in-frame annotations — "SQL INJECTION RISK" etc.
export const AnnotationBadge: React.FC<AnnotationBadgeProps> = ({
  text,
  color = colors.signalBlock,
  startFrame = 0,
  style,
  lineToX,
  lineToY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.snappy,
  });

  const scale = 0.7 + progress * 0.3;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        opacity: progress,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
        ...style,
      }}
    >
      {/* Dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 6px 2px ${hexToRgba(color, 0.5)}`,
        }}
      />
      {/* Label */}
      <span
        style={{
          ...typography.caption,
          color,
          background: hexToRgba(color, 0.12),
          border: `1px solid ${hexToRgba(color, 0.4)}`,
          borderRadius: 3,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 6,
          paddingRight: 6,
          letterSpacing: '0.08em',
        }}
      >
        {text}
      </span>
    </div>
  );
};
