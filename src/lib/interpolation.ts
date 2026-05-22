// Pure interpolation utilities — no Remotion imports

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp = true,
): number {
  const t = (value - inMin) / (inMax - inMin);
  const result = lerp(outMin, outMax, t);
  return shouldClamp ? clamp(result, Math.min(outMin, outMax), Math.max(outMin, outMax)) : result;
}

// Easing functions (t: 0–1 → 0–1)
export const easing = {
  linear: (t: number) => t,

  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),

  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),

  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),

  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
} as const;

// Frame-based progress: returns 0–1 from startFrame to startFrame+duration
export function frameProgress(
  frame: number,
  startFrame: number,
  duration: number,
  easingFn: (t: number) => number = easing.linear,
): number {
  const t = clamp((frame - startFrame) / duration, 0, 1);
  return easingFn(t);
}

// Opacity interpolation helper: 0 before start, 1 after start+duration
export function fadeIn(frame: number, startFrame: number, duration: number): number {
  return clamp((frame - startFrame) / duration, 0, 1);
}

export function fadeOut(frame: number, startFrame: number, duration: number): number {
  return clamp(1 - (frame - startFrame) / duration, 0, 1);
}
