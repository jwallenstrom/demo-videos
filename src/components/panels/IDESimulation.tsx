import React from 'react';
import { useCurrentFrame } from 'remotion';
import { GlassPanel } from '../../primitives/ui/GlassPanel';
import { PanelHeader } from './PanelHeader';
import { TypewriterReveal } from '../text/TypewriterReveal';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import type { CodeLine } from '../../data/fixtures/types';

interface IDESimulationProps {
  lines: CodeLine[];
  filename?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  style?: React.CSSProperties | undefined;
  highlightLine?: number | undefined;
  highlightColor?: string | undefined;
}

export const IDESimulation: React.FC<IDESimulationProps> = ({
  lines,
  filename = 'getUserData.ts',
  width = 640,
  height = 480,
  style,
  highlightLine,
  highlightColor = colors.signalBlock,
}) => {
  const frame = useCurrentFrame();
  const lineHeight = 20;

  return (
    <GlassPanel style={{ width, height, display: 'flex', flexDirection: 'column', ...style }}>
      <PanelHeader
        title={filename}
        subtitle="TypeScript"
        accentColor={colors.corridorBlue}
        rightSlot={
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>
        }
      />
      {/* Code body */}
      <div
        style={{
          flex: 1,
          padding: '8px 0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {lines.map((line) => {
          if (line.frameOffset > frame) return null;
          const isHighlighted = highlightLine !== undefined && line.lineNumber === highlightLine;

          return (
            <div
              key={line.lineNumber}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                height: lineHeight,
                paddingLeft: 12,
                paddingRight: 12,
                background: isHighlighted ? `${highlightColor}14` : 'transparent',
                borderLeft: isHighlighted ? `2px solid ${highlightColor}` : '2px solid transparent',
                flexShrink: 0,
              }}
            >
              {/* Line number */}
              <span
                style={{
                  ...typography.monoSmall,
                  color: colors.textTertiary,
                  width: 28,
                  flexShrink: 0,
                  textAlign: 'right',
                  paddingRight: 12,
                  lineHeight: `${lineHeight}px`,
                }}
              >
                {line.lineNumber}
              </span>
              {/* Tokens (content already pre-indented in the output string) */}
              <span style={{ lineHeight: `${lineHeight}px` }}>
                {line.syntaxTokens.map((token, ti) => (
                  <span
                    key={ti}
                    style={{
                      ...typography.monoCode,
                      color: token.color,
                      lineHeight: `${lineHeight}px`,
                    }}
                  >
                    {token.text}
                  </span>
                ))}
                {/* Typewriter cursor on lines still being "typed" */}
                {line.frameOffset <= frame && line.frameOffset + line.typingDuration > frame && (
                  <span
                    style={{
                      ...typography.monoCode,
                      color: colors.corridorBlue,
                      opacity: 0.8,
                    }}
                  >
                    ▋
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};
