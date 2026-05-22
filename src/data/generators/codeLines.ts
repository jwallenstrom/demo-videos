import { colors } from '../../tokens/colors';
import type { AgentSessionFixture, CodeLine, SyntaxToken } from '../fixtures/types';

// TypeScript keyword set for syntax highlighting
const TS_KEYWORDS = new Set([
  'async', 'await', 'function', 'export', 'import', 'from', 'const', 'let',
  'var', 'return', 'if', 'else', 'try', 'catch', 'throw', 'new', 'null',
  'undefined', 'true', 'false', 'interface', 'type', 'class', 'extends',
  'implements', 'public', 'private', 'readonly', 'static',
]);

// Very simple TypeScript tokenizer for visual highlighting
// Not a full parser — just enough for the code in getUserData.ts
function tokenizeLine(line: string): SyntaxToken[] {
  if (line.trim() === '') return [{ text: line, color: colors.textPrimary }];

  // Comment line
  if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().startsWith('/**')) {
    return [{ text: line, color: colors.textTertiary }];
  }

  // Import/export declarations — keyword color for the first word
  const tokens: SyntaxToken[] = [];
  let remaining = line;

  // Process character by character grouping into tokens
  const words = line.split(/(\s+|[{}()\[\].,;<>:?!`'"=+\-*/|&])/);

  let result: SyntaxToken[] = [];
  let inTemplateLiteral = false;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i] ?? '';
    if (!word) continue;

    // Handle template literals
    if (word === '`') {
      inTemplateLiteral = !inTemplateLiteral;
      result.push({ text: word, color: colors.agentWindsurf });
      continue;
    }

    if (inTemplateLiteral) {
      result.push({ text: word, color: colors.agentWindsurf });
      continue;
    }

    // Handle regular strings
    if ((word === '"' || word === "'") && !inString) {
      inString = true;
      stringChar = word;
      result.push({ text: word, color: colors.agentWindsurf });
      continue;
    }
    if (inString && word === stringChar) {
      inString = false;
      result.push({ text: word, color: colors.agentWindsurf });
      continue;
    }
    if (inString) {
      result.push({ text: word, color: colors.agentWindsurf });
      continue;
    }

    // Keywords
    if (TS_KEYWORDS.has(word.trim())) {
      result.push({ text: word, color: colors.signalInfo });
      continue;
    }

    // Type annotations after ': '
    if (word === ':') {
      result.push({ text: word, color: colors.corridorTeal });
      continue;
    }

    // Whitespace
    if (word.trim() === '') {
      result.push({ text: word, color: colors.textPrimary });
      continue;
    }

    // Numbers
    if (/^\d+$/.test(word.trim())) {
      result.push({ text: word, color: colors.signalWarn });
      continue;
    }

    // Default
    result.push({ text: word, color: colors.textPrimary });
  }

  // If tokenizer produced nothing useful, return the line as-is
  if (result.length === 0) {
    return [{ text: line, color: colors.textPrimary }];
  }

  return result;
}

// Find the file.write events and distribute lines across them
function buildLineFrameMap(
  session: AgentSessionFixture,
  fps: number,
): Map<number, number> {
  // Map: lineNumber (1-based) → frameOffset
  const lineFrames = new Map<number, number>();

  const writeEvents = session.events.filter((e) => e.eventType === 'file.write');

  for (const event of writeEvents) {
    const lineStart = event.metadata?.lineStart ?? 1;
    const linesWritten = event.metadata?.linesWritten ?? 1;
    const baseFrame = Math.round((event.relativeMs / 1000) * fps);

    // Distribute lines within the write event timeframe
    // Each line appears slightly after the previous (simulate typing rhythm)
    for (let i = 0; i < linesWritten; i++) {
      const lineNumber = lineStart + i;
      // Stagger: 2 frames per line within the write event
      const lineFrame = baseFrame + i * 2;
      lineFrames.set(lineNumber, lineFrame);
    }
  }

  return lineFrames;
}

// Derive CodeLine[] from session fixture.
// Produces one entry per line of codeOutput with frame timing.
export function deriveCodeLines(
  session: AgentSessionFixture,
  fps: number,
): CodeLine[] {
  const lines = session.codeOutput.split('\n');
  const lineFrameMap = buildLineFrameMap(session, fps);

  return lines.map((content, index) => {
    const lineNumber = index + 1;
    const frameOffset = lineFrameMap.get(lineNumber) ?? 0;

    // Typing duration: proportional to line length, minimum 4 frames
    const charCount = content.length;
    const typingDuration = Math.max(4, Math.ceil(charCount / 2));

    return {
      lineNumber,
      content,
      frameOffset,
      typingDuration,
      syntaxTokens: tokenizeLine(content),
    };
  });
}
