import React from 'react';
import { colors } from '../../tokens/colors';

interface GlassPanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderRadius?: number;
  glowColor?: string;
  glowOpacity?: number;
}

// Glassmorphism panel — the primary surface for product UI and dashboards.
// Uses backdrop-filter for the frosted glass effect.
export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
  borderRadius = 8,
  glowColor,
  glowOpacity = 0.04,
}) => {
  const boxShadow = glowColor
    ? `0 0 40px 0 ${glowColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}`
    : undefined;

  return (
    <div
      style={{
        background: 'rgba(13, 13, 26, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255, 255, 255, 0.06)`,
        borderRadius,
        boxShadow,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
