import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { mulberry32 } from '../../lib/seed';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';
import { SEEDS } from '../../lib/seed';

interface LabelDef {
  x: number;
  y: number;
  text: string;
  opacity: number;
  fontSize: number;
  rotation: number;
}

const LABEL_POOL = [
  'getUserData()', 'plan.generate', 'file.write:47', 'mcp.tool_call',
  'bash.exec', 'alt.rejected', 'architectural.decision', 'plan.revise',
  'session.complete', 'query.raw', 'SELECT *', 'userId: string',
  'ReviewResult', 'ALLOW', 'BLOCK', 'WARN', 'tool_use', 'text_delta',
  'fs.readFile', 'db.query', 'sanitize()', 'inject?', 'corridor.trace',
  'risk:HIGH', 'risk:LOW', 'pattern.match', 'schema.check', 'lint.pass',
  'git.commit', 'diff.apply', 'context.load', 'vector.search', 'embed()',
];

function buildLabels(seed: number, count: number): LabelDef[] {
  const rng = mulberry32(seed);
  const next = () => rng();
  const labels: LabelDef[] = [];
  for (let i = 0; i < count; i++) {
    labels.push({
      x: next() * canvas.width,
      y: next() * canvas.height,
      text: LABEL_POOL[Math.floor(next() * LABEL_POOL.length)] ?? 'corridor.trace',
      opacity: 0.04 + next() * 0.06,
      fontSize: 9 + Math.floor(next() * 5),
      rotation: (next() - 0.5) * 12,
    });
  }
  return labels;
}

const LABELS = buildLabels(SEEDS.V01_LABELS_LAYER, 28);

interface LabelsLayerProps {
  opacity: number;
}

export const LabelsLayer: React.FC<LabelsLayerProps> = ({ opacity }) => {
  const frame = useCurrentFrame();
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      {LABELS.map((label, i) => {
        // Slow drift: each label oscillates slightly
        const drift = Math.sin(frame * 0.008 + i * 1.3) * 4;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: label.x,
              top: label.y + drift,
              fontFamily: typography.monoLabel.fontFamily,
              fontSize: label.fontSize,
              color: colors.textTertiary,
              opacity: label.opacity,
              transform: `rotate(${label.rotation}deg)`,
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
              userSelect: 'none',
            }}
          >
            {label.text}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};
