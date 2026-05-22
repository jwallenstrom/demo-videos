import { spring, interpolate } from 'remotion';
import { clamp } from '../lib/interpolation';

export type SpringPreset = 'snappy' | 'responsive' | 'natural' | 'weighted' | 'drift';

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

// Named spring presets — from fastest/tightest to slowest/weighted
export const springs: Record<SpringPreset, SpringConfig> = {
  snappy:     { stiffness: 400, damping: 40 },
  responsive: { stiffness: 280, damping: 28 },
  natural:    { stiffness: 120, damping: 20 },
  weighted:   { stiffness: 60,  damping: 18 },
  drift:      { stiffness: 20,  damping: 14 },
};

// Spring value at current frame with optional delay
export function springValue(
  frame: number,
  fps: number,
  preset: SpringPreset,
  delay = 0,
): number {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springs[preset],
  });
}

// Staggered spring: item at index starts after index * staggerFrames
export function staggeredSpring(
  frame: number,
  fps: number,
  index: number,
  staggerFrames: number,
  preset: SpringPreset,
): number {
  return springValue(frame, fps, preset, index * staggerFrames);
}

// Opacity from spring — clamped 0–1
export function opacitySpring(
  frame: number,
  fps: number,
  preset: SpringPreset,
  delay = 0,
): number {
  return clamp(springValue(frame, fps, preset, delay), 0, 1);
}

// Upward drift entrance: returns Y offset (positive = down, starts below final position)
export function translateYSpring(
  frame: number,
  fps: number,
  driftAmount: number,
  preset: SpringPreset,
  delay = 0,
): number {
  const progress = springValue(frame, fps, preset, delay);
  return driftAmount * (1 - progress);
}

// SVG path draw progress: drives strokeDashoffset from totalLength → 0
export function pathDrawProgress(
  frame: number,
  startFrame: number,
  duration: number,
): number {
  return clamp((frame - startFrame) / duration, 0, 1);
}

// Camera push-in: returns scale value
export function cameraScale(
  frame: number,
  fromScale: number,
  toScale: number,
  startFrame: number,
  endFrame: number,
): number {
  return interpolate(frame, [startFrame, endFrame], [fromScale, toScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// Sinusoidal float for ambient elements
export function floatY(frame: number, amplitude: number, periodFrames: number): number {
  return Math.sin((frame / periodFrames) * 2 * Math.PI) * amplitude;
}
