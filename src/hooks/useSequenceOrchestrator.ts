import { useCurrentFrame } from 'remotion';
import { clamp } from '../lib/interpolation';

export interface OrchestratorStep {
  name: string;
  startFrame: number;
  duration: number;
}

export interface SequenceOrchestratorResult {
  // Progress 0–1 within the named step (0 if not yet started, 1 after complete)
  getStepProgress: (name: string) => number;
  // Whether the step is currently active
  isStepActive: (name: string) => boolean;
  // Name of the currently active step, or null
  currentStep: string | null;
}

// Manages a sequence of named animation steps for complex multi-beat scenes.
// Each step's progress is derived from useCurrentFrame() — no state.
export function useSequenceOrchestrator(
  steps: OrchestratorStep[],
): SequenceOrchestratorResult {
  const frame = useCurrentFrame();

  const getStepProgress = (name: string): number => {
    const step = steps.find((s) => s.name === name);
    if (!step) return 0;
    return clamp((frame - step.startFrame) / step.duration, 0, 1);
  };

  const isStepActive = (name: string): boolean => {
    const step = steps.find((s) => s.name === name);
    if (!step) return false;
    return frame >= step.startFrame && frame < step.startFrame + step.duration;
  };

  const currentStep = steps.find(
    (s) => frame >= s.startFrame && frame < s.startFrame + s.duration,
  )?.name ?? null;

  return { getStepProgress, isStepActive, currentStep };
}
