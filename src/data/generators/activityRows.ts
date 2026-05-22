import { colors } from '../../tokens/colors';
import type { AgentSessionFixture, ActivityRowDef, AgentEventType } from '../fixtures/types';

function countByType(session: AgentSessionFixture, type: AgentEventType): number {
  return session.events.filter((e) => e.eventType === type).length;
}

// Derive the 6 activity rows shown in ExpandingActivityNode (S03).
// These summarize the session's pre-code activity in a structured way.
export function deriveActivityRows(session: AgentSessionFixture): ActivityRowDef[] {
  const fileReadCount = countByType(session, 'file.read');
  const mcpCallCount = countByType(session, 'mcp.tool_call');
  const bashCount = countByType(session, 'bash.exec');
  const planReviseCount = countByType(session, 'plan.revise');
  const altRejectedCount = countByType(session, 'alt.rejected');

  // Get representative details from actual events
  const fileReadDetails = session.events
    .filter((e) => e.eventType === 'file.read')
    .map((e) => e.detail.split('/').pop() ?? e.detail)
    .slice(0, 3)
    .join(', ');

  const mcpDetails = session.events
    .filter((e) => e.eventType === 'mcp.tool_call')
    .map((e) => e.metadata?.toolName ?? e.detail)
    .filter((v, i, a) => a.indexOf(v) === i) // dedupe
    .join(', ');

  const bashEvent = session.events.find((e) => e.eventType === 'bash.exec');
  const archEvent = session.events.find((e) => e.eventType === 'architectural.decision');

  return [
    {
      eventType: 'file.read',
      eventTypeLabel: 'file.read',
      eventTypeColor: colors.textSecondary,
      count: `${fileReadCount} events`,
      countColor: colors.corridorTeal,
      detail: `${fileReadDetails}...`,
      detailColor: colors.textTertiary,
    },
    {
      eventType: 'mcp.tool_call',
      eventTypeLabel: 'mcp.tool_call',
      eventTypeColor: colors.corridorTeal,
      count: `${mcpCallCount} events`,
      countColor: colors.corridorTeal,
      detail: `${mcpDetails}...`,
      detailColor: colors.textTertiary,
    },
    {
      eventType: 'bash.exec',
      eventTypeLabel: 'bash.exec',
      eventTypeColor: colors.signalWarn,
      count: `${bashCount} event`,
      countColor: colors.corridorTeal,
      detail: bashEvent?.detail ?? '',
      detailColor: colors.textTertiary,
    },
    {
      eventType: 'plan.revise',
      eventTypeLabel: 'plan.revise',
      eventTypeColor: colors.signalInfo,
      count: `${planReviseCount} events`,
      countColor: colors.corridorTeal,
      detail: 'approach updated after schema review',
      detailColor: colors.textTertiary,
    },
    {
      eventType: 'architectural.decision',
      eventTypeLabel: 'architectural.decision',
      eventTypeColor: colors.textTertiary,
      count: '',
      countColor: colors.corridorTeal,
      detail: archEvent?.detail ?? 'pattern: raw query helper selected',
      detailColor: colors.textTertiary,
    },
    {
      eventType: 'alt.rejected',
      eventTypeLabel: 'alt.rejected',
      eventTypeColor: colors.textTertiary,
      count: `${altRejectedCount}`,
      countColor: colors.corridorTeal,
      detail: 'ORM approach, query builder class',
      detailColor: colors.textTertiary,
    },
  ];
}
