import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { ProductPanel } from '../../components/panels/ProductPanel';
import { ExpandingActivityNode } from '../../components/telemetry/ExpandingActivityNode';
import { FramingLabel } from '../../components/text/FramingLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';
import { SESSION_V01 } from '../../data/fixtures/session-v01';
import { deriveActivityRows } from '../../data/generators/activityRows';

const ACTIVITY_ROWS = deriveActivityRows(SESSION_V01);

// S03 — The Flip. Duration: 150 frames (5s).
// What if you could see everything? Agent activity summary comes into view.
// Each activity row expands from left with count bar.

export const S03_Flip: React.FC = () => {
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
          alignItems: 'center',
          justifyContent: 'center',
          gap: 80,
          paddingLeft: canvas.marginX,
          paddingRight: canvas.marginX,
        }}
      >
        {/* Left: editorial text */}
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column' }}>
          <FramingLabel
            text="AGENT OBSERVATION"
            color={colors.corridorBlue}
            startFrame={10}
            style={{ marginBottom: 20 }}
          />
          <div
            style={{
              ...typography.heading,
              color: colors.textPrimary,
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            <FadeInText startFrame={16} springPreset="weighted" translateY={16}>
              Here's what one Claude Code session{' '}
              <span style={{ color: colors.corridorTeal }}>actually did.</span>
            </FadeInText>
          </div>
          <FadeInText
            startFrame={32}
            springPreset="natural"
            style={{
              ...typography.body,
              color: colors.textSecondary,
              lineHeight: 1.6,
            }}
          >
            Writing a single TypeScript function. 22 events. Most of them are decisions your security posture depends on.
          </FadeInText>
        </div>

        {/* Right: activity panel */}
        <ProductPanel
          title="Session Activity"
          subtitle={SESSION_V01.sessionId}
          accentColor={colors.corridorBlue}
          width={540}
          height={280}
          startFrame={20}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
              padding: '16px 20px',
              height: '100%',
            }}
          >
            {ACTIVITY_ROWS.map((row, i) => (
              <ExpandingActivityNode
                key={row.eventType}
                row={row}
                startFrame={30 + i * 10}
                maxBarWidth={220}
                height={30}
              />
            ))}
          </div>
        </ProductPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
