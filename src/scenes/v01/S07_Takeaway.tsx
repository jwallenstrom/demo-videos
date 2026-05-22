import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { LabelsLayer } from '../../components/ambient/LabelsLayer';
import { ExpertInsightCard } from '../../components/cards/ExpertInsightCard';
import { FadeInText } from '../../components/text/FadeInText';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';

// S07 — Takeaway. Duration: 120 frames (4s).
// The recurring title-card line. Cinematic register.
// ExpertInsightCard with the campaign's first thesis statement.

export const S07_Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 15, 14);

  const gridOpacity = 0.5;
  const labelsOpacity = Math.min(frame / 20, 0.5);

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <AmbientGrid opacity={gridOpacity} />
      <LabelsLayer opacity={labelsOpacity} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: canvas.marginX,
          paddingRight: canvas.marginX,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 28,
            maxWidth: 900,
          }}
        >
          <ExpertInsightCard
            categoryLabel="THE TAKEAWAY"
            headline="You can't govern what you can't observe."
            subtext="The observability gap isn't a tooling problem. It's a structural one. AI coding needs an independent control plane."
            accentColor={colors.corridorCyan}
            startFrame={10}
            width={840}
          />

          <FadeInText
            startFrame={70}
            springPreset="natural"
            style={{
              ...typography.body,
              color: colors.textTertiary,
              paddingLeft: 4,
            }}
          >
            Next: How security teams can intercept the planning phase before a single line is written.
          </FadeInText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
