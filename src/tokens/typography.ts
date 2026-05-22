import type React from 'react';

export const fontFamilies = {
  sans: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
  mono: "'Berkeley Mono', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const;

// Full type style objects — used directly as React.CSSProperties subsets
export const typography = {
  displayXL: {
    fontFamily: fontFamilies.sans,
    fontSize: 56,
    fontWeight: 700,
    letterSpacing: '-0.015em',
    lineHeight: 1.1,
  },
  displayLG: {
    fontFamily: fontFamilies.sans,
    fontSize: 46,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.1,
  },
  displayMD: {
    fontFamily: fontFamilies.sans,
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.15,
  },
  heading: {
    fontFamily: fontFamilies.sans,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
  subheading: {
    fontFamily: fontFamilies.sans,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: '-0.005em',
    lineHeight: 1.3,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: '0em',
    lineHeight: 1.5,
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.06em',
    lineHeight: 1.4,
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.4,
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
  },
  monoCode: {
    fontFamily: fontFamilies.mono,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: '0em',
    lineHeight: 1.6,
  },
  monoLabel: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: '0em',
    lineHeight: 1.5,
  },
  monoSmall: {
    fontFamily: fontFamilies.mono,
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: '0em',
    lineHeight: 1.5,
  },
} as const;

export type TypographyKey = keyof typeof typography;
export type TypographyStyle = (typeof typography)[TypographyKey];
