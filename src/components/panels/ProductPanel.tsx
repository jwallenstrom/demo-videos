import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { GlassPanel } from '../../primitives/ui/GlassPanel';
import { PanelHeader } from './PanelHeader';
import { colors } from '../../tokens/colors';

interface ProductPanelProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

// Generic product-UI panel with animated entrance.
export const ProductPanel: React.FC<ProductPanelProps> = ({
  title,
  subtitle,
  accentColor = colors.corridorBlue,
  children,
  width = 640,
  height = 480,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.responsive,
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px) scale(${0.97 + progress * 0.03})`,
        ...style,
      }}
    >
      <GlassPanel
        style={{ width, height, display: 'flex', flexDirection: 'column' }}
        glowColor={accentColor}
        glowOpacity={0.06}
      >
        <PanelHeader
          title={title}
          subtitle={subtitle}
          accentColor={accentColor}
        />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {children}
        </div>
      </GlassPanel>
    </div>
  );
};
