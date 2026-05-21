"use client";

import dynamic from "next/dynamic";

const KnightModelScene = dynamic(() => import("./KnightModelScene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-full bg-white/[0.02]"
    />
  ),
});

export function KnightModel() {
  return (
    <section
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[185vh] justify-center"
    >
      <div className="h-[155vh] w-full max-w-[1120px]">
        <KnightModelScene />
      </div>
    </section>
  );
}
