import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneOpacity } from '../../systems/transitions';
import { AmbientGrid } from '../../components/ambient/AmbientGrid';
import { SplitScreen } from '../../components/panels/SplitScreen';
import { IDESimulation } from '../../components/panels/IDESimulation';
import { TelemetryStream } from '../../components/telemetry/TelemetryStream';
import { PanelHeader } from '../../components/panels/PanelHeader';
import { GlassPanel } from '../../primitives/ui/GlassPanel';
import { AnnotationBadge } from '../../components/annotations/AnnotationBadge';
import { SyncLabel } from '../../components/annotations/SyncLabel';
import { FadeInText } from '../../components/text/FadeInText';
import { FramingLabel } from '../../components/text/FramingLabel';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { canvas } from '../../tokens/spacing';
import { SESSION_V01 } from '../../data/fixtures/session-v01';
import { deriveTelemetryEvents } from '../../data/generators/telemetryEvents';
import { deriveCodeLines } from '../../data/generators/codeLines';
import { FPS } from '../../tokens/timing';
import type { TelemetryColumn } from '../../data/fixtures/types';

const TELEMETRY_EVENTS = deriveTelemetryEvents(SESSION_V01, FPS);
const CODE_LINES = deriveCodeLines(SESSION_V01, FPS);

// S04 — Concrete Example. Duration: 240 frames (8s).
// Split-screen: LEFT = IDE simulation writing getUserData.ts
//               RIGHT = Corridor telemetry stream synchronized to same clock
// The SQL injection vulnerability lives on the raw query line.
// At frame 160, the annotation badge surfaces over the vulnerable line.

const SQL_INJECTION_LINE = 22; // `WHERE id = ${userId}` — line 22 in the output

export const S04_Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneAlpha = sceneOpacity(frame, durationInFrames, 18, 14);

  // Column subset for telemetry — drop status column for space
  const columns: TelemetryColumn[] = ['timestamp', 'eventType', 'detail'];

  // Annotation appears after the SQL injection line has been written
  // The file.write events for lines 18-25 are at relativeMs ~4441 → ~148 frames
  const annotationStart = 160;

  const leftPanel = (
    <div style={{ position: 'relative' }}>
      <IDESimulation
        lines={CODE_LINES}
        filename="getUserData.ts"
        width={880}
        height={640}
        highlightLine={frame >= annotationStart ? SQL_INJECTION_LINE : undefined}
        highlightColor={colors.signalBlock}
      />
      {frame >= annotationStart && (
        <div
          style={{
            position: 'absolute',
            top: 36 + SQL_INJECTION_LINE * 20 + 8,
            right: -10,
          }}
        >
          <AnnotationBadge
            text="SQL INJECTION RISK"
            color={colors.signalBlock}
            startFrame={annotationStart}
          />
        </div>
      )}
    </div>
  );

  const rightPanel = (
    <GlassPanel style={{ width: 820, height: 640, display: 'flex', flexDirection: 'column' }}>
      <PanelHeader
        title="Corridor Trace"
        subtitle={SESSION_V01.sessionId}
        accentColor={colors.corridorTeal}
      />
      <div style={{ flex: 1, padding: '8px 0', overflow: 'hidden' }}>
        <TelemetryStream
          events={TELEMETRY_EVENTS}
          columns={columns}
          maxVisible={18}
          rowHeight={22}
          width={820}
        />
      </div>
    </GlassPanel>
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.void,
        opacity: sceneAlpha,
      }}
    >
      <AmbientGrid opacity={0.2} />

      {/* Scene heading — top center */}
      <div
        style={{
          position: 'absolute',
          top: canvas.marginY,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <FramingLabel
          text="LIVE AGENT SESSION"
          color={colors.corridorTeal}
          startFrame={10}
          showRule={false}
        />
        <FadeInText
          startFrame={16}
          springPreset="natural"
          style={{
            ...typography.subheading,
            color: colors.textSecondary,
            textAlign: 'center',
          }}
        >
          Claude Code writing getUserData.ts — real event trace
        </FadeInText>
        <SyncLabel
          leftLabel="IDE"
          rightLabel="Corridor Trace"
          startFrame={22}
          style={{ marginTop: 4 }}
        />
      </div>

      {/* Split screen content */}
      <SplitScreen
        splitRatio={0.52}
        startFrame={8}
        dividerColor={colors.corridorBlue}
        topOffset={150}
        bottomOffset={canvas.marginY}
        left={leftPanel}
        right={rightPanel}
      />
    </AbsoluteFill>
  );
};
