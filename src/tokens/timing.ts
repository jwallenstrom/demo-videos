export const FPS = 30;

// Named durations in frames at 30fps
export const T = {
  FLASH:      3,   // 100ms
  QUICK:      6,   // 200ms
  FAST:       9,   // 300ms
  NORMAL:     15,  // 500ms
  SLOW:       24,  // 800ms
  DELIBERATE: 30,  // 1.0s
  BREATH:     45,  // 1.5s
  CINEMATIC:  60,  // 2.0s
  EPIC:       90,  // 3.0s
} as const;

// Named stagger offsets in frames
export const STAGGER = {
  TIGHT:  3,
  NORMAL: 6,
  LOOSE:  12,
  WIDE:   18,
} as const;

// Scene duration vocabulary
export const SCENE_DURATION = {
  FLASH:   60,
  SHORT:   90,
  NORMAL:  150,
  LONG:    240,
  FEATURE: 360,
} as const;
