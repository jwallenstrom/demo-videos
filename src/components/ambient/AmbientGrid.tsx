import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../../tokens/colors';
import { canvas } from '../../tokens/spacing';

interface AmbientGridProps {
  opacity: number;
  dotSize?: number;
  spacing?: number;
  color?: string;
}

// SVG dot grid covering the full canvas — structural texture for the void background.
// Uses an SVG pattern for efficiency — single circle definition repeated across canvas.
export const AmbientGrid: React.FC<AmbientGridProps> = ({
  opacity,
  dotSize = 1.5,
  spacing: gridSpacing = 40,
  color = colors.borderSubtle,
}) => {
  if (opacity <= 0) return null;

  const patternId = 'ambient-grid-pattern';

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg
        width={canvas.width}
        height={canvas.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <pattern
            id={patternId}
            x={0}
            y={0}
            width={gridSpacing}
            height={gridSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={gridSpacing / 2}
              cy={gridSpacing / 2}
              r={dotSize}
              fill={color}
            />
          </pattern>
        </defs>
        <rect
          width={canvas.width}
          height={canvas.height}
          fill={`url(#${patternId})`}
        />
      </svg>
    </AbsoluteFill>
  );
};
