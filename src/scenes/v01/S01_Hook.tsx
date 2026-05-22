import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { LabelsLayer } from '../../components/ambient/LabelsLayer';
import { CameraWrapper } from '../../components/camera/CameraWrapper';
import { CharacterReveal } from '../../components/text/CharacterReveal';
import { FramingLabel } from '../../components/text/FramingLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S01 — Hook. Duration: 90 frames (3s).
// Void cold open: ambient field fades in, then the title line drops character by character.
// "You can't govern what you can't observe."

export const S01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 12, 10);

  const gridOpacity = Math.min(frame / 30, 1) * 0.6;
  const labelsOpacity = Math.min(Math.max(0, frame - 10) / 20, 1) * 0.8;

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <CameraWrapper
        startScale={1.0}
        endScale={1.02}
        pushStartFrame={0}
        pushDuration={90}
        driftAmplitude={1.5}
      >
        <AmbientGrid opacity={gridOpacity} />
        <LabelsLayer opacity={labelsOpacity} />
      </CameraWrapper>

      {/* Content — centered on canvas */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: canvas.marginX,
          paddingRight: canvas.marginX,
        }}
      >
        {/* Category framing label */}
        <FramingLabel
          text="VIDEO ESSAY — AI GOVERNANCE"
          color={colors.corridorTeal}
          startFrame={8}
          style={{ marginBottom: 24 }}
        />

        {/* Main title */}
        <div
          style={{
            ...typography.displayLG,
            color: colors.textPrimary,
            textAlign: 'center',
            maxWidth: 860,
            lineHeight: 1.2,
          }}
        >
          <CharacterReveal
            text="You can't govern what"
            startFrame={18}
            springPreset="weighted"
            framesPerChar={1.2}
          />
          <br />
          <CharacterReveal
            text="you can't observe."
            startFrame={40}
            springPreset="weighted"
            framesPerChar={1.2}
          />
        </div>

        {/* Subtext */}
        <FadeInText
          startFrame={60}
          springPreset="natural"
          style={{
            ...typography.subheading,
            color: colors.textSecondary,
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          How AI coding agents are creating an entirely new class of software risk.
        </FadeInText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
