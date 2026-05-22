import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface FramingLabelProps {
  text: string;
  color?: string;
  startFrame?: number;
  style?: React.CSSProperties;
  // Orientation: horizontal rule left-side or no rule
  showRule?: boolean;
}

// Small uppercase category label used to frame editorial sections.
// "AGENT OBSERVATION" / "CORRIDOR INSIGHT" / "THE PATTERN"
export const FramingLabel: React.FC<FramingLabelProps> = ({
  text,
  color = colors.corridorTeal,
  startFrame = 0,
  style,
  showRule = true,
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
        gap: 8,
        opacity: progress,
        transform: `translateX(${(1 - progress) * -16}px)`,
        ...style,
      }}
    >
      {showRule && (
        <div
          style={{
            width: 20 * progress,
            height: 1,
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          ...typography.caption,
          color,
          letterSpacing: '0.12em',
        }}
      >
        {text}
      </span>
    </div>
  );
};
