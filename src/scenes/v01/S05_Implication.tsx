import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { FramingLabel } from '../../components/text/FramingLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { Callout } from '../../components/annotations/Callout';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S05 — Implication. Duration: 150 frames (5s).
// The governance gap: security teams can't review what they can't see.
// Three implication blocks stagger in, each with a signal color.

const IMPLICATIONS = [
  {
    heading: 'DEPENDENCY DECISIONS',
    body: 'The agent reads your legacy code and adopts its patterns — including unsafe ones.',
    color: colors.signalBlock,
  },
  {
    heading: 'MCP TOOL AUTHORIZATION',
    body: 'External tool calls happen silently. No human in the loop. No audit trail.',
    color: colors.signalWarn,
  },
  {
    heading: 'PLANNING IS INVISIBLE',
    body: 'Architectural decisions happen in the planning phase. By the time you see a diff, they\'re already committed.',
    color: colors.signalInfo,
  },
] as const;

export const S05_Implication: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 15, 12);

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <AmbientGrid opacity={0.35} />

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
          text="THE GOVERNANCE GAP"
          color={colors.signalBlock}
          startFrame={10}
          style={{ marginBottom: 24 }}
        />

        {/* Bold statement */}
        <div
          style={{
            ...typography.displayMD,
            color: colors.textPrimary,
            maxWidth: 840,
            lineHeight: 1.25,
            marginBottom: 44,
          }}
        >
          <FadeInText startFrame={16} springPreset="weighted" translateY={20}>
            The PR lands clean.{' '}
            <span style={{ color: colors.signalBlock }}>The vulnerability is already in.</span>
          </FadeInText>
        </div>

        {/* Three implication columns */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            maxWidth: 1100,
          }}
        >
          {IMPLICATIONS.map((item, i) => (
            <Callout
              key={i}
              heading={item.heading}
              body={item.body}
              color={item.color}
              startFrame={40 + i * 14}
              width={340}
            />
          ))}
        </div>

        {/* Kicker line */}
        <FadeInText
          startFrame={110}
          springPreset="natural"
          style={{
            ...typography.subheading,
            color: colors.textSecondary,
            marginTop: 36,
            maxWidth: 700,
          }}
        >
          Security has to move from review-time to plan-time.
        </FadeInText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
