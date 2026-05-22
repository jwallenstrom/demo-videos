import { FPS } from '../../tokens/timing';

// Scene durations for Video 1 — TheShift
// All values in frames at 30fps

export const V01_SCENE_DURATIONS = {
  S01_HOOK:           90,   // 3.0s — void cold open, title reveal
  S02_SETUP:         150,   // 5.0s — problem framing, two callouts
  S03_FLIP:          150,   // 5.0s — agent activity summary
  S04_EXAMPLE:       240,   // 8.0s — split-screen IDE + telemetry
  S05_IMPLICATION:   150,   // 5.0s — governance gap, three implications
  S06_INFRASTRUCTURE: 180,  // 6.0s — explanation diagram, Corridor pitch
  S07_TAKEAWAY:      120,   // 4.0s — expert insight card
  S08_CTA:            90,   // 3.0s — logo reveal + CTA
} as const;

export const V01_TOTAL_FRAMES =
  Object.values(V01_SCENE_DURATIONS).reduce((sum, n) => sum + n, 0);
// = 1170 frames = 39s

// Scene start offsets for use in Sequence components
export function getV01SceneOffsets(): Record<keyof typeof V01_SCENE_DURATIONS, number> {
  const keys = Object.keys(V01_SCENE_DURATIONS) as (keyof typeof V01_SCENE_DURATIONS)[];
  const offsets = {} as Record<keyof typeof V01_SCENE_DURATIONS, number>;
  let cursor = 0;
  for (const key of keys) {
    offsets[key] = cursor;
    cursor += V01_SCENE_DURATIONS[key];
  }
  return offsets;
}
