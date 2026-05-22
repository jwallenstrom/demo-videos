import React from 'react';
import { useCurrentFrame } from 'remotion';
import { useScrollingLog } from '../../hooks/useScrollingLog';
import { LogRow } from './LogRow';
import { colors } from '../../tokens/colors';
import type { TelemetryDisplayEvent, TelemetryColumn } from '../../data/fixtures/types';

interface TelemetryStreamProps {
  events: TelemetryDisplayEvent[];
  columns?: TelemetryColumn[];
  maxVisible?: number;
  rowHeight?: number;
  width?: number;
}

const DEFAULT_COLUMNS: TelemetryColumn[] = ['timestamp', 'eventType', 'detail', 'status'];

export const TelemetryStream: React.FC<TelemetryStreamProps> = ({
  events,
  columns = DEFAULT_COLUMNS,
  maxVisible = 14,
  rowHeight = 22,
  width = 680,
}) => {
  const frame = useCurrentFrame();
  const { visibleEvents } = useScrollingLog(events, maxVisible);

  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {visibleEvents.map((event, i) => (
        <LogRow
          key={event.id}
          event={event}
          columns={columns}
          rowHeight={rowHeight}
          enterFrame={event.frameOffset}
          isHighlighted={event.isHighlighted}
        />
      ))}
    </div>
  );
};
