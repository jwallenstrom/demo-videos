import React from 'react';
import { colors } from '../../tokens/colors';

interface NodeBaseProps {
  width: number;
  height: number;
  borderRadius?: number | undefined;
  borderColor?: string | undefined;
  borderWidth?: number | undefined;
  fill?: string | undefined;
  style?: React.CSSProperties | undefined;
  children?: React.ReactNode;
}

// Atomic node shape — no animation, no labels. Used by DiagramNode and AgentNode.
export const NodeBase: React.FC<NodeBaseProps> = ({
  width,
  height,
  borderRadius = 6,
  borderColor = colors.borderDefault,
  borderWidth = 1,
  fill = colors.surface,
  style,
  children,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: fill,
        border: `${borderWidth}px solid ${borderColor}`,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
