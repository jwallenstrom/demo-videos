import React from 'react';
import { useCharacterReveal } from '../../hooks/useCharacterReveal';
import type { SpringPreset } from '../../systems/motion';

interface CharacterRevealProps {
  text: string;
  style?: React.CSSProperties;
  framesPerChar?: number;
  springPreset?: SpringPreset;
  startFrame?: number;
}

// Reveals text character-by-character with spring-driven opacity per character.
export const CharacterReveal: React.FC<CharacterRevealProps> = ({
  text,
  style,
  framesPerChar = 1.5,
  springPreset = 'weighted',
  startFrame = 0,
}) => {
  const { charOpacities } = useCharacterReveal(text, framesPerChar, springPreset, startFrame);

  return (
    <span style={{ display: 'inline', ...style }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            opacity: charOpacities[i] ?? 0,
            display: 'inline',
            // Preserve whitespace rendering
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
