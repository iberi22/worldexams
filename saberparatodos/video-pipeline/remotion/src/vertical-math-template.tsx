/**
 * vertical-math-template.tsx
 *
 * Remotion template for WorldExams vertical 9:16 math education videos.
 * Supports:
 *   - Spring animations for math elements (equations, fractions, operators)
 *   - Text reveal animations (typewriter / fade)
 *   - 1080x1920 (9:16 vertical) format
 *   - Timecode-based clip sequencing (sync to audio timings)
 *
 * Props:
 *   - title: string
 *   - topic: string
 *   - steps: Array<{ label: string; math: string; explanation: string }>
 *   - timecodes: number[]  (frame offsets for each step, fps=30)
 *   - duration?: number    (total frames, default 300 = 10s @30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  CalculateMetadataFunction,
  calculateMetadata,
  delayRender,
  continueRender,
} from "remotion";

interface Step {
  label: string;
  math: string;
  explanation: string;
}

interface VerticalMathTemplateProps {
  title: string;
  topic: string;
  steps: Step[];
  timecodes?: number[];
  duration?: number;
  audioSrc?: string;  // Path or URL to WAV/MP3 audio file
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function MathText({ value, style }: { value: string; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: "KaTeX_Math, 'Times New Roman', serif",
        fontStyle: "italic",
        ...style,
      }}
    >
      {value}
    </span>
  );
}

function SpringNumber({ value, frame, config }: { value: string; frame: number; config: any }) {
  const springVal = spring({ frame, fps: config.fps, ...config });
  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${interpolate(springVal, [0, 1], [30, 0])}px)`,
        opacity: springVal,
      }}
    >
      {value}
    </span>
  );
}

// ── Step Card ────────────────────────────────────────────────────────────────

const StepCard: React.FC<{
  step: Step;
  index: number;
  startFrame: number;
  duration: number;
}> = ({ step, index, startFrame, duration }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const cardProgress = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mathSpring = spring({ frame: localFrame, fps: 30, config: { damping: 12, stiffness: 100 } });
  const labelSpring = spring({ frame: localFrame, fps: 30, config: { damping: 15, stiffness: 120 } });
  const explanationSpring = spring({ frame: localFrame, fps: 30, config: { damping: 20, stiffness: 80 } });

  const mathY = interpolate(mathSpring, [0, 1], [60, 0]);
  const labelY = interpolate(labelSpring, [0, 1], [-30, 0]);
  const explY = interpolate(explanationSpring, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 48px",
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          position: "absolute",
          top: height * 0.06,
          left: 40,
          backgroundColor: "#6366f1",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "bold",
          opacity: labelSpring,
          transform: `translateY(${labelY}px)`,
        }}
      >
        {index + 1}
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: height * 0.18,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#e2e8f0",
          fontSize: "1.75rem",
          fontWeight: "bold",
          fontFamily: "system-ui, sans-serif",
          opacity: labelSpring,
          transform: `translateY(${labelY}px)`,
        }}
      >
        {step.label}
      </div>

      {/* Math equation — spring in */}
      <div
        style={{
          position: "absolute",
          top: height * 0.38,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#fbbf24",
          fontSize: "3.5rem",
          opacity: mathSpring,
          transform: `translateY(${mathY}px)`,
          fontFamily: "KaTeX_Math, 'Times New Roman', serif",
          letterSpacing: "0.02em",
        }}
      >
        <MathText value={step.math} />
      </div>

      {/* Explanation — fade + slide */}
      <div
        style={{
          position: "absolute",
          top: height * 0.58,
          left: 48,
          right: 48,
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "1.25rem",
          lineHeight: 1.6,
          opacity: explanationSpring,
          transform: `translateY(${explY}px)`,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {step.explanation}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.08,
          left: 40,
          right: 40,
          height: 4,
          backgroundColor: "#1e293b",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${cardProgress * 100}%`,
            backgroundColor: "#6366f1",
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Template ────────────────────────────────────────────────────────────

// calculateMetadata — required so SSR/CLI picks up variable duration from inputProps
export const verticalMathCalculateMetadata: CalculateMetadataFunction<VerticalMathTemplateProps> = ({inputProps}) => {
  const duration = inputProps.duration || 300;
  return {
    durationInFrames: duration,
  };
};

export const VerticalMathTemplate: React.FC<VerticalMathTemplateProps> = ({
  title,
  topic,
  steps,
  timecodes = [],
  duration = 300,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Use the input duration from props
  const effectiveDuration = duration > 0 ? duration : 300;

  // Title reveal
  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const topicSpring = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 100 } });

  // Intro outro — use effectiveDuration
  const introDuration = 30; // frames (1s)
  const outroStart = effectiveDuration - 30;

  // Calculate duration from props — needed for SSR/CLI to pick up

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* ── AUDIO ── */}
      {audioSrc && audioSrc !== "null" && <Audio src={staticFile(audioSrc)} />}

      {/* ── INTRO ── */}
      <Sequence from={0} to={introDuration}>
        <AbsoluteFill
          style={{
            backgroundColor: "#020617",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />

          <div
            style={{
              textAlign: "center",
              opacity: titleSpring,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [-40, 0])}px)`,
            }}
          >
            <div
              style={{
                color: "#fbbf24",
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontFamily: "system-ui, sans-serif",
                marginBottom: "1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {topic}
            </div>
            <div
              style={{
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
          </div>

          {/* Decorative line */}
          <div
            style={{
              position: "absolute",
              bottom: 100,
              left: "50%",
              transform: "translateX(-50%)",
              width: interpolate(titleSpring, [0, 1], [0, 120]),
              height: 3,
              backgroundColor: "#6366f1",
              borderRadius: 2,
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ── STEPS ── */}
      {steps.map((step, i) => {
        const stepStart = timecodes[i] ?? introDuration + i * 60;
        const stepDuration = 60;
        return (
          <Sequence key={i} from={stepStart} to={stepStart + stepDuration}>
            <StepCard step={step} index={i} startFrame={stepStart} duration={stepDuration} />
          </Sequence>
        );
      })}

      {/* ── OUTRO ── */}
      <Sequence from={outroStart} to={duration}>
        <AbsoluteFill
          style={{
            backgroundColor: "#020617",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#34d399",
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "system-ui, sans-serif",
              textAlign: "center",
              opacity: interpolate(
                frame - outroStart,
                [0, 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            ¡Practica ahora!
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "1.25rem",
              fontFamily: "system-ui, sans-serif",
              marginTop: "1.5rem",
              textAlign: "center",
              opacity: interpolate(
                frame - outroStart + 10,
                [0, 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            SaberParaTodos — Prepárate para el ICFES
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default VerticalMathTemplate;
