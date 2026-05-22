import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import type { SpringPreset } from '../../systems/motion';

interface FadeInTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  startFrame?: number;
  springPreset?: SpringPreset;
  // Optional vertical lift distance in px
  translateY?: number;
}

export const FadeInText: React.FC<FadeInTextProps> = ({
  children,
  style,
  startFrame = 0,
  springPreset = 'natural',
  translateY: liftDistance = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs[springPreset],
  });

  const opacity = progress;
  const ty = (1 - progress) * liftDistance;

  return (
    <span
      style={{
        display: 'block',
        opacity,
        transform: `translateY(${ty}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
