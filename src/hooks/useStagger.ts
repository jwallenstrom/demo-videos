// Returns stagger frame offsets for N animated items

export interface StaggerResult {
  getOffset: (index: number) => number;
  totalDuration: number;
}

export function useStagger(
  count: number,
  staggerFrames: number,
  startFrame: number = 0,
): StaggerResult {
  const getOffset = (index: number) => startFrame + index * staggerFrames;
  const totalDuration = (count - 1) * staggerFrames;
  return { getOffset, totalDuration };
}
