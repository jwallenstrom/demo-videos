import React from 'react';
import { Composition } from 'remotion';
import { TheShift } from './compositions/v01/index';
import { V01_TOTAL_FRAMES } from './compositions/v01/timing';
import { FPS } from './tokens/timing';
import { canvas } from './tokens/spacing';

// Root registry — all Remotion compositions for the Corridor campaign.

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video 1: The Shift — "You Can't Govern What You Can't Observe" */}
      <Composition
        id="TheShift"
        component={TheShift}
        durationInFrames={V01_TOTAL_FRAMES}
        fps={FPS}
        width={canvas.width}
        height={canvas.height}
        defaultProps={{}}
      />
      {/* 16:9 alias for the build script */}
      <Composition
        id="TheShift-16x9"
        component={TheShift}
        durationInFrames={V01_TOTAL_FRAMES}
        fps={FPS}
        width={canvas.width}
        height={canvas.height}
        defaultProps={{}}
      />
    </>
  );
};
