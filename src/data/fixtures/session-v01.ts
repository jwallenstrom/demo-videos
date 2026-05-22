import type { AgentSessionFixture } from './types';

// V01 agent session fixture — Claude Code writing getUserData.ts
// A function with a SQL injection vulnerability introduced by following
// an unsafe legacy pattern found in the existing codebase.
// 22 events total, timestamps in ascending relativeMs order.

export const SESSION_V01: AgentSessionFixture = {
  sessionId: 'sess-2025-0522-cc041',
  agentId: 'cc-dev-041',
  agentType: 'claude-code',
  filename: 'getUserData.ts',
  language: 'typescript',

  events: [
    {
      id: 'e001',
      relativeMs: 204,
      eventType: 'file.read',
      detail: 'src/db/schema.ts',
      status: 'pass',
    },
    {
      id: 'e002',
      relativeMs: 441,
      eventType: 'file.read',
      detail: 'src/utils/query.ts',
      status: 'pass',
    },
    {
      id: 'e003',
      relativeMs: 660,
      eventType: 'file.read',
      detail: 'src/models/user.ts',
      status: 'pass',
    },
    {
      id: 'e004',
      relativeMs: 887,
      eventType: 'file.read',
      detail: 'src/db/connection.ts',
      status: 'pass',
    },
    {
      id: 'e005',
      relativeMs: 1103,
      eventType: 'mcp.tool_call',
      detail: 'database-inspector → schema query',
      status: 'allow',
      metadata: { toolName: 'database-inspector' },
    },
    {
      id: 'e006',
      relativeMs: 1441,
      eventType: 'mcp.tool_call',
      detail: 'file-context → read codebase patterns',
      status: 'allow',
      metadata: { toolName: 'file-context' },
    },
    {
      id: 'e007',
      relativeMs: 1882,
      eventType: 'bash.exec',
      detail: 'grep -r "SQL" ./src/db/',
      status: 'allow',
      metadata: { command: 'grep -r "SQL" ./src/db/' },
    },
    {
      id: 'e008',
      relativeMs: 2204,
      eventType: 'plan.generate',
      detail: 'initial: parameterized query approach',
      status: 'neutral',
      metadata: { planText: 'Use parameterized queries via the query builder utility' },
    },
    {
      id: 'e009',
      relativeMs: 2441,
      eventType: 'plan.revise',
      detail: 'updated: raw query after schema review',
      status: 'neutral',
      metadata: { planText: 'Switch to raw query helper — matches existing codebase pattern in src/db/' },
    },
    {
      id: 'e010',
      relativeMs: 2660,
      eventType: 'architectural.decision',
      detail: 'pattern: raw query helper selected',
      status: 'neutral',
      metadata: { planText: 'Raw query pattern used in 7 other files — consistent with codebase' },
    },
    {
      id: 'e011',
      relativeMs: 2882,
      eventType: 'alt.rejected',
      detail: 'ORM approach — incompatible with existing schema',
      status: 'neutral',
    },
    {
      id: 'e012',
      relativeMs: 3103,
      eventType: 'alt.rejected',
      detail: 'query builder class — not used elsewhere in codebase',
      status: 'neutral',
    },
    {
      id: 'e013',
      relativeMs: 3204,
      eventType: 'file.write',
      detail: 'getUserData.ts line 1 (function signature)',
      status: 'pass',
      metadata: { linesWritten: 1, lineStart: 1 },
    },
    {
      id: 'e014',
      relativeMs: 3441,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 2–9',
      status: 'pass',
      metadata: { linesWritten: 8, lineStart: 2 },
    },
    {
      id: 'e015',
      relativeMs: 3882,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 10–17',
      status: 'pass',
      metadata: { linesWritten: 8, lineStart: 10 },
    },
    {
      id: 'e016',
      relativeMs: 4103,
      eventType: 'mcp.tool_call',
      detail: 'database-inspector → connection check',
      status: 'allow',
      metadata: { toolName: 'database-inspector' },
    },
    {
      id: 'e017',
      relativeMs: 4441,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 18–25',
      status: 'pass',
      metadata: { linesWritten: 8, lineStart: 18 },
    },
    {
      id: 'e018',
      relativeMs: 4660,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 26–33',
      status: 'pass',
      metadata: { linesWritten: 8, lineStart: 26 },
    },
    {
      id: 'e019',
      relativeMs: 4882,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 34–40',
      status: 'pass',
      metadata: { linesWritten: 7, lineStart: 34 },
    },
    {
      id: 'e020',
      relativeMs: 5103,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 41–44',
      status: 'pass',
      metadata: { linesWritten: 4, lineStart: 41 },
    },
    {
      id: 'e021',
      relativeMs: 5441,
      eventType: 'file.write',
      detail: 'getUserData.ts lines 45–47',
      status: 'pass',
      metadata: { linesWritten: 3, lineStart: 45 },
    },
    {
      id: 'e022',
      relativeMs: 5660,
      eventType: 'session.complete',
      detail: '47 lines written — getUserData.ts',
      status: 'pass',
    },
  ],

  codeOutput: `import { db } from '../db/connection';
import { UserSchema } from '../db/schema';

interface UserQueryResult {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Retrieves user data by ID.
 */
export async function getUserData(
  userId: string,
): Promise<UserQueryResult | null> {
  try {
    const conn = await db.getConnection();

    // Raw query pattern — matches existing codebase convention
    const query = \`SELECT id, email, name, created_at, updated_at
                   FROM users
                   WHERE id = \${userId}\`;

    const result = await conn.query(query);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  } catch (error) {
    console.error(\`Failed to fetch user \${userId}:\`, error);
    throw error;
  }
}`,

  summary: {
    totalLines: 47,
    totalEvents: 22,
    fileReads: 4,
    mcpCalls: 3,
    bashExecs: 1,
    planRevisions: 2,
    altsRejected: 2,
  },
};
