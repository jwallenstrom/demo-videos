export type AgentType =
  | 'claude-code'
  | 'cursor'
  | 'copilot'
  | 'codex'
  | 'devin'
  | 'windsurf';

export type AgentEventType =
  | 'file.read'
  | 'file.write'
  | 'mcp.tool_call'
  | 'bash.exec'
  | 'plan.generate'
  | 'plan.revise'
  | 'architectural.decision'
  | 'alt.rejected'
  | 'session.complete';

export type EventStatus = 'pass' | 'allow' | 'warn' | 'block' | 'info' | 'neutral';

export interface AgentEvent {
  id: string;
  relativeMs: number;
  eventType: AgentEventType;
  detail: string;
  status: EventStatus;
  metadata?: {
    linesWritten?: number;
    lineStart?: number;
    toolName?: string;
    command?: string;
    planText?: string;
  };
}

export interface AgentSessionFixture {
  sessionId: string;
  agentId: string;
  agentType: AgentType;
  filename: string;
  language: 'typescript' | 'python' | 'go';
  events: AgentEvent[];
  codeOutput: string;
  summary: {
    totalLines: number;
    totalEvents: number;
    fileReads: number;
    mcpCalls: number;
    bashExecs: number;
    planRevisions: number;
    altsRejected: number;
  };
}

// Derived display type — generated from AgentSessionFixture by telemetryEvents.ts
export interface TelemetryDisplayEvent {
  id: string;
  frameOffset: number;
  timestamp: string;        // "14:32:00.204"
  eventType: AgentEventType;
  eventTypeLabel: string;   // formatted display string
  eventTypeColor: string;   // resolved hex color
  detail: string;
  detailTruncated: string;  // max 42 chars
  status: EventStatus;
  statusLabel: string;
  statusColor: string;
  isHighlighted: boolean;
}

// Derived code line — generated from AgentSessionFixture by codeLines.ts
export interface SyntaxToken {
  text: string;
  color: string;
}

export interface CodeLine {
  lineNumber: number;
  content: string;
  frameOffset: number;
  typingDuration: number;
  syntaxTokens: SyntaxToken[];
}

// Derived activity row — for ExpandingActivityNode in S03
export interface ActivityRowDef {
  eventType: AgentEventType;
  eventTypeLabel: string;
  eventTypeColor: string;
  count: string;
  countColor: string;
  detail: string;
  detailColor: string;
}

export type TelemetryColumn = 'timestamp' | 'eventType' | 'detail' | 'status';
