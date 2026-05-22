import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { EventRow } from '../../primitives/telemetry/EventRow';
import type { TelemetryDisplayEvent, TelemetryColumn } from '../../data/fixtures/types';

interface LogRowProps {
  event: TelemetryDisplayEvent;
  columns: TelemetryColumn[];
  rowHeight?: number;
  // Frame at which this row enters
  enterFrame: number;
  isHighlighted?: boolean;
}

// Animated wrapper around EventRow — handles enter spring and scroll displacement.
export const LogRow: React.FC<LogRowProps> = ({
  event,
  columns,
  rowHeight = 22,
  enterFrame,
  isHighlighted = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    fps,
    frame: Math.max(0, frame - enterFrame),
    config: springs.snappy,
  });

  const opacity = enterProgress;
  const translateY = (1 - enterProgress) * 8;

  return (
    <EventRow
      event={event}
      columns={columns}
      rowHeight={rowHeight}
      isHighlighted={isHighlighted}
      opacity={opacity}
      translateY={translateY}
    />
  );
};
