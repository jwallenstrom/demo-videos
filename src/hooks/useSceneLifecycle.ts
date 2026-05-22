import { useCurrentFrame } from 'remotion';
import { clamp } from '../lib/interpolation';

export type ScenePhase = 'enter' | 'hold' | 'exit';

export interface SceneLifecycle {
  phase: ScenePhase;
  phaseProgress: number;
  localFrame: number;
  enterProgress: number;
  exitProgress: number;
}

// Provides phase information for a scene based on enter/exit durations
export function useSceneLifecycle(
  enterDuration: number,
  exitDuration: number,
  totalDuration: number,
): SceneLifecycle {
  const frame = useCurrentFrame();

  const enterProgress = clamp(frame / Math.max(enterDuration, 1), 0, 1);
  const exitStart = totalDuration - exitDuration;
  const exitProgress =
    exitDuration > 0
      ? clamp((frame - exitStart) / exitDuration, 0, 1)
      : 0;

  let phase: ScenePhase;
  let phaseProgress: number;

  if (frame < enterDuration) {
    phase = 'enter';
    phaseProgress = enterProgress;
  } else if (frame >= exitStart && exitDuration > 0) {
    phase = 'exit';
    phaseProgress = exitProgress;
  } else {
    phase = 'hold';
    phaseProgress = (frame - enterDuration) / Math.max(exitStart - enterDuration, 1);
  }

  return {
    phase,
    phaseProgress,
    localFrame: frame,
    enterProgress,
    exitProgress,
  };
}
