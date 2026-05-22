import { useCurrentFrame } from 'remotion';
import type { TelemetryDisplayEvent } from '../data/fixtures/types';

export interface ScrollingLogResult {
  visibleEvents: TelemetryDisplayEvent[];
  // Index in visibleEvents that was most recently added (for entrance animation)
  newestIndex: number;
}

// Manages which telemetry events are currently visible and drives scrolling behavior.
// New events push in from the bottom; old events exit at the top.
export function useScrollingLog(
  events: TelemetryDisplayEvent[],
  maxVisible: number,
): ScrollingLogResult {
  const frame = useCurrentFrame();

  // Find all events that have arrived by this frame
  const arrivedEvents = events.filter((e) => e.frameOffset <= frame);

  // Show only the most recent maxVisible events
  const visibleEvents =
    arrivedEvents.length > maxVisible
      ? arrivedEvents.slice(arrivedEvents.length - maxVisible)
      : arrivedEvents;

  const newestIndex = visibleEvents.length - 1;

  return { visibleEvents, newestIndex };
}
