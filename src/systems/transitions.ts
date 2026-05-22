import { interpolate } from 'remotion';
import { clamp } from '../lib/interpolation';
import { mulberry32 } from '../lib/seed';

// VoidFade: opacity for scene fade in/out through void background
export function voidFadeOpacity(
  frame: number,
  direction: 'in' | 'out',
  duration: number,
  startFrame = 0,
): number {
  if (direction === 'in') {
    return clamp((frame - startFrame) / duration, 0, 1);
  }
  return clamp(1 - (frame - startFrame) / duration, 0, 1);
}

// DataDissolve: fragment-specific transforms for dissolving telemetry rows
export function dataDissolveTransform(
  frame: number,
  dissolveStartFrame: number,
  dissolveDuration: number,
  itemIndex: number,
  seed: number,
): { opacity: number; translateY: number; translateX: number } {
  const rng = mulberry32(seed + itemIndex * 37);
  const delay = rng() * 8;
  const direction = rng() > 0.5 ? 1 : -1;
  const driftX = (rng() * 20 - 10) * direction;

  const progress = clamp((frame - dissolveStartFrame - delay) / (dissolveDuration - delay), 0, 1);

  return {
    opacity: 1 - progress,
    translateY: -progress * (15 + rng() * 20),
    translateX: driftX * progress,
  };
}

// FadeThrough: general opacity helper for timed fades
export function fadeThrough(
  frame: number,
  startFrame: number,
  duration: number,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// Scene-level opacity envelope: handles enter and exit fades
export function sceneOpacity(
  frame: number,
  totalFrames: number,
  enterDuration: number,
  exitDuration: number,
): number {
  if (frame < enterDuration) {
    return clamp(frame / enterDuration, 0, 1);
  }
  const exitStart = totalFrames - exitDuration;
  if (frame > exitStart) {
    return clamp(1 - (frame - exitStart) / exitDuration, 0, 1);
  }
  return 1;
}
