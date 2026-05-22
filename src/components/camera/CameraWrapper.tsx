import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { springs } from '../../systems/motion';

interface CameraWrapperProps {
  children: React.ReactNode;
  // Focal point to dolly toward (0-1 normalized, from center)
  focalX?: number;
  focalY?: number;
  // Scale range: 1.0 = no zoom, 1.04 = subtle push-in
  startScale?: number;
  endScale?: number;
  // Frame at which the push-in starts
  pushStartFrame?: number;
  pushDuration?: number;
  // Gentle drift: pixels per oscillation period
  driftAmplitude?: number;
  driftPeriod?: number;
}

export const CameraWrapper: React.FC<CameraWrapperProps> = ({
  children,
  focalX = 0,
  focalY = 0,
  startScale = 1.0,
  endScale = 1.04,
  pushStartFrame = 0,
  pushDuration = 90,
  driftAmplitude = 2,
  driftPeriod = 300,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pushProgress = spring({
    fps,
    frame: Math.max(0, frame - pushStartFrame),
    config: springs.drift,
    durationInFrames: pushDuration,
  });

  const scale = startScale + (endScale - startScale) * pushProgress;

  // Drift: very slow sinusoidal float
  const driftX = Math.sin((frame / driftPeriod) * Math.PI * 2) * driftAmplitude;
  const driftY = Math.cos((frame / driftPeriod) * Math.PI * 2) * (driftAmplitude * 0.6);

  // Translate origin toward focal point as we zoom
  const translateX = focalX * (scale - 1) * -960 + driftX;
  const translateY = focalY * (scale - 1) * -540 + driftY;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
