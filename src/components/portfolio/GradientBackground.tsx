"use client";

import dynamic from "next/dynamic";

// Dynamically import the inner component containing WebGL code with SSR disabled
const GradientBackgroundInner = dynamic(
  () => import("./GradientBackgroundInner"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black -z-1" />,
  }
);

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-1 bg-black">
      <GradientBackgroundInner />
    </div>
  );
}
