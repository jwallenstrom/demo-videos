import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { clamp } from '../lib/interpolation';
import type { SpringPreset } from '../systems/motion';
import { springs } from '../systems/motion';

export interface CharacterRevealResult {
  charOpacities: number[];
  isComplete: boolean;
  completionFrame: number;
}

export function useCharacterReveal(
  text: string,
  framesPerChar: number = 1.5,
  springPreset: SpringPreset = 'weighted',
  startFrame: number = 0,
): CharacterRevealResult {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springConfig = springs[springPreset];
  const completionFrame = startFrame + Math.ceil(text.length * framesPerChar) + 30;

  const charOpacities = text.split('').map((_, i) => {
    const charStartFrame = startFrame + i * framesPerChar;
    const adjustedFrame = frame - charStartFrame;
    if (adjustedFrame < 0) return 0;
    const s = spring({ frame: adjustedFrame, fps, config: springConfig });
    return clamp(s, 0, 1);
  });

  const lastCharFrame = startFrame + (text.length - 1) * framesPerChar;
  const settleFrames = 25;
  const isComplete = frame >= lastCharFrame + settleFrames;

  return { charOpacities, isComplete, completionFrame };
}
