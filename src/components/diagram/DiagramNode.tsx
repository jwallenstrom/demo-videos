import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { NodeBase } from '../../primitives/graph/NodeBase';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface DiagramNodeProps {
  label: string;
  sublabel?: string;
  width?: number;
  height?: number;
  borderColor?: string;
  fill?: string;
  labelColor?: string;
  startFrame?: number;
  accentDot?: string; // color for a small dot indicator top-right
  style?: React.CSSProperties;
}

export const DiagramNode: React.FC<DiagramNodeProps> = ({
  label,
  sublabel,
  width = 140,
  height = 48,
  borderColor = colors.borderDefault,
  fill = colors.surface,
  labelColor = colors.textPrimary,
  startFrame = 0,
  accentDot,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.responsive,
  });

  const opacity = progress;
  const scale = 0.85 + progress * 0.15;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      <NodeBase
        width={width}
        height={height}
        borderColor={borderColor}
        fill={fill}
        {...(accentDot ? { style: { position: 'relative' as const } } : {})}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            padding: '4px 10px',
          }}
        >
          <span
            style={{
              ...typography.label,
              color: labelColor,
              textAlign: 'center',
            }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              style={{
                ...typography.caption,
                color: colors.textTertiary,
                textAlign: 'center',
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
        {accentDot && (
          <div
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: accentDot,
            }}
          />
        )}
      </NodeBase>
    </div>
  );
};
