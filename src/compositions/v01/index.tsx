import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { V01_SCENE_DURATIONS, getV01SceneOffsets } from './timing';
import { S01_Hook } from '../../scenes/v01/S01_Hook';
import { S02_Setup } from '../../scenes/v01/S02_Setup';
import { S03_Flip } from '../../scenes/v01/S03_Flip';
import { S04_Example } from '../../scenes/v01/S04_Example';
import { S05_Implication } from '../../scenes/v01/S05_Implication';
import { S06_Infrastructure } from '../../scenes/v01/S06_Infrastructure';
import { S07_Takeaway } from '../../scenes/v01/S07_Takeaway';
import { S08_CTA } from '../../scenes/v01/S08_CTA';
import { colors } from '../../tokens/colors';

const OFFSETS = getV01SceneOffsets();

// TheShift — Video 1: "You Can't Govern What You Can't Observe"
// 1170 frames at 30fps = 39 seconds

export const TheShift: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.void }}>
      <Sequence from={OFFSETS.S01_HOOK} durationInFrames={V01_SCENE_DURATIONS.S01_HOOK}>
        <S01_Hook />
      </Sequence>

      <Sequence from={OFFSETS.S02_SETUP} durationInFrames={V01_SCENE_DURATIONS.S02_SETUP}>
        <S02_Setup />
      </Sequence>

      <Sequence from={OFFSETS.S03_FLIP} durationInFrames={V01_SCENE_DURATIONS.S03_FLIP}>
        <S03_Flip />
      </Sequence>

      <Sequence from={OFFSETS.S04_EXAMPLE} durationInFrames={V01_SCENE_DURATIONS.S04_EXAMPLE}>
        <S04_Example />
      </Sequence>

      <Sequence from={OFFSETS.S05_IMPLICATION} durationInFrames={V01_SCENE_DURATIONS.S05_IMPLICATION}>
        <S05_Implication />
      </Sequence>

      <Sequence from={OFFSETS.S06_INFRASTRUCTURE} durationInFrames={V01_SCENE_DURATIONS.S06_INFRASTRUCTURE}>
        <S06_Infrastructure />
      </Sequence>

      <Sequence from={OFFSETS.S07_TAKEAWAY} durationInFrames={V01_SCENE_DURATIONS.S07_TAKEAWAY}>
        <S07_Takeaway />
      </Sequence>

      <Sequence from={OFFSETS.S08_CTA} durationInFrames={V01_SCENE_DURATIONS.S08_CTA}>
        <S08_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
