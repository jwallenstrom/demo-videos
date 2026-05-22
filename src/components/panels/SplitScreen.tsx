import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { canvas } from '../../tokens/spacing';
import { colors } from '../../tokens/colors';

interface SplitScreenProps {
  left: React.ReactNode;
  right: React.ReactNode;
  // How wide the left panel is as a fraction of canvas width
  splitRatio?: number;
  startFrame?: number;
  // Optional divider glow color
  dividerColor?: string;
  // Vertical insets for the content area
  topOffset?: number;
  bottomOffset?: number;
  style?: React.CSSProperties;
}

// Two-panel split layout. Both panels slide in from opposite sides.
export const SplitScreen: React.FC<SplitScreenProps> = ({
  left,
  right,
  splitRatio = 0.5,
  startFrame = 0,
  dividerColor = colors.corridorBlue,
  topOffset = 0,
  bottomOffset = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.responsive,
  });

  const leftWidth = canvas.width * splitRatio;
  const rightWidth = canvas.width * (1 - splitRatio);
  const dividerX = leftWidth;

  return (
    <AbsoluteFill style={style}>
      {/* Left panel */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: topOffset,
          width: leftWidth,
          height: canvas.height - topOffset - bottomOffset,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${(1 - progress) * -40}px)`,
          opacity: progress,
        }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        style={{
          position: 'absolute',
          left: dividerX,
          top: topOffset,
          width: 1,
          height: canvas.height - topOffset - bottomOffset,
          background: `linear-gradient(180deg, transparent, ${dividerColor}40 30%, ${dividerColor}40 70%, transparent)`,
          opacity: progress,
        }}
      />

      {/* Right panel */}
      <div
        style={{
          position: 'absolute',
          left: dividerX + 1,
          top: topOffset,
          width: rightWidth,
          height: canvas.height - topOffset - bottomOffset,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${(1 - progress) * 40}px)`,
          opacity: progress,
        }}
      >
        {right}
      </div>
    </AbsoluteFill>
  );
};
