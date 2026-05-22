import React from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

interface PanelHeaderProps {
  title: string;
  subtitle?: string | undefined;
  accentColor?: string | undefined;
  rightSlot?: React.ReactNode;
  height?: number | undefined;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  subtitle,
  accentColor = colors.corridorBlue,
  rightSlot,
  height = 36,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Accent dot */}
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: accentColor,
            flexShrink: 0,
          }}
        />
        <span style={{ ...typography.label, color: colors.textSecondary }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ ...typography.caption, color: colors.textTertiary }}>
            {subtitle}
          </span>
        )}
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
};
