import { useCurrentFrame } from 'remotion';
import { clamp } from '../lib/interpolation';

export interface TypewriterResult {
  visibleCount: number;
  isComplete: boolean;
}

// Fixed-speed typewriter: reveals characters at a constant rate
// More performant than per-character spring for long text (code lines, telemetry)
export function useTypewriter(
  text: string,
  charsPerFrame: number = 2,
  startFrame: number = 0,
): TypewriterResult {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return { visibleCount: 0, isComplete: false };

  const visibleCount = clamp(Math.floor(elapsed * charsPerFrame), 0, text.length);
  const isComplete = visibleCount >= text.length;

  return { visibleCount, isComplete };
}
