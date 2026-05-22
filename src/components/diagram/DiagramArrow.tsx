import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { horizontalConnectorPath } from '../../lib/geometry';
import { colors } from '../../tokens/colors';

interface DiagramArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
  startFrame?: number;
  label?: string | undefined;
  labelColor?: string | undefined;
  dashed?: boolean;
}

export const DiagramArrow: React.FC<DiagramArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = colors.borderDefault,
  strokeWidth = 1,
  startFrame = 0,
  label,
  labelColor,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.snappy,
  });

  const pathD = horizontalConnectorPath(x1, y1, x2, y2);
  // Arrowhead at (x2, y2) pointing right
  const ah = 5;
  const arrowPoints = `${x2},${y2} ${x2 - ah * 1.6},${y2 - ah} ${x2 - ah * 1.6},${y2 + ah}`;

  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - 10;

  return (
    <g opacity={progress}>
      <path
        d={pathD}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon
        points={arrowPoints}
        fill={color}
      />
      {label !== undefined && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          fill={labelColor ?? color}
          fontSize={10}
          fontFamily="'Berkeley Mono', monospace"
          letterSpacing="0.05em"
        >
          {label}
        </text>
      )}
    </g>
  );
};
