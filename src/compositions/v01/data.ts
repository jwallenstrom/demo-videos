import { SESSION_V01 } from '../../data/fixtures/session-v01';
import { deriveTelemetryEvents } from '../../data/generators/telemetryEvents';
import { deriveCodeLines } from '../../data/generators/codeLines';
import { deriveActivityRows } from '../../data/generators/activityRows';
import { FPS } from '../../tokens/timing';

// Pre-derived data for Video 1 — computed once at module load, not per-frame.

export const V01_TELEMETRY_EVENTS = deriveTelemetryEvents(SESSION_V01, FPS);
export const V01_CODE_LINES = deriveCodeLines(SESSION_V01, FPS);
export const V01_ACTIVITY_ROWS = deriveActivityRows(SESSION_V01);
export { SESSION_V01 };
