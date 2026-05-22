import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { GlassPanel } from '../../primitives/ui/GlassPanel';
import { FramingLabel } from '../text/FramingLabel';
import { CharacterReveal } from '../text/CharacterReveal';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface ExpertInsightCardProps {
  categoryLabel: string;
  headline: string;
  subtext?: string;
  accentColor?: string;
  startFrame?: number;
  width?: number;
  style?: React.CSSProperties;
}

// Lenny-style editorial insight card — category label + bold headline + subtext.
export const ExpertInsightCard: React.FC<ExpertInsightCardProps> = ({
  categoryLabel,
  headline,
  subtext,
  accentColor = colors.corridorCyan,
  startFrame = 0,
  width = 520,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.natural,
  });

  return (
    <div
      style={{
        opacity: containerProgress,
        transform: `translateY(${(1 - containerProgress) * 24}px)`,
        ...style,
      }}
    >
      <GlassPanel
        style={{ width, padding: 28 }}
        glowColor={accentColor}
        glowOpacity={0.08}
      >
        <FramingLabel
          text={categoryLabel}
          color={accentColor}
          startFrame={startFrame + 4}
          style={{ marginBottom: 14 }}
        />
        <div
          style={{
            ...typography.heading,
            color: colors.textPrimary,
            lineHeight: 1.3,
            marginBottom: subtext ? 12 : 0,
          }}
        >
          <CharacterReveal
            text={headline}
            startFrame={startFrame + 8}
            springPreset="weighted"
          />
        </div>
        {subtext && (
          <div
            style={{
              ...typography.body,
              color: colors.textSecondary,
              lineHeight: 1.6,
            }}
          >
            <CharacterReveal
              text={subtext}
              startFrame={startFrame + 14}
              springPreset="natural"
              framesPerChar={0.8}
            />
          </div>
        )}
      </GlassPanel>
    </div>
  );
};
