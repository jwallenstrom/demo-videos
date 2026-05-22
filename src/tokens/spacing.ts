// 4px base grid — all spacing values are multiples of 4
export const spacing = {
  1:   4,
  2:   8,
  3:  12,
  4:  16,
  5:  24,
  6:  32,
  7:  40,
  8:  48,
  9:  64,
  10: 80,
  11: 96,
  12: 128,
} as const;

export type SpacingKey = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingKey];

// Canvas-level layout constants
export const canvas = {
  width:         1920,
  height:        1080,
  marginX:       80,
  marginY:       60,
  contentWidth:  1760,
  contentHeight: 960,
} as const;
