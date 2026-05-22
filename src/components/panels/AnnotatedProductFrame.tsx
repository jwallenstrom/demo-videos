import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { springs } from '../../systems/motion';
import { AnnotationBadge } from '../annotations/AnnotationBadge';
import { colors } from '../../tokens/colors';

interface Annotation {
  text: string;
  color?: string;
  top: number; // px from top of the frame
  left?: number;
  right?: number;
  startFrame?: number;
}

interface AnnotatedProductFrameProps {
  children: React.ReactNode;
  annotations?: Annotation[];
  startFrame?: number;
  style?: React.CSSProperties;
}

// Wraps a product panel with floating annotation badges.
export const AnnotatedProductFrame: React.FC<AnnotatedProductFrameProps> = ({
  children,
  annotations = [],
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerProgress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: springs.natural,
  });

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        opacity: containerProgress,
        ...style,
      }}
    >
      {children}
      {annotations.map((annotation, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: annotation.top,
            left: annotation.left,
            right: annotation.right,
          }}
        >
          <AnnotationBadge
            text={annotation.text}
            color={annotation.color ?? colors.signalBlock}
            startFrame={annotation.startFrame ?? startFrame + i * 6}
          />
        </div>
      ))}
    </div>
  );
};
