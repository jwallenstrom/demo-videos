import React from 'react';
import { hexToRgba } from '../../lib/color';
import { typography } from '../../tokens/typography';

interface PillBadgeProps {
  text: string;
  color: string;
  style?: React.CSSProperties | undefined;
  uppercase?: boolean | undefined;
}

// Reusable pill/chip shape for status badges, tags, and labels.
// Background is the color at 15% opacity; border at 40%; text at 100%.
export const PillBadge: React.FC<PillBadgeProps> = ({
  text,
  color,
  style,
  uppercase = true,
}) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        background: hexToRgba(color, 0.15),
        border: `1px solid ${hexToRgba(color, 0.40)}`,
        color,
        fontFamily: typography.monoLabel.fontFamily,
        fontSize: typography.monoLabel.fontSize,
        fontWeight: 500,
        letterSpacing: uppercase ? '0.06em' : '0em',
        lineHeight: 1.4,
        textTransform: uppercase ? 'uppercase' : 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {text}
    </span>
  );
};
