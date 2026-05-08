import React from "react";
import { AbsoluteFill } from "remotion";

export const Root: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ color: "white", fontSize: "2rem" }}>
        WorldExams Video Pipeline — Remotion Root
      </div>
    </AbsoluteFill>
  );
};
