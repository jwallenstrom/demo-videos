import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { colors } from '../../tokens/colors';
import { fontFamilies } from '../../tokens/typography';

interface LogoRevealProps {
  startFrame?: number;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: { wordmark: 20, dot: 6, gap: 6 },
  md: { wordmark: 28, dot: 8, gap: 8 },
  lg: { wordmark: 40, dot: 11, gap: 10 },
};

// Corridor wordmark with animated reveal: dot first, then text slides in.
export const LogoReveal: React.FC<LogoRevealProps> = ({
  startFrame = 0,
  style,
  size = 'md',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { wordmark: fontSize, dot: dotSize, gap } = SIZE_MAP[size];

  const dotProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.snappy,
  });

  const textProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame - 6),
    config: springs.responsive,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap,
        ...style,
      }}
    >
      {/* Dot mark */}
      <div
        style={{
          width: dotSize * dotProgress,
          height: dotSize * dotProgress,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.corridorBlue}, ${colors.corridorCyan})`,
          flexShrink: 0,
        }}
      />
      {/* Wordmark */}
      <span
        style={{
          fontFamily: fontFamilies.sans,
          fontSize,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: colors.textPrimary,
          opacity: textProgress,
          transform: `translateX(${(1 - textProgress) * -8}px)`,
          display: 'inline-block',
        }}
      >
        Corridor
      </span>
    </div>
  );
};
