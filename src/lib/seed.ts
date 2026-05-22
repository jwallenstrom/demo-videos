// Deterministic PRNG — mulberry32 algorithm
// Same seed always produces the same sequence — required for reproducible renders

export function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let z = Math.imul(s ^ (s >>> 15), 1 | s);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded random integer in [min, max]
export function seededRandInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

// Seeded random float in [min, max]
export function seededRandFloat(rng: () => number, min: number, max: number): number {
  return rng() * (max - min) + min;
}

// Seeded array shuffle (Fisher-Yates)
export function seededShuffle<T>(rng: () => number, arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = result[i];
    const swapTarget = result[j];
    if (temp !== undefined && swapTarget !== undefined) {
      result[i] = swapTarget;
      result[j] = temp;
    }
  }
  return result;
}

// Campaign-level seeds — deterministic per video
export const SEEDS = {
  V01: 2025052200,
  V01_LABELS_LAYER: 2025052201,
  V01_REPO_GRAPH: 2025052202,
} as const;
