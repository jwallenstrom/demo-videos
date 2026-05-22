import React from 'react';
import { PillBadge } from '../../primitives/ui/PillBadge';
import { colors } from '../../tokens/colors';
import type { EventStatus } from '../../data/fixtures/types';

interface StatusBadgeProps {
  status: EventStatus;
  style?: React.CSSProperties;
}

const STATUS_CONFIG: Record<EventStatus, { label: string; color: string }> = {
  pass: { label: 'PASS', color: colors.signalPass },
  allow: { label: 'ALLOW', color: colors.signalPass },
  warn: { label: 'WARN', color: colors.signalWarn },
  block: { label: 'BLOCK', color: colors.signalBlock },
  info: { label: 'INFO', color: colors.signalInfo },
  neutral: { label: '—', color: colors.textTertiary },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const config = STATUS_CONFIG[status];
  return <PillBadge text={config.label} color={config.color} style={style} />;
};
