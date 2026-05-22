import React from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import type { TelemetryDisplayEvent, TelemetryColumn } from '../../data/fixtures/types';

interface EventRowProps {
  event: TelemetryDisplayEvent;
  columns: TelemetryColumn[];
  rowHeight?: number;
  isHighlighted?: boolean;
  opacity?: number;
  translateY?: number;
}

// Atomic telemetry row — pure presentation, no animation logic.
// Animation (opacity, translateY) is applied from outside by LogRow.
export const EventRow: React.FC<EventRowProps> = ({
  event,
  columns,
  rowHeight = 20,
  isHighlighted = false,
  opacity = 1,
  translateY = 0,
}) => {
  const columnWidths: Record<TelemetryColumn, string> = {
    timestamp: '110px',
    eventType: '160px',
    detail: '1fr',
    status: '50px',
  };

  const highlightBorderLeft = isHighlighted
    ? `2px solid ${colors.signalInfo}40`
    : `2px solid transparent`;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns.map((c) => columnWidths[c]).join(' '),
        gap: '0 16px',
        height: rowHeight,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        borderLeft: highlightBorderLeft,
        opacity,
        transform: `translateY(${translateY}px)`,
        background: isHighlighted ? `${colors.signalInfo}08` : 'transparent',
        flexShrink: 0,
      }}
    >
      {columns.map((col) => {
        if (col === 'timestamp') {
          return (
            <span
              key={col}
              style={{
                ...typography.monoLabel,
                color: colors.textTertiary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.timestamp}
            </span>
          );
        }
        if (col === 'eventType') {
          return (
            <span
              key={col}
              style={{
                ...typography.monoLabel,
                color: event.eventTypeColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.eventTypeLabel}
            </span>
          );
        }
        if (col === 'detail') {
          return (
            <span
              key={col}
              style={{
                ...typography.monoLabel,
                color: colors.textSecondary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.detailTruncated}
            </span>
          );
        }
        if (col === 'status') {
          return (
            <span
              key={col}
              style={{
                ...typography.monoLabel,
                color: event.statusColor,
                textAlign: 'right',
              }}
            >
              {event.statusLabel}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
};
