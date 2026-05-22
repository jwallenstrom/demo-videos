import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { RepoGraphAmbient } from '../../components/ambient/RepoGraphAmbient';
import { FramingLabel } from '../../components/text/FramingLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { Callout } from '../../components/annotations/Callout';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S02 — Setup. Duration: 150 frames (5s).
// Problem framing: developers use AI agents, but have zero visibility.
// Visual: repo graph fades in as background texture; two callout blocks appear staggered.

export const S02_Setup: React.FC = () => {
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
      <AmbientGrid opacity={0.4} />
      <RepoGraphAmbient opacity={Math.min(frame / 40, 0.6)} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: canvas.marginX + 40,
          paddingRight: canvas.marginX + 40,
        }}
      >
        <FramingLabel
          text="THE PROBLEM"
          color={colors.signalWarn}
          startFrame={10}
          style={{ marginBottom: 20 }}
        />

        {/* Headline */}
        <div
          style={{
            ...typography.displayMD,
            color: colors.textPrimary,
            maxWidth: 780,
            lineHeight: 1.25,
            marginBottom: 40,
          }}
        >
          <FadeInText startFrame={16} springPreset="weighted" translateY={20}>
            AI agents write code in minutes.
          </FadeInText>
          <FadeInText startFrame={28} springPreset="weighted" translateY={20}>
            <span style={{ color: colors.signalWarn }}>Nobody can see inside.</span>
          </FadeInText>
        </div>

        {/* Two callout blocks */}
        <div style={{ display: 'flex', gap: 24, maxWidth: 820 }}>
          <Callout
            heading="WHAT ENGINEERS SEE"
            body="A pull request. A diff. Finished code."
            color={colors.textTertiary}
            startFrame={45}
            width={340}
          />
          <Callout
            heading="WHAT ACTUALLY HAPPENED"
            body="File reads, MCP tool calls, architectural decisions, rejected alternatives, raw query patterns adopted from legacy code."
            color={colors.signalBlock}
            startFrame={58}
            width={420}
          />
        </div>

        {/* Supporting stat */}
        <FadeInText
          startFrame={80}
          springPreset="natural"
          style={{
            ...typography.body,
            color: colors.textTertiary,
            marginTop: 32,
            maxWidth: 620,
          }}
        >
          The agent makes 22 decisions before writing line one. None of them are visible to your security team.
        </FadeInText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
