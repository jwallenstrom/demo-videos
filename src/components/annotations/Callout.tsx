import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { hexToRgba } from '../../lib/color';

interface CalloutProps {
  heading: string;
  body?: string;
  color?: string;
  startFrame?: number;
  width?: number;
  style?: React.CSSProperties;
}

// Floating editorial callout panel — for "THE PROBLEM" / "THE INSIGHT" moments.
export const Callout: React.FC<CalloutProps> = ({
  heading,
  body,
  color = colors.signalInfo,
  startFrame = 0,
  width = 320,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.natural,
  });

  return (
    <div
      style={{
        width,
        borderLeft: `2px solid ${color}`,
        background: hexToRgba(color, 0.06),
        borderRadius: '0 6px 6px 0',
        padding: '12px 14px',
        opacity: progress,
        transform: `translateX(${(1 - progress) * -24}px)`,
        ...style,
      }}
    >
      <div
        style={{
          ...typography.label,
          color,
          marginBottom: body ? 6 : 0,
        }}
      >
        {heading}
      </div>
      {body && (
        <div
          style={{
            ...typography.caption,
            color: colors.textSecondary,
            lineHeight: 1.5,
          }}
        >
          {body}
        </div>
      )}
    </div>
  );
};
