import { colors } from '../../tokens/colors';
import type { AgentSessionFixture, TelemetryDisplayEvent, AgentEventType, EventStatus } from '../fixtures/types';

// Session "wall clock" start — events display from this absolute time
const SESSION_START_HH = 14;
const SESSION_START_MM = 32;
const SESSION_START_SS = 0;
const SESSION_START_MS = 0;

function formatTimestamp(relativeMs: number): string {
  const totalMs = SESSION_START_MS + relativeMs;
  const ms = totalMs % 1000;
  const totalSec = Math.floor(totalMs / 1000);
  const sec = (SESSION_START_SS + totalSec) % 60;
  const minCarry = Math.floor((SESSION_START_SS + totalSec) / 60);
  const min = (SESSION_START_MM + minCarry) % 60;
  const hr = SESSION_START_HH + Math.floor((SESSION_START_MM + minCarry) / 60);

  return `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function resolveEventTypeColor(eventType: AgentEventType): string {
  switch (eventType) {
    case 'file.read':
    case 'file.write':
      return colors.textSecondary;
    case 'mcp.tool_call':
      return colors.corridorTeal;
    case 'bash.exec':
      return colors.signalWarn;
    case 'plan.generate':
    case 'plan.revise':
      return colors.signalInfo;
    case 'architectural.decision':
    case 'alt.rejected':
      return colors.textTertiary;
    case 'session.complete':
      return colors.signalPass;
  }
}

function resolveStatusColor(status: EventStatus): string {
  switch (status) {
    case 'pass':
    case 'allow':
      return colors.signalPass;
    case 'warn':
      return colors.signalWarn;
    case 'block':
      return colors.signalBlock;
    case 'info':
      return colors.signalInfo;
    case 'neutral':
      return colors.textTertiary;
  }
}

function formatEventTypeLabel(eventType: AgentEventType): string {
  return eventType; // Berkeley Mono renders these cleanly as-is
}

function formatStatusLabel(status: EventStatus): string {
  return status;
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 3)}...`;
}

// Derive display-ready telemetry events from a session fixture.
// All values are pre-computed here — nothing is computed during render.
export function deriveTelemetryEvents(
  session: AgentSessionFixture,
  fps: number,
): TelemetryDisplayEvent[] {
  return session.events.map((event) => ({
    id: event.id,
    frameOffset: Math.round((event.relativeMs / 1000) * fps),
    timestamp: formatTimestamp(event.relativeMs),
    eventType: event.eventType,
    eventTypeLabel: formatEventTypeLabel(event.eventType),
    eventTypeColor: resolveEventTypeColor(event.eventType),
    detail: event.detail,
    detailTruncated: truncate(event.detail, 42),
    status: event.status,
    statusLabel: formatStatusLabel(event.status),
    statusColor: resolveStatusColor(event.status),
    isHighlighted:
      event.eventType === 'plan.revise' ||
      event.eventType === 'architectural.decision',
  }));
}
