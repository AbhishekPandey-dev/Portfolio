"use client";

import dynamic from "next/dynamic";

// Dynamically import the inner component containing WebGL code with SSR disabled
const GradientBackgroundInner = dynamic(
  () => import("./GradientBackgroundInner"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
        }}
      />
    ),
  }
);

export function GradientBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "#000",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <GradientBackgroundInner />
    </div>
  );
}
