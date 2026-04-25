import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const HelloWorld: React.FC = {
  title: String,
  hook: String,
  steps: String[],
  outro: String,
}> = ({ title, hook, steps, outro }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleSpring = spring({ frame, fps });
  const hookOpacity = interpolate(frame, [0, 15], [0, 1]);
  const stepsOpacity = interpolate(frame, [15, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Title — spring in from top */}
      <div
        style={{
          position: "absolute",
          top: height * 0.15,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-50, 0])}px)`,
        }}
      >
        {title}
      </div>

      {/* Hook */}
      <div
        style={{
          position: "absolute",
          top: height * 0.35,
          left: 40,
          right: 40,
          textAlign: "center",
          color: "#fbbf24",
          fontSize: "1.5rem",
          opacity: hookOpacity,
        }}
      >
        {hook}
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: height * 0.5,
          left: 60,
          right: 60,
          color: "white",
          fontSize: "1.2rem",
          lineHeight: 1.8,
          opacity: stepsOpacity,
        }}
      >
        {(steps || []).map((step: String, i: number) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <span style={{ color: "#34d399", marginRight: "0.5rem" }}>
              {i + 1}.
            </span>
            {step}
          </div>
        ))}
      </div>

      {/* Outro */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.1,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "1rem",
          opacity: interpolate(frame, [90, 120], [0, 1]),
        }}
      >
        {outro}
      </div>
    </AbsoluteFill>
  );
};
