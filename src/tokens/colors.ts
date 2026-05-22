export const colors = {
  // Background planes — dark but not pure black; screen-emitted light quality
  void:          '#080810',
  surface:       '#0D0D1A',
  elevated:      '#131326',
  overlay:       '#1A1A2E',
  borderSubtle:  '#1E1E32',
  borderDefault: '#262640',
  borderStrong:  '#32325A',

  // Text hierarchy
  textPrimary:   '#EEEEF6',
  textSecondary: '#8A8AAE',
  textTertiary:  '#4A4A6A',

  // Corridor brand
  corridorBlue:  '#2B7FFF',
  corridorTeal:  '#00C4B4',
  corridorCyan:  '#3DFFF0',
  corridorWhite: '#F0F0F8',

  // Signal system — telemetry status
  signalPass:    '#00D87A',
  signalWarn:    '#F5A623',
  signalBlock:   '#FF3B55',
  signalInfo:    '#5B8EFF',
  signalAgent:   '#9B59F5',
  signalIdle:    '#3A3A5A',

  // Agent identity — consistent across entire campaign
  agentClaudeCode: '#2B7FFF',
  agentCursor:     '#00C4B4',
  agentCopilot:    '#9B59F5',
  agentCodex:      '#F5A623',
  agentDevin:      '#FF6B6B',
  agentWindsurf:   '#43E97B',
} as const;

export type ColorToken = (typeof colors)[keyof typeof colors];

// Opacity variants — used for fills, not text
export const tint = {
  4:  (color: string) => `${color}0A`,
  8:  (color: string) => `${color}14`,
  15: (color: string) => `${color}26`,
  25: (color: string) => `${color}40`,
  40: (color: string) => `${color}66`,
  60: (color: string) => `${color}99`,
  80: (color: string) => `${color}CC`,
} as const;

// Resolved glass panel backgrounds
export const glass = {
  panel:      'rgba(13, 13, 26, 0.72)',
  tooltip:    'rgba(19, 19, 38, 0.90)',
  modal:      'rgba(13, 13, 26, 0.88)',
  annotation: 'rgba(13, 13, 26, 0.85)',
} as const;
