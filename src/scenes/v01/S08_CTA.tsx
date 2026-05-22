import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { LogoReveal } from '../../components/brand/LogoReveal';
import { CharacterReveal } from '../../components/text/CharacterReveal';
import { FadeInText } from '../../components/text/FadeInText';
import { FramingLabel } from '../../components/text/FramingLabel';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S08 — CTA. Duration: 90 frames (3s).
// Clean void ending: Corridor wordmark, URL, tagline.

export const S08_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 20, 20);

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <AmbientGrid opacity={0.4} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          paddingLeft: canvas.marginX,
          paddingRight: canvas.marginX,
        }}
      >
        <LogoReveal startFrame={10} size="lg" style={{ marginBottom: 24 }} />

        <div
          style={{
            ...typography.heading,
            color: colors.textPrimary,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          <CharacterReveal
            text="The independent control plane"
            startFrame={20}
            springPreset="weighted"
            framesPerChar={1.0}
          />
          <br />
          <CharacterReveal
            text="for AI-generated software."
            startFrame={38}
            springPreset="weighted"
            framesPerChar={1.0}
          />
        </div>

        <FadeInText
          startFrame={55}
          springPreset="natural"
          style={{
            ...typography.subheading,
            color: colors.corridorTeal,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          corridor.dev
        </FadeInText>

        {/* Series label */}
        <FadeInText
          startFrame={65}
          springPreset="natural"
          style={{
            ...typography.caption,
            color: colors.textTertiary,
            textAlign: 'center',
          }}
        >
          VIDEO 1 OF 6 — AI CODING GOVERNANCE SERIES
        </FadeInText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
