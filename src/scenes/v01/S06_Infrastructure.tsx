import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { ExplanationDiagram } from '../../components/diagram/ExplanationDiagram';
import { FramingLabel } from '../../components/text/FramingLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { LogoReveal } from '../../components/brand/LogoReveal';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S06 — Infrastructure Answer. Duration: 180 frames (6s).
// Corridor as the independent control plane between agent and repo.
// Visual: the explanation diagram animates in, then supporting copy.

export const S06_Infrastructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 15, 12);

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <AmbientGrid opacity={0.3} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: canvas.marginX,
          paddingRight: canvas.marginX,
          gap: 0,
        }}
      >
        {/* Logo + category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <LogoReveal startFrame={12} size="md" />
          <FramingLabel
            text="THE ANSWER"
            color={colors.corridorCyan}
            startFrame={18}
            showRule={false}
          />
        </div>

        {/* Headline */}
        <div
          style={{
            ...typography.displayMD,
            color: colors.textPrimary,
            textAlign: 'center',
            maxWidth: 860,
            lineHeight: 1.25,
            marginBottom: 52,
          }}
        >
          <FadeInText startFrame={20} springPreset="weighted" translateY={20}>
            An independent control plane
          </FadeInText>
          <FadeInText startFrame={32} springPreset="weighted" translateY={20}>
            <span style={{ color: colors.corridorCyan }}>between every agent and every repository.</span>
          </FadeInText>
        </div>

        {/* Diagram */}
        <div style={{ marginBottom: 44 }}>
          <ExplanationDiagram startFrame={44} width={760} height={100} />
        </div>

        {/* Three capability lines */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            maxWidth: 800,
          }}
        >
          {[
            { label: 'Full trace', detail: 'Every event, every decision', color: colors.corridorBlue },
            { label: 'Real-time policy', detail: 'Block at plan-time, not review-time', color: colors.corridorTeal },
            { label: 'Independent', detail: 'No model bias. No vendor lock.', color: colors.corridorCyan },
          ].map((item, i) => (
            <FadeInText
              key={i}
              startFrame={90 + i * 12}
              springPreset="natural"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span style={{ ...typography.label, color: item.color }}>{item.label}</span>
              <span style={{ ...typography.caption, color: colors.textTertiary }}>{item.detail}</span>
            </FadeInText>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
