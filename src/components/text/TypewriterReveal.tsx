import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

interface TypewriterRevealProps {
  text: string;
  style?: React.CSSProperties;
  charsPerFrame?: number;
  startFrame?: number;
  // Whether to show a blinking cursor at the end
  showCursor?: boolean;
  cursorColor?: string;
}

export const TypewriterReveal: React.FC<TypewriterRevealProps> = ({
  text,
  style,
  charsPerFrame = 2,
  startFrame = 0,
  showCursor = false,
  cursorColor = 'currentColor',
}) => {
  const { visibleCount, isComplete } = useTypewriter(text, charsPerFrame, startFrame);
  const visible = text.slice(0, visibleCount);
  const showBlinkingCursor = showCursor && !isComplete;

  return (
    <span style={{ display: 'inline', whiteSpace: 'pre', ...style }}>
      {visible}
      {showBlinkingCursor && (
        <span style={{ color: cursorColor, opacity: 1 }}>▋</span>
      )}
    </span>
  );
};
